import { NextResponse } from "next/server";
import { getItem } from "@/lib/dynamo";

export async function GET(request, { params }) {
  try {
    const movie = await getItem("Movies", { id: params.id });
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
