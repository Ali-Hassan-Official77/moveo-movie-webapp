import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request, { params }) {
  try { return NextResponse.json(await tmdb.details(params.id)); }
  catch (error) { return NextResponse.json({ error: error.message }, { status: 502 }); }
}
