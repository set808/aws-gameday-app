import { NextResponse } from "next/server";
import { queryItems } from "@/lib/dynamo";

export async function GET() {
  try {
    const movies = await queryItems("byType", "contentType = :contentType", {
      ":contentType": "MOVIE",
    });

    const transformedMovies = movies.map((movie) => ({
      id: movie.pk.split("#")[1],
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
