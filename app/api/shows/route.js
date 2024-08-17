import { NextResponse } from "next/server";
import { scanTable } from "@/lib/dynamo";

export async function GET() {
  try {
    const shows = await scanTable("TVShows");
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
