import os
import sys

import boto3

s3_client = boto3.client("s3")
ssm_client = boto3.client("ssm")

UNIFLIX_APP_BUCKET_NAME_PARAMETER = "/uniflix-app/BucketName"

def get_ssm_parameter(parameter_name: str):
    response = ssm_client.get_parameter(
        Name=parameter_name,
        WithDecryption=True
    )
    return response["Parameter"]["Value"]

def main():
    src_bucket = os.getenv("STATIC_ASSETS_BUCKET")
    if not src_bucket:
        print("STATIC_ASSETS_BUCKET environment variable is not set", file=sys.stderr)
        sys.exit(1)

    src_key_prefix = os.getenv("STATIC_ASSETS_KEY_PREFIX")
    if not src_key_prefix:
        print("STATIC_ASSETS_KEY_PREFIX environment variable is not set", file=sys.stderr)
        sys.exit(1)

    dst_bucket = get_ssm_parameter(UNIFLIX_APP_BUCKET_NAME_PARAMETER)
    print(f"Got destination bucket {dst_bucket}")

    manifest_key = f"{src_key_prefix}images_manifest.txt"
    response = s3_client.get_object(Bucket=src_bucket, Key=manifest_key)
    manifest = response["Body"].read().decode("utf-8").splitlines()

    print(f"Manifest has {len(manifest)} entries...")

    for image_file in manifest:
        image_src_key = f"{src_key_prefix}{image_file}"
        image_dst_key = image_file
        copy_source = {"Bucket": src_bucket, "Key": image_src_key}
        print(f"Copying bucket {src_bucket} key {image_src_key} to bucket {dst_bucket} key {image_dst_key}")
        s3_client.copy(
            CopySource=copy_source,
            Bucket=dst_bucket,
            Key=image_dst_key,
        )

if __name__ == "__main__":
    main()
