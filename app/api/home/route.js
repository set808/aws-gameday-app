import { NextResponse } from "next/server";
import { queryItems } from "../../../lib/dynamo";

async function getFeaturedContent() {
  const contentTypes = ["MOVIE", "TVSHOW"];
  const randomType =
    contentTypes[Math.floor(Math.random() * contentTypes.length)];

  const items = await queryItems(
    "byPopularity",
    "contentType = :contentType",
    { ":contentType": randomType },
    1,
    true
  );

  // Return null if no items found
  return items.length > 0 ? items[0] : null;
}

async function getPopularByType(contentType, limit = 10) {
  return await queryItems(
    "byPopularity",
    "contentType = :contentType",
    { ":contentType": contentType },
    limit,
    true
  );
}

export async function GET() {
  try {
    const [featuredContent, popularMovies, popularTVShows] = await Promise.all([
      getFeaturedContent(),
      getPopularByType("MOVIE", 10),
      getPopularByType("TVSHOW", 10),
    ]);

    const transformItem = (item) =>
      item
        ? {
            id: item.pk.split("#")[1],
            title: item.title,
            backdropPath: item.backdropPath,
            posterPath: item.posterPath,
            overview: item.overview,
            contentType: item.contentType,
            voteAverage: item.voteAverage,
          }
        : null;

    return NextResponse.json({
      featured: featuredContent ? transformItem(featuredContent) : null,
      popularMovies: popularMovies.map(transformItem).filter(Boolean),
      popularTVShows: popularTVShows.map(transformItem).filter(Boolean),
    });
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
