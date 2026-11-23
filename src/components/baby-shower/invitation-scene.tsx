"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Baby,
  CalendarHeart,
  ChevronLeft,
  Clock,
  Gift,
  MapPin,
  PartyPopper,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { EVENT, rsvpMessage, waLink } from "@/lib/event-config";

type Props = {
  onShowGifts: () => void;
  onBack: () => void;
};

const DETAILS = [
  { icon: CalendarHeart, label: EVENT.dateLabel },
  { icon: Clock, label: EVENT.timeLabel },
  { icon: MapPin, label: `${EVENT.location} · ${EVENT.address}` },
  { icon: Baby, label: `Celebramos la llegada de ${EVENT.babyName}` },
  { icon: Sparkles, label: "Vestimenta: tonos suaves y frescos (opcional)" },
];

/** Invitacion formal con botones de aceptar y de lista de regalos */
export function InvitationScene({ onShowGifts, onBack }: Props) {
  const { toast } = useToast();
  const [accepted, setAccepted] = useState(false);
  const [acceptedName, setAcceptedName] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAccepted(window.localStorage.getItem("bs-accepted") === "1");
    setAcceptedName(window.localStorage.getItem("bs-name") ?? "");
  }, []);

  async function handleAccept() {
    const clean = name.trim();
    if (clean.length < 2) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: clean }),
      });
      if (!res.ok) throw new Error("error");
      setAccepted(true);
      setAcceptedName(clean);
      setOpen(false);
      window.localStorage.setItem("bs-accepted", "1");
      window.localStorage.setItem("bs-name", clean);
      toast({
        title: "¡Asistencia confirmada!",
        description: `Gracias, ${clean}. Le avisaremos a ${EVENT.organizerName} por WhatsApp.`,
      });
      // Mensaje automatico al WhatsApp de la organizadora
      window.location.href = waLink(rsvpMessage(clean));
    } catch {
      toast({
        title: "No pudimos registrar tu confirmación",
        description: "Revisa tu conexión e intenta otra vez.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-4 py-10 sm:py-12">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Sobre con la invitacion */}
        <div className="mx-auto w-[min(76vw,18rem)] overflow-hidden rounded-b-[2rem] rounded-t-[9rem] border-8 border-butter bg-paper shadow-md">
          <Image
            src="/images/duck-letter.png"
            alt="La patita sosteniendo el sobre con la invitación y un corazón rosa"
            width={518}
            height={664}
            className="h-auto w-full object-cover animate-bob"
          />
        </div>

        <div className="rounded-[2rem] border border-blush-deep/50 bg-paper p-6 shadow-[0_24px_60px_-30px_rgba(217,112,140,0.4)] sm:p-8">
          <p className="font-hand text-2xl text-rose">Pío, pío... ¡tienes una invitación!</p>
          <h2 className="mt-1 font-display text-3xl text-cocoa sm:text-4xl">
            Ven a celebrar a {EVENT.babyName}
          </h2>

          <ul className="mt-5 space-y-3">
            {DETAILS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-3 text-sm text-cocoa sm:text-base">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-butter/70">
                  <Icon className="h-4 w-4 text-rose sm:h-5 sm:w-5" />
                </span>
                <span className="pt-1.5">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {accepted ? (
              <div className="w-full rounded-2xl border border-blush-deep/60 bg-blush/40 p-4 text-left">
                <p className="flex items-center gap-2 font-semibold text-rose">
                  <PartyPopper className="h-5 w-5 shrink-0" />
                  ¡Gracias, {acceptedName}! Tu asistencia quedó confirmada.
                </p>
                <p className="mt-1 text-sm text-cocoa-soft">
                  Se abrió WhatsApp para avisar a {EVENT.organizerName}. Si no se abrió,
                  puedes enviarlo de nuevo:
                </p>
                <Button
                  variant="outline"
                  className="mt-3 rounded-full border-rose/40 text-rose hover:bg-blush/60"
                  onClick={() => (window.location.href = waLink(rsvpMessage(acceptedName)))}
                >
                  <Send className="h-4 w-4" />
                  Enviar confirmación por WhatsApp
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={() => setOpen(true)}
                className="rounded-full font-semibold shadow-md shadow-rose/30 transition-all hover:-translate-y-0.5"
              >
                <PartyPopper className="h-5 w-5" />
                ¡Acepto la invitación!
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={onShowGifts}
              className="rounded-full border-rose/40 font-semibold text-rose hover:bg-blush/60"
            >
              <Gift className="h-5 w-5" />
              Ver la lista de regalos
            </Button>
          </div>

          <p className="mt-4 text-xs italic text-cocoa-soft">
            Al aceptar, se abrirá WhatsApp con un mensaje listo para avisar a la
            organizadora de tu participación.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="ghost" onClick={onBack} className="rounded-full text-cocoa-soft">
          <ChevronLeft className="h-4 w-4" />
          Volver al cuento
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-rose">
              Confirmar asistencia
            </DialogTitle>
            <DialogDescription>
              Dinos tu nombre para que {EVENT.organizerName} sepa que contarás con tu
              presencia el gran día.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim().length >= 2) handleAccept();
            }}
            disabled={submitting}
            autoFocus
          />
          <DialogFooter>
            <Button
              onClick={handleAccept}
              disabled={submitting || name.trim().length < 2}
              className="w-full rounded-full font-semibold"
            >
              {submitting ? "Enviando..." : "Confirmar mi asistencia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
