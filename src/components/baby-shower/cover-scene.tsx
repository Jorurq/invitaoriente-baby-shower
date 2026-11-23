"use client";

import { useState } from "react";
import { CalendarHeart, ChevronUp, Clock, MapPin } from "lucide-react";
import { Countdown } from "@/components/baby-shower/countdown";
import { EVENT } from "@/lib/event-config";

type Props = {
  onOpenBook: () => void;
  onSkipToGifts: () => void;
};

/** Curva suave de apertura, como una tapa de libro real */
const OPEN_EASE = "cubic-bezier(0.645, 0.045, 0.355, 1)";

/** Sombra que sigue la silueta de arbol del libro */
const TREE_SHADOW = "drop-shadow(0 14px 18px rgba(224,134,163,0.35))";

/**
 * Portada: el libro-arbol cerrado (ilustracion) con el titulo en el claro.
 * Al tocarlo, la tapa gira en 3D sobre el lomo y revela el libro abierto
 * (ilustracion) con la dedicatoria y la pagina uno del cuento.
 */
export function CoverScene({ onOpenBook, onSkipToGifts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-10 pt-16 text-center sm:pt-20">
      <p className="font-hand text-3xl text-rose sm:text-4xl">Historia de un Cuak!</p>
      <h1 className="mt-1 font-display text-4xl font-semibold text-cocoa sm:text-5xl">
        Baby Shower
      </h1>

      {/* ============ El libro-arbol con tapa animada ============ */}
      <div className="relative mt-8 w-full" style={{ perspective: "1700px" }}>
        <div
          role={open ? undefined : "button"}
          tabIndex={open ? -1 : 0}
          aria-label="Abrir el libro de la invitación"
          aria-expanded={open}
          onClick={() => !open && setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={`preserve-3d relative mx-auto aspect-[0.734] w-[min(50vw,225px)] sm:w-[min(38vw,280px)] md:w-[300px] ${open ? "pointer-events-none" : "cursor-pointer"}`}
          style={{
            transform: open
              ? "translateX(50%) rotateY(-8deg)"
              : "translateX(0%) rotateY(0deg)",
            transition: `transform 1.5s ${OPEN_EASE}`,
          }}
        >
          {/* ----- Página uno: mitad derecha del libro abierto ----- */}
          <div
            className="pointer-events-auto absolute inset-0"
            style={{
              transform: "translateZ(-3px)",
              opacity: open ? 1 : 0,
              transition: open ? "opacity 0.5s ease 0.45s" : "opacity 0.15s ease",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/images/book-open.png)",
                backgroundSize: "200% 100%",
                backgroundPosition: "right center",
                filter: TREE_SHADOW,
              }}
            />
            {/* Texto sobre el ovalo derecho */}
            <div className="absolute inset-x-0 top-[38%] flex flex-col items-center px-[22%] text-center">
              <h2 className="font-display text-sm leading-tight text-rose sm:text-lg">
                El patito Pío
              </h2>
              <p className="mt-1 line-clamp-2 hidden text-[10px] leading-snug text-cocoa/90 sm:block">
                En una laguna de agua de miel vivía un patito curioso llamado
                Pío, con un sueño enorme...
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenBook();
                }}
                className="mt-1.5 rounded-full bg-rose px-3 py-1.5 text-[10px] font-semibold text-cream shadow-sm transition hover:-translate-y-0.5 hover:bg-rose-soft sm:mt-2 sm:px-3.5 sm:text-[11px]"
              >
                Leer el cuento
              </button>
            </div>
          </div>

          {/* ----- Tapa del libro (gira sobre el lomo) ----- */}
          <div
            className="preserve-3d absolute inset-0"
            style={{
              transformOrigin: "left center",
              transform: open ? "rotateY(-179deg)" : "rotateY(0deg)",
              transition: `transform 1.5s ${OPEN_EASE}`,
            }}
          >
            {/* Cara frontal: el libro-arbol cerrado */}
            <div
              className="backface-hidden absolute inset-0"
              style={{ transform: "translateZ(2px)", filter: TREE_SHADOW }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url(/images/book-closed.png)",
                  backgroundSize: "100% 100%",
                }}
              />
              {/* La patita mascota en el claro central del arbol */}
              <div
                className="absolute"
                style={{
                  left: "33%",
                  top: "24%",
                  width: "42%",
                  aspectRatio: "499 / 640",
                  backgroundImage: "url(/images/duck-cover.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>

            {/* Interior de la tapa: mitad izquierda del libro abierto */}
            <div
              className="backface-hidden absolute inset-0"
              style={{ transform: "rotateY(180deg) translateZ(2px)", filter: TREE_SHADOW }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url(/images/book-open.png)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "left center",
                }}
              />
              {/* Dedicatoria sobre el ovalo izquierdo */}
              <div className="absolute inset-x-[26%] top-[41%] text-center">
                <p className="font-hand text-[10px] leading-snug text-cocoa sm:text-[13px]">
                  Para {EVENT.babyName}, la niña más esperada de toda la laguna.
                </p>
                <p className="mt-1 font-hand text-[9px] text-cocoa-soft sm:text-xs">
                  con amor, los que ya te quieren
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pista para abrir el libro */}
      {!open && (
        <p className="mt-4 flex items-center gap-1 font-hand text-xl text-rose">
          Toca el libro para abrirlo
          <ChevronUp className="h-5 w-5 animate-bounce" />
        </p>
      )}

      {/* Fecha y lugar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-paper/80 px-3 py-1.5 text-cocoa">
          <CalendarHeart className="h-4 w-4 text-rose" />
          {EVENT.dateLabel}
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-paper/80 px-3 py-1.5 text-cocoa">
          <Clock className="h-4 w-4 text-rose" />
          {EVENT.timeLabel}
        </span>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-cocoa-soft">
        <MapPin className="h-4 w-4 text-rose-soft" />
        {EVENT.location} · {EVENT.address}
      </p>

      <div className="mt-8">
        <Countdown />
      </div>

      <button
        type="button"
        onClick={onSkipToGifts}
        className="mt-6 text-sm font-medium text-rose underline underline-offset-4 transition-colors hover:text-rose-soft"
      >
        Ir directo a la lista de regalos
      </button>
    </section>
  );
}
