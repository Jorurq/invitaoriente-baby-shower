"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVENT } from "@/lib/event-config";
import type { Scene } from "@/lib/types";
import { FloatingDecor } from "@/components/baby-shower/floating-decor";
import { Awning } from "@/components/baby-shower/decor";
import { CoverScene } from "@/components/baby-shower/cover-scene";
import { StoryScene } from "@/components/baby-shower/story-scene";
import { InvitationScene } from "@/components/baby-shower/invitation-scene";
import { GiftsScene } from "@/components/baby-shower/gifts-scene";

export default function Home() {
  const [scene, setScene] = useState<Scene>("portada");

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-cream">
      <Awning />
      <FloatingDecor />
      <main className="relative z-10 flex-1 pt-10 sm:pt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {scene === "portada" && (
              <CoverScene
                onOpenBook={() => setScene("cuento")}
                onSkipToGifts={() => setScene("regalos")}
              />
            )}
            {scene === "cuento" && (
              <StoryScene
                onContinue={() => setScene("invitacion")}
                onBack={() => setScene("portada")}
              />
            )}
            {scene === "invitacion" && (
              <InvitationScene
                onShowGifts={() => setScene("regalos")}
                onBack={() => setScene("cuento")}
              />
            )}
            {scene === "regalos" && <GiftsScene onBack={() => setScene("invitacion")} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className="relative z-10 mt-auto border-t border-border/70 bg-paper/70 px-4 py-4 text-center text-xs text-cocoa-soft">
        Hecho con amor para la llegada de {EVENT.babyName} · {EVENT.dateLabel}
      </footer>
    </div>
  );
}
