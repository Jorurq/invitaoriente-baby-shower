import { Daisy, PaperFan } from "@/components/baby-shower/decor";

const PETALS = [
  { c: "left-[4%] top-[22%] h-3 w-5 bg-blush-deep/50 -rotate-12", a: "animate-float", d: "0s" },
  { c: "left-[12%] top-[70%] h-2.5 w-4 bg-butter-deep/60 rotate-45", a: "animate-float-slow", d: "1.2s" },
  { c: "left-[86%] top-[30%] h-3 w-5 bg-blush-deep/40 rotate-12", a: "animate-sway", d: "0.5s" },
  { c: "left-[93%] top-[66%] h-2.5 w-4 bg-butter-deep/50 -rotate-12", a: "animate-float", d: "2s" },
  { c: "left-[24%] top-[46%] h-2 w-3 bg-rose-soft/30 rotate-45", a: "animate-twinkle", d: "1s" },
  { c: "left-[68%] top-[84%] h-2.5 w-4 bg-blush-deep/40 -rotate-45", a: "animate-float-slow", d: "1.8s" },
  { c: "left-[45%] top-[13%] h-2 w-3 bg-butter-deep/50 rotate-12", a: "animate-twinkle", d: "0.3s" },
  { c: "left-[33%] top-[92%] h-2 w-3 bg-rose-soft/25 -rotate-12", a: "animate-twinkle", d: "2.4s" },
];

/** Petalos, margaritas y abanicos pastel que flotan suavemente al fondo */
export function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* halos suaves de color */}
      <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-blush/50 blur-3xl" />
      <div className="absolute -bottom-36 -right-28 h-96 w-96 rounded-full bg-butter/60 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-blush/30 blur-3xl" />

      {/* margaritas */}
      <Daisy className="absolute left-[6%] top-[18%] h-11 w-11 opacity-80 animate-float" />
      <Daisy className="absolute left-[8%] top-[78%] h-8 w-8 opacity-60 animate-sway" />
      <Daisy className="absolute right-[7%] top-[52%] h-9 w-9 opacity-70 animate-float-slow" />
      <Daisy className="absolute right-[16%] top-[88%] h-7 w-7 opacity-50 animate-twinkle" />

      {/* abanicos de papel */}
      <PaperFan tone="pink" className="absolute right-[4%] top-[14%] h-16 w-16 opacity-55 animate-float-slow" />
      <PaperFan tone="yellow" className="absolute left-[16%] top-[58%] h-12 w-12 opacity-45 animate-sway" />
      <PaperFan tone="pink" className="absolute left-[88%] top-[74%] h-10 w-10 opacity-45 animate-float" />

      {/* petalos y brillos */}
      {PETALS.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-tl-full rounded-br-full ${p.c} ${p.a}`}
          style={{ animationDelay: p.d }}
        />
      ))}
    </div>
  );
}
