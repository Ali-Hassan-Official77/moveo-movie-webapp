import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  try { return NextResponse.json(await tmdb.similar(params.id, page)); }
  catch (error) { return NextResponse.json({ error: error.message }, { status: 502 }); }
}
