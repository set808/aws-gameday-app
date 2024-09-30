import { NextResponse } from "next/server";
import { queryByTypeAndReleaseDate } from "../../../lib/dynamo";

export async function GET() {
  try {
    const movies = await queryByTypeAndReleaseDate("MOVIE");

    const transformedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.posterPath,
      voteAverage: movie.voteAverage,
    }));

    return NextResponse.json(transformedMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
