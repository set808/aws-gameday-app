import Image from 'next/image'
import Link from 'next/link'
import { getS3BackdropUrl } from '@/lib/s3'

export default function Banner({ content }) {

  let backdropUrl = null;
  if (content) {
    backdropUrl = getS3BackdropUrl(content.backdropPath)
  }

  return ( content &&
    <div className="relative h-[80vh]">
      <Image
        src={`""`}
        alt={content.title}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
        <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg mb-6">{content.overview}</p>
        <Link href={`/${content.contentType.toLowerCase()}s/${content.id}`} className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition inline-block">
          Watch Now
        </Link>
      </div>
    </div>
  )
}
