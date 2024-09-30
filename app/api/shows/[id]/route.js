import { NextResponse } from "next/server";
import { getItem } from "@/lib/dynamo";

export async function GET(request, { params }) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Invalid TV show ID" },
        { status: 400 }
      );
    }

    const show = await getItem({ id: params.id });

    if (!show) {
      return NextResponse.json({ error: "TV show not found" }, { status: 404 });
    }

    const transformedShow = {
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
    };

    return NextResponse.json(transformedShow);
  } catch (error) {
    console.error("Error fetching TV show:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
