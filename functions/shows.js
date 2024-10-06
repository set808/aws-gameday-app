import { ApiHandler } from "sst/node/api";
import { queryByTypeAndReleaseDate } from "@/lib/dynamo";

const transformShow = (show) => ({
  id: show.id,
  title: show.title,
  posterPath: show.posterPath,
  voteAverage: show.voteAverage,
});

export const handler = ApiHandler(async () => {
  try {
    const shows = await queryByTypeAndReleaseDate("TVSHOW");
    const transformedShows = shows.map(transformShow);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedShows),
    };
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
});
