/** Decoraciones inspiradas en la paleta limonada rosa: margaritas,
 * abanicos de papel, sol sonriente y el toldo del puesto de limonada. */

const DAISY_ROTATIONS = [0, 45, 90, 135, 180, 225, 270, 315];

/** Margarita blanca con centro amarillo */
export function Daisy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="#ffffff" stroke="#f0b7cd" strokeWidth="1.2">
        {DAISY_ROTATIONS.map((a) => (
          <ellipse key={a} cx="24" cy="12.5" rx="6" ry="10.5" transform={`rotate(${a} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="7.5" fill="#f7df96" stroke="#e8bd62" strokeWidth="1.2" />
    </svg>
  );
}

type FanTone = "pink" | "yellow";

/** Abanico / rosetón de papel plegado */
export function PaperFan({
  className,
  tone = "pink",
}: {
  className?: string;
  tone?: FanTone;
}) {
  const a = tone === "pink" ? "#f5b9cf" : "#f7df96";
  const b = tone === "pink" ? "#fcd9e6" : "#fcefbe";
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block ${className ?? ""}`}
      style={{
        borderRadius: "50%",
        background: `repeating-conic-gradient(${a} 0deg 6deg, ${b} 6deg 12deg)`,
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.65)",
      }}
    >
      <span className="absolute inset-0 grid place-items-center">
        <span
          className="block w-[24%] h-[24%] rounded-full bg-paper"
          style={{ boxShadow: "0 0 0 2px rgba(224,134,163,0.35)" }}
        />
      </span>
    </span>
  );
}

/** Sol sonriente, protagonista del décor primavera-verano */
export function SmileySun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="36"
          cy="9"
          rx="5.5"
          ry="10"
          fill="#fbcf5d"
          stroke="#eda93c"
          strokeWidth="1.6"
          transform={`rotate(${i * 30} 36 36)`}
        />
      ))}
      <circle cx="36" cy="36" r="21" fill="#fcd75f" stroke="#eda93c" strokeWidth="2" />
      <path d="M27 33 q3 -3.6 6 0" fill="none" stroke="#8a5a2b" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M39 33 q3 -3.6 6 0" fill="none" stroke="#8a5a2b" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="25.5" cy="40" r="3.4" fill="#f5a0b5" opacity="0.75" />
      <circle cx="46.5" cy="40" r="3.4" fill="#f5a0b5" opacity="0.75" />
      <path d="M31.5 41.5 q4.5 4.6 9 0" fill="none" stroke="#8a5a2b" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Toldo de rayas rosa con festones, fijo arriba de toda la página */
export function Awning() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 [filter:drop-shadow(0_4px_4px_rgba(224,134,163,0.28))]"
    >
      <div className="awning-stripes h-7 w-full sm:h-9" />
      <div className="awning-scallop h-[11px] w-full sm:h-[13px]" />
    </div>
  );
}
