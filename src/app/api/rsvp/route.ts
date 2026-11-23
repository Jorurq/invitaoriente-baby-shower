import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const rsvpSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre").max(60),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = rsvpSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Escribe tu nombre para confirmar." },
        { status: 400 }
      );
    }
    const rsvp = await db.rsvp.create({ data: { name: parsed.data.name } });
    return NextResponse.json({ ok: true, id: rsvp.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/rsvp", error);
    return NextResponse.json(
      { error: "Tuvimos un problema al registrar tu confirmación. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
