import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const gifts = await db.gift.findMany({
      orderBy: [{ id: "asc" }],
      select: {
        id: true,
        name: true,
        detail: true,
        icon: true,
        claimed: true,
        claimedBy: true,
        message: true,
        claimedAt: true,
      },
    });
    return NextResponse.json(gifts);
  } catch (error) {
    console.error("GET /api/gifts", error);
    return NextResponse.json(
      { error: "No pudimos cargar la lista de regalos." },
      { status: 500 }
    );
  }
}
