import { NextResponse } from "next/server";
import { queryItems } from "@/lib/dynamo";

export async function GET() {
  try {
    const shows = await queryItems("byType", "type = :type", {
      ":type": "TVSHOW",
    });

    // Transform the items into a more usable format
    const transformedShows = shows.map((show) => ({
      id: show.pk.split("#")[1],
      title: show.title,
      posterPath: show.posterPath,
      voteAverage: show.voteAverage,
    }));

    return NextResponse.json(transformedShows);
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
