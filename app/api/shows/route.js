import { NextResponse } from "next/server";
import { queryByTypeAndReleaseDate } from "@/lib/dynamo";

export async function GET() {
  try {
    const shows = await queryByTypeAndReleaseDate("TVSHOW");

    const transformedShows = shows.map((show) => ({
      id: show.id,
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
