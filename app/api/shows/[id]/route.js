import { NextResponse } from "next/server";
import { getItem } from "@/lib/dynamo";

export async function GET(request, { params }) {
  try {
    const show = await getItem("TVShows", { id: params.id });
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }
    return NextResponse.json(show);
  } catch (error) {
    console.error("Error fetching show:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
