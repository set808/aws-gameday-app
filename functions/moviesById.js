import { ApiHandler } from "sst/node/api";
import { getItem } from "@/lib/dynamo";

const transformMovie = (movie) => ({
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
});

export const handler = ApiHandler(async (event) => {
  try {
    const movieId = event.pathParameters?.id;

    if (!movieId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid movie ID" }),
      };
    }

    const movie = await getItem({ id: movieId });

    if (!movie) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Movie not found" }),
      };
    }

    const transformedMovie = transformMovie(movie);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transformedMovie),
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
});
