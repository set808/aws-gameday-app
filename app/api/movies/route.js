import { NextResponse } from "next/server";
import { scanTable } from "@/lib/dynamo";

export async function GET() {
  try {
    const movies = await scanTable("Movies");
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
