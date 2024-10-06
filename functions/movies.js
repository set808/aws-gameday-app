import { ApiHandler } from "sst/node/api";
import { queryByTypeAndReleaseDate } from "@/lib/dynamo";

const transformMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  posterPath: movie.posterPath,
  voteAverage: movie.voteAverage,
});

export const handler = ApiHandler(async () => {
  try {
    const movies = await queryByTypeAndReleaseDate("MOVIE");
    const transformedMovies = movies.map(transformMovie);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedMovies),
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
});
