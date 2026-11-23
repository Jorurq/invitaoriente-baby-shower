"use client";

import Image from "next/image";
import { ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onContinue: () => void;
  onBack: () => void;
};

const PARAGRAPHS = [
  "En una laguna donde el agua brilla como miel y las flores se mecen despacio, vivía un patito pequeño y muy curioso llamado Pío. Pío tenía un nido de algodón, un libro favorito y un sueño enorme: conocer a alguien muy especial.",
  "Una mañana, mientras Pío volteaba las páginas de su libro, el viento le susurró un secreto: muy pronto llegaría al mundo una niña dulce y luminosa, y toda la laguna quería darle la bienvenida.",
  "Desde ese día, Pío contó los días con sus alitas. Guardó canciones en su nido, pintó de rosa cada amanecer y practicó sus mejores abrazos, que eran pequeños, tibios y perfectos.",
  "Pero a Pío le faltaba algo importante: amigos que lo acompañaran a recibir a la niña. Así que tomó su pluma, abrió una página en blanco y escribió la invitación más bonita que pudo... una invitación con tu nombre.",
];

/** Primera pagina del libro: el cuento corto del patito Pio */
export function StoryScene({ onContinue, onBack }: Props) {
  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-4 py-10 sm:py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-blush-deep/50 bg-paper shadow-[0_24px_60px_-30px_rgba(217,112,140,0.4)]">
        <div className="paper-dots grid md:grid-cols-2">
          {/* Pagina izquierda: titulo y mascota */}
          <div className="relative flex flex-col items-center justify-center gap-4 px-6 py-10 sm:px-10">
            <p className="font-hand text-lg text-cocoa-soft">Página uno</p>
            <h2 className="text-center font-display text-2xl leading-snug text-rose sm:text-3xl">
              El patito Pío y la niña que venía en camino
            </h2>
            <div className="mt-2 w-44 overflow-hidden rounded-[2rem] border-8 border-butter shadow-md sm:w-52">
              <Image
                src="/images/duck-reading.png"
                alt="La patita de esta historia leyendo un cuento bajo el árbol"
                width={559}
                height={720}
                className="h-auto w-full animate-bob"
              />
            </div>
            <p className="font-hand text-xl text-rose">La patita de esta historia</p>
          </div>

          {/* Lomo del libro */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-blush-deep/50 to-transparent md:block"
          />

          {/* Pagina derecha: el cuento */}
          <div className="relative px-6 py-10 sm:px-10 md:border-l md:border-dashed md:border-blush-deep/40">
            <div className="space-y-4 text-[15px] leading-relaxed text-cocoa/90 sm:text-base">
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-rose"
                      : undefined
                  }
                >
                  {text}
                </p>
              ))}
            </div>
            <p className="mt-6 font-hand text-2xl text-rose">
              Y aquí empieza tu parte de la historia...
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                onClick={onContinue}
                className="rounded-full font-semibold shadow-md shadow-rose/30 transition-all hover:-translate-y-0.5"
              >
                La invitación me espera
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={onBack}
                className="rounded-full whitespace-nowrap text-cocoa-soft"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver a la portada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
