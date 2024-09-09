import { NextResponse } from "next/server";
import { getItem } from "../../../../lib/dynamo";

export async function GET(request, { params }) {
  try {
    console.log("Fetching movie with ID:", params.id);

    if (!params.id) {
      console.error("Movie ID is undefined or null");
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const movie = await getItem({
      pk: `MOVIE#${params.id}`,
      sk: `MOVIE#${params.id}`,
    });
    console.log("Retrieved movie:", movie);

    if (!movie) {
      console.log("Movie not found for ID:", params.id);
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const transformedMovie = {
      id: movie.pk.split("#")[1],
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

    console.log("Transformed movie:", transformedMovie);
    return NextResponse.json(transformedMovie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    // Log the full error object for more details
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
