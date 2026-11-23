import type { Metadata, Viewport } from "next";
import { Fredoka, Quicksand, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { EVENT } from "@/lib/event-config";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: `Baby Shower de ${EVENT.babyName} · Una historia por comenzar`,
  description: `Invitación digital al baby shower de ${EVENT.babyName}: abre el libro, lee el cuento del patito Pío, confirma tu asistencia y elige tu regalo de la lista.`,
  icons: {
    icon: "/images/duck-favicon.png",
  },
  openGraph: {
    title: `Baby Shower de ${EVENT.babyName}`,
    description: "Una historia está por comenzar. Confirma tu asistencia y elige tu regalo.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffdf6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} ${fredoka.variable} ${caveat.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
