"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event-config";

/** Cuenta regresiva al dia del evento (evita desajuste de hidratacion iniciando en "--") */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    // Primer valor tras el pintado (evita setState sincrono en el efecto)
    const raf = requestAnimationFrame(update);
    const timer = setInterval(update, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  const target = new Date(EVENT.dateISO).getTime();
  let days = "--";
  let hours = "--";
  let minutes = "--";
  let seconds = "--";

  if (now !== null) {
    const totalSec = Math.max(0, Math.floor((target - now) / 1000));
    days = String(Math.floor(totalSec / 86400)).padStart(2, "0");
    hours = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, "0");
    minutes = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    seconds = String(totalSec % 60).padStart(2, "0");
  }

  const items: Array<[string, string]> = [
    [days, "días"],
    [hours, "horas"],
    [minutes, "min"],
    [seconds, "seg"],
  ];

  return (
    <div className="w-full max-w-sm">
      <p className="mb-2 font-hand text-xl text-rose">Faltan para el gran día</p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-paper/90 px-1 py-3 shadow-sm"
          >
            <div className="font-display text-2xl tabular-nums text-rose sm:text-3xl">
              {value}
            </div>
            <div className="text-[11px] uppercase tracking-wider text-cocoa-soft">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
