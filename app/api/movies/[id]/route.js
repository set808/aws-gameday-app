import { NextResponse } from "next/server";
import { getItem } from "@/lib/dynamo";

export async function GET(request, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const movie = await getItem({ id: params.id });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const transformedMovie = {
      id: movie.id,
      title: movie.title,
      backdropPath: movie.backdropPath,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.posterPath,
      releaseDate: movie.releaseDate,
      contentType: movie.contentType,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
    };

    return NextResponse.json(transformedMovie);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
