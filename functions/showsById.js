import { ApiHandler } from "sst/node/api";
import { scanItems } from "@/lib/dynamo";

const transformShow = (show) => ({
  id: show.id,
  title: show.title,
  backdropPath: show.backdropPath,
  overview: show.overview,
  popularity: show.popularity,
  posterPath: show.posterPath,
  releaseDate: show.releaseDate,
  contentType: show.type,
  voteAverage: show.voteAverage,
  voteCount: show.voteCount,
});

export const handler = ApiHandler(async (event) => {
  try {
    const showId = event.pathParameters?.id;

    if (!showId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid TV show ID" }),
      };
    }

    const shows = await scanItems("id = :id", { ":id": showId });
    const show = shows[0];

    if (!show) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "TV show not found" }),
      };
    }

    const transformedShow = transformShow(show);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transformedShow),
    };
  } catch (error) {
    console.error("Error fetching TV show:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
});
