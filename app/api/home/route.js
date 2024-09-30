import { NextResponse } from "next/server";
import { queryByTypeAndPopularity } from "@lib/dynamo";

async function getFeaturedContent() {
  const contentTypes = ["MOVIE", "TVSHOW"];
  const randomType =
    contentTypes[Math.floor(Math.random() * contentTypes.length)];

  const items = await queryByTypeAndPopularity(randomType, 1);
  return items.length > 0 ? items[0] : null;
}

async function getPopularByType(contentType, limit = 10) {
  return await queryByTypeAndPopularity(contentType, limit);
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
            id: item.id,
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
