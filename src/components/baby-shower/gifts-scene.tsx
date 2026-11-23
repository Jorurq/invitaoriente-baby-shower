"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Baby,
  Backpack,
  Bath,
  BookOpen,
  ChevronLeft,
  Flower2,
  Gift,
  Heart,
  Info,
  Lock,
  MessageCircle,
  Milk,
  Moon,
  Music,
  Shirt,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { EVENT, giftMessage, waLink } from "@/lib/event-config";
import type { GiftItem } from "@/lib/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Baby,
  Sparkles,
  Moon,
  Milk,
  Heart,
  Shirt,
  BookOpen,
  Bath,
  Backpack,
  Stethoscope,
  Music,
  Flower2,
};

type Props = {
  onBack: () => void;
};

/** Lista de regalos: cada regalo solo puede reservarlo una persona */
export function GiftsScene({ onBack }: Props) {
  const { toast } = useToast();
  const [gifts, setGifts] = useState<GiftItem[] | null>(null);
  const [selected, setSelected] = useState<GiftItem | null>(null);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [claimedGift, setClaimedGift] = useState<GiftItem | null>(null);
  const [autoSecs, setAutoSecs] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/gifts", { cache: "no-store" });
      if (!res.ok) throw new Error("error");
      setGifts((await res.json()) as GiftItem[]);
    } catch {
      toast({
        title: "No pudimos cargar la lista",
        description: "Recarga la página en unos segundos.",
        variant: "destructive",
      });
      setGifts([]);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  // Apertura automatica de WhatsApp al reservar (con boton de respaldo)
  useEffect(() => {
    if (autoSecs === null || !claimedGift) return;
    if (autoSecs === 0) {
      window.location.href = waLink(
        giftMessage(claimedGift.claimedBy ?? "", claimedGift.name, claimedGift.message)
      );
      return;
    }
    const t = setTimeout(() => setAutoSecs((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [autoSecs, claimedGift]);

  async function handleClaim() {
    if (!selected) return;
    const clean = name.trim();
    if (clean.length < 2) {
      toast({
        title: "Escribe tu nombre",
        description: "La organizadora quiere saber quién lleva cada regalo.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/gifts/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: selected.id,
          name: clean,
          message: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Este regalo ya está reservado",
          description: data?.error ?? "Elige otro con el mismo cariño.",
          variant: "destructive",
        });
        setSelected(null);
        load();
        return;
      }
      const saved = data as GiftItem;
      setClaimedGift(saved);
      setAutoSecs(4);
      setSelected(null);
      setNote("");
      setGifts((prev) => (prev ? prev.map((g) => (g.id === saved.id ? saved : g)) : prev));
      load();
    } catch {
      toast({
        title: "Tuvimos un problema al reservar",
        description: "Intenta de nuevo en unos segundos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const claimedCount = gifts?.filter((g) => g.claimed).length ?? 0;

  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 py-10 sm:py-12">
      <div className="text-center">
        <div className="mx-auto w-28 overflow-hidden rounded-full border-8 border-butter bg-paper shadow-sm">
          <Image
            src="/images/duck-gifts.png"
            alt="El patito Pío junto a pequeños regalos envueltos en tonos amarillo y rosa"
            width={1024}
            height={1024}
            className="h-auto w-full object-cover animate-bob"
          />
        </div>
        <p className="mt-4 font-hand text-2xl text-rose-soft">Pío hizo su listita...</p>
        <h2 className="mt-1 font-display text-3xl text-cocoa sm:text-4xl">
          La lista de regalos de {EVENT.babyName}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-cocoa-soft sm:text-base">
          Cada regalo puede ser elegido por una sola persona. Cuando reserves el tuyo,
          quedará marcado con tu nombre y le llegará el aviso a {EVENT.organizerName} por
          WhatsApp.
        </p>
        {gifts && (
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-rose">
            <Flower2 className="h-4 w-4" />
            {claimedCount} de {gifts.length} regalos ya encontraron dueño
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gifts === null
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-3xl" />
            ))
          : gifts.map((gift, i) => {
              const Icon = ICONS[gift.icon] ?? Gift;
              return (
                <Card
                  key={gift.id}
                  className={cn(
                    "rounded-3xl border-border/70 shadow-sm transition hover:shadow-md",
                    gift.claimed && "opacity-75"
                  )}
                >
                  <CardContent className="flex items-start gap-3 p-4 sm:p-5">
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                        i % 2 === 0 ? "bg-butter/80" : "bg-blush/70"
                      )}
                    >
                      <Icon className="h-6 w-6 text-rose" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base leading-snug text-cocoa sm:text-lg">
                        {gift.name}
                      </h3>
                      {gift.detail && (
                        <p className="mt-0.5 text-sm text-cocoa-soft">{gift.detail}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 p-4 pt-0 sm:p-5 sm:pt-0">
                    {gift.claimed ? (
                      <Badge className="gap-1.5 rounded-full bg-blush px-3 py-1.5 font-semibold text-rose">
                        <Lock className="h-3.5 w-3.5" />
                        Reservado por {gift.claimedBy}
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full border-rose/40 font-semibold text-rose hover:bg-blush/60"
                        onClick={() => setSelected(gift)}
                      >
                        Elegir este regalo
                      </Button>
                    )}
                    {gift.message && (
                      <p className="text-xs italic text-cocoa-soft">&ldquo;{gift.message}&rdquo;</p>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="flex max-w-xl items-start justify-center gap-2 text-xs text-cocoa-soft sm:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-rose-soft" />
          Si un regalo aparece reservado es porque otra persona ya se comprometió con él.
          ¡Gracias por tanto cariño!
        </p>
        <Button variant="ghost" onClick={onBack} className="rounded-full text-cocoa-soft">
          <ChevronLeft className="h-4 w-4" />
          Volver a la invitación
        </Button>
      </div>

      {/* Formulario para reservar el regalo */}
      <Dialog open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <DialogContent className="rounded-3xl sm:max-w-sm">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl text-rose">
                  {selected.name}
                </DialogTitle>
                <DialogDescription>
                  Reserva este regalo dejando tu nombre. {EVENT.organizerName} verá quién
                  lleva cada cosa.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="claim-name">Tu nombre</Label>
                  <Input
                    id="claim-name"
                    placeholder="¿Cómo te llamas?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitting}
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="claim-note">Nota para la mamá (opcional)</Label>
                  <Textarea
                    id="claim-note"
                    placeholder="Ej: Lo elijo con mucho cariño"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={submitting}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleClaim}
                  disabled={submitting || name.trim().length < 2}
                  className="w-full rounded-full font-semibold"
                >
                  {submitting ? "Reservando..." : "Reservar regalo"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmacion de reserva + mensaje automatico a WhatsApp */}
      <Dialog
        open={!!claimedGift}
        onOpenChange={(v) => {
          if (!v) {
            setClaimedGift(null);
            setAutoSecs(null);
          }
        }}
      >
        <DialogContent className="rounded-3xl text-center sm:max-w-sm">
          {claimedGift && (
            <>
              <DialogHeader className="items-center">
                <DialogTitle className="font-display text-xl text-rose">
                  ¡Regalo reservado!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Gracias, {claimedGift.claimedBy}. Reservaste{" "}
                  <span className="font-semibold text-cocoa">
                    &ldquo;{claimedGift.name}&rdquo;
                  </span>{" "}
                  para {EVENT.babyName}.
                </DialogDescription>
              </DialogHeader>
              <p className="flex items-center justify-center gap-2 text-sm text-cocoa-soft">
                <MessageCircle className="h-4 w-4 text-rose" />
                {autoSecs !== null && autoSecs > 0
                  ? `Abriendo WhatsApp para avisar a ${EVENT.organizerName} en ${autoSecs}s...`
                  : `Se abrió WhatsApp para avisar a ${EVENT.organizerName}.`}
              </p>
              <DialogFooter className="flex-col gap-2 sm:justify-center">
                <Button
                  onClick={() =>
                    (window.location.href = waLink(
                      giftMessage(claimedGift.claimedBy ?? "", claimedGift.name, claimedGift.message)
                    ))
                  }
                  className="w-full rounded-full font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  Abrir WhatsApp ahora
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full text-cocoa-soft"
                  onClick={() => {
                    setClaimedGift(null);
                    setAutoSecs(null);
                  }}
                >
                  Quedarme en la página
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
