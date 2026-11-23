import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const claimSchema = z.object({
  giftId: z.number().int().positive(),
  name: z.string().trim().min(2, "Escribe tu nombre").max(60),
  message: z.string().trim().max(200).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = claimSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos incompletos. Revisa tu nombre e intenta de nuevo." },
        { status: 400 }
      );
    }
    const { giftId, name, message } = parsed.data;

    // Reserva atomica: solo se marca si el regalo sigue libre.
    // Si dos personas intentan reservarlo a la vez, solo la primera lo logra.
    const result = await db.gift.updateMany({
      where: { id: giftId, claimed: false },
      data: {
        claimed: true,
        claimedBy: name,
        message: message && message.length > 0 ? message : null,
        claimedAt: new Date(),
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        {
          error:
            "Alguien se adelantó y este regalo acaba de ser reservado. Elige otro con el mismo cariño.",
        },
        { status: 409 }
      );
    }

    const gift = await db.gift.findUnique({
      where: { id: giftId },
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

    return NextResponse.json(gift, { status: 201 });
  } catch (error) {
    console.error("POST /api/gifts/claim", error);
    return NextResponse.json(
      { error: "Tuvimos un problema al reservar. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
