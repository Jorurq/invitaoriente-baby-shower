// ============================================================
// DATOS DEL EVENTO — EDITAR AQUI CUANDO SE CONFIRMEN LOS DATOS
// (nombre de la bebe, fecha, lugar y WhatsApp de la organizadora
// son valores TENTATIVOS elegidos como punto de partida)
// ============================================================

export const EVENT = {
  babyName: "Sofía",
  dateISO: "2026-12-12T15:00:00-04:00", // hora de Venezuela (UTC-4)
  dateLabel: "Sábado 12 de diciembre de 2026",
  timeLabel: "3:00 pm",
  location: "Quinta La Primavera",
  address: "Av. Principal, Los Naranjos · Caracas",
  organizerName: "Andreína",
  // TENTATIVO: reemplazar por el numero real de la organizadora (codigo de pais + numero, sin "+" ni espacios)
  organizerWhatsApp: "584141234567",
} as const;

/** Construye el enlace de WhatsApp con mensaje prellenado para la organizadora */
export function waLink(message: string): string {
  return `https://wa.me/${EVENT.organizerWhatsApp}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de confirmacion de asistencia */
export function rsvpMessage(name: string): string {
  return [
    `Hola, ${EVENT.organizerName}. Soy ${name}.`,
    `Confirmo mi asistencia al Baby Shower de ${EVENT.babyName}.`,
    `${EVENT.dateLabel}, ${EVENT.timeLabel} - ${EVENT.location}. Nos vemos el gran dia.`,
  ].join(" ");
}

/** Mensaje de confirmacion de participacion + regalo elegido */
export function giftMessage(name: string, giftName: string, note?: string | null): string {
  return [
    `Hola, ${EVENT.organizerName}. Soy ${name}.`,
    `Confirmo mi participacion en el Baby Shower de ${EVENT.babyName}.`,
    `El regalo que llevare es: ${giftName}.`,
    note ? `Nota: ${note}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
