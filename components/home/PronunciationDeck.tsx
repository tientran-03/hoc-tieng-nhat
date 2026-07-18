"use client";

import { motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2 } from "../icons";

export type PronItem = {
  id: string;
  japanese_text: string;
  romaji: string;
  meaning: string;
};

const SWIPE_THRESHOLD = 80;

type PronunciationDeckProps = {
  items: PronItem[];
  compact?: boolean;
};

export function PronunciationDeck({ items, compact = false }: PronunciationDeckProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [exitX, setExitX] = useState(0);

  const current = items[index];
  const progress = ((index + 1) / items.length) * 100;

  const speak = useCallback((text: string, id: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeaking(id);
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(utterance);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setFlipped(false);
      setIndex((next + items.length) % items.length);
    },
    [items.length]
  );

  const goNext = () => {
    setExitX(-180);
    goTo(index + 1);
  };
  const goPrev = () => {
    setExitX(180);
    goTo(index - 1);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) goPrev();
    else if (info.offset.x < -SWIPE_THRESHOLD) goNext();
  };

  useEffect(() => setExitX(0), [index]);

  if (items.length === 0 || !current) return null;

  const isSpeaking = speaking === current.id;
  const cardHeight = compact ? "h-[300px] md:h-[320px]" : "h-[380px] md:h-[420px]";

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] font-black text-ink">
            Thẻ {index + 1}/{items.length}
          </span>
          <span className="text-[10px] font-bold text-[#829296]">Vuốt · Lật thẻ</span>
        </div>
        <div className="h-2 bg-white border border-ink rounded-full p-px overflow-hidden">
          <div className="h-full bg-coral rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={`relative ${cardHeight} mx-4 mb-3 select-none flex-1`}>
        {items.length > 1 && (
          <div
            className="absolute inset-x-2 top-2 bottom-0 border border-ink/30 rounded-xl bg-[#fbf7f0] -z-10"
            aria-hidden="true"
          />
        )}
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ x: exitX, opacity: 0, scale: 0.97 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        >
          <SwipeCard
            item={current}
            flipped={flipped}
            isSpeaking={isSpeaking}
            compact={compact}
            onFlip={() => setFlipped((f) => !f)}
            onSpeak={() => speak(current.japanese_text, current.id)}
            onDragEnd={handleDragEnd}
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Thẻ trước"
          className="w-9 h-9 grid place-items-center border-2 border-ink rounded-lg bg-white shadow-[2px_2px_0px_#1a2f3a]"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
        </button>
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          className="min-h-[36px] px-4 border-2 border-ink rounded-lg bg-[#fff0cd] text-xs font-black shadow-[2px_2px_0px_#1a2f3a]"
        >
          {flipped ? "Mặt trước" : "Lật thẻ"}
        </button>
        <button
          type="button"
          onClick={() => speak(current.japanese_text, current.id)}
          className={`min-h-[36px] px-3 border-2 border-ink rounded-lg text-xs font-black shadow-[2px_2px_0px_#1a2f3a] ${
            isSpeaking ? "bg-coral text-white" : "bg-[#227e57] text-white"
          }`}
        >
          {isSpeaking ? (
            <Volume2 className="w-3.5 h-3.5 animate-pulse" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Thẻ sau"
          className="w-9 h-9 grid place-items-center border-2 border-ink rounded-lg bg-white shadow-[2px_2px_0px_#1a2f3a]"
        >
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

function SwipeCard({
  item,
  flipped,
  isSpeaking,
  compact,
  onFlip,
  onSpeak,
  onDragEnd,
}: {
  item: { japanese_text: string; romaji: string; meaning: string };
  flipped: boolean;
  isSpeaking: boolean;
  compact?: boolean;
  onFlip: () => void;
  onSpeak: () => void;
  onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) {
  return (
    <motion.div
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ perspective: 1200 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      onTap={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center border-2 rounded-xl p-5 text-center shadow-[4px_4px_0px_#1a2f3a] ${
            isSpeaking ? "bg-[#fff0cd] border-coral" : "bg-white border-ink"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`${compact ? "text-4xl" : "text-5xl"} font-black text-ink tracking-wide mb-3`}
          >
            {item.japanese_text}
          </div>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSpeak();
            }}
            className="inline-flex items-center gap-1.5 text-[10px] font-black text-coral border border-ink bg-[#ffe1d8] px-2.5 py-1 rounded-md"
          >
            <Play className="w-3 h-3 fill-current" /> Nghe
          </button>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center border-2 border-ink rounded-xl p-5 text-center bg-[#fbf7f0] shadow-[4px_4px_0px_#1a2f3a]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {item.romaji && (
            <div className={`${compact ? "text-xl" : "text-2xl"} font-black text-coral mb-2`}>
              {item.romaji}
            </div>
          )}
          {item.meaning && (
            <div className={`${compact ? "text-lg" : "text-xl"} font-black text-ink leading-snug`}>
              {item.meaning}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
