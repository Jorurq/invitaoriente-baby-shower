export type GiftItem = {
  id: number;
  name: string;
  detail: string | null;
  icon: string;
  claimed: boolean;
  claimedBy: string | null;
  message: string | null;
  claimedAt: string | null;
};

export type Scene = "portada" | "cuento" | "invitacion" | "regalos";
