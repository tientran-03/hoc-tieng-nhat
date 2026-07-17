"use client";

import { motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2 } from "../icons";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { SectionHeader } from "./SectionHeader";

interface PronunciationCardProps {
  items: {
    id: string;
    japanese_text: string;
    romaji: string;
    meaning: string;
  }[];
  sectionTitle: string;
}

const SWIPE_THRESHOLD = 90;

export function PronunciationSection({ items, sectionTitle }: PronunciationCardProps) {
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
    (nextIndex: number) => {
      if (items.length === 0) return;
      setFlipped(false);
      setIndex((nextIndex + items.length) % items.length);
    },
    [items.length]
  );

  const goNext = useCallback(() => {
    setExitX(-220);
    goTo(index + 1);
  }, [goTo, index]);

  const goPrev = useCallback(() => {
    setExitX(220);
    goTo(index - 1);
  }, [goTo, index]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) goPrev();
    else if (info.offset.x < -SWIPE_THRESHOLD) goNext();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    setExitX(0);
  }, [index]);

  if (items.length === 0 || !current) return null;

  const isSpeaking = speaking === current.id;

  return (
    <section id="luyen-phat-am" className="py-20 md:py-28 px-4 bg-[#fcfaf7]">
      <div className="w-11/12 max-w-[720px] mx-auto">
        <FadeIn>
          <SectionHeader
            badge="Phát âm tiếng Nhật"
            title={sectionTitle}
            description="Lật thẻ để xem nghĩa · Vuốt trái/phải để chuyển từ — giống Quizlet."
            badgeColor="bg-[#dcecf2]"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-ink">
                Thẻ {index + 1} / {items.length}
              </span> 
            </div>
            <div className="h-3 bg-white border-2 border-ink rounded-full p-0.5 overflow-hidden shadow-[2px_2px_0px_#1a2f3a]">
              <div
                className="h-full bg-coral rounded-full border-r-2 border-ink transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Card stack area */}
          <div className="relative h-[380px] md:h-[420px] mb-6 select-none">
            {items.length > 1 && (
              <>
                <div
                  className="absolute inset-x-3 top-3 bottom-0 border-2 border-ink/30 rounded-2xl bg-[#fbf7f0] -z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-1.5 top-1.5 bottom-0 border-2 border-ink/50 rounded-2xl bg-white -z-10 shadow-[2px_2px_0px_#1a2f3a]"
                  aria-hidden="true"
                />
              </>
            )}

            <motion.div
              key={current.id}
              className="absolute inset-0"
              initial={{ x: exitX, opacity: 0, scale: 0.96 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <SwipeCard
                item={current}
                flipped={flipped}
                isSpeaking={isSpeaking}
                onFlip={() => setFlipped((f) => !f)}
                onSpeak={() => speak(current.japanese_text, current.id)}
                onDragEnd={handleDragEnd}
              />
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Thẻ trước"
              className="w-12 h-12 grid place-items-center border-2 border-ink rounded-xl bg-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1a2f3a] active:translate-y-0 active:shadow-[1px_1px_0px_#1a2f3a]"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              className="min-h-[48px] px-6 border-2 border-ink rounded-xl bg-[#fff0cd] text-ink text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1a2f3a]"
            >
              {flipped ? "Xem mặt trước" : "Lật thẻ"}
            </button>

            <button
              type="button"
              onClick={() => speak(current.japanese_text, current.id)}
              className={`min-h-[48px] px-5 border-2 border-ink rounded-xl text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:-translate-y-0.5 ${
                isSpeaking ? "bg-coral text-white" : "bg-[#227e57] text-white"
              }`}
            >
              {isSpeaking ? (
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 animate-pulse" /> Đang phát
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Play className="w-4 h-4 fill-current" /> Nghe
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Thẻ sau"
              className="w-12 h-12 grid place-items-center border-2 border-ink rounded-xl bg-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#1a2f3a] active:translate-y-0 active:shadow-[1px_1px_0px_#1a2f3a]"
            >
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Dot indicators */}
          {items.length <= 12 && (
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Thẻ ${i + 1}`}
                  onClick={() => {
                    setFlipped(false);
                    setIndex(i);
                  }}
                  className={`h-2.5 rounded-full border-2 border-ink transition-all ${
                    i === index
                      ? "w-8 bg-coral"
                      : "w-2.5 bg-white hover:bg-[#dcecf2]"
                  }`}
                />
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Flip card ── */

function SwipeCard({
  item,
  flipped,
  isSpeaking,
  onFlip,
  onSpeak,
  onDragEnd,
}: {
  item: { japanese_text: string; romaji: string; meaning: string };
  flipped: boolean;
  isSpeaking: boolean;
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
      whileDrag={{ scale: 1.02, rotate: 0 }}
      onTap={onFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      aria-label={flipped ? "Mặt sau thẻ — nhấn để lật" : "Mặt trước thẻ — nhấn để lật"}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Mặt trước — tiếng Nhật */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center border-2 rounded-2xl p-8 text-center shadow-[6px_6px_0px_#1a2f3a] ${
            isSpeaking ? "bg-[#fff0cd] border-coral" : "bg-white border-ink"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-[#dcecf2] border border-ink px-2 py-0.5 rounded-md">
            Mặt trước
          </span>
          <span className="text-xs font-bold text-[#829296] mb-4">Nhấn thẻ để lật</span>
          <div className="text-5xl md:text-6xl font-black text-ink tracking-wide mb-4">
            {item.japanese_text}
          </div>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSpeak();
            }}
            className="mt-2 inline-flex items-center gap-2 text-xs font-black text-coral border-2 border-ink bg-[#ffe1d8] px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_#1a2f3a] hover:bg-coral hover:text-white transition-colors"
          >
            <Play className="w-3 h-3 fill-current" /> Nghe phát âm
          </button>
        </div>

        {/* Mặt sau — romaji + nghĩa */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border-2 border-ink rounded-2xl p-8 text-center bg-[#fbf7f0] shadow-[6px_6px_0px_#1a2f3a]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-[#ffcad4] border border-ink px-2 py-0.5 rounded-md">
            Mặt sau
          </span>
          {item.romaji && (
            <div className="text-2xl md:text-3xl font-black text-coral mb-3">{item.romaji}</div>
          )}
          {item.meaning && (
            <div className="text-xl md:text-2xl font-black text-ink leading-snug max-w-[90%]">
              {item.meaning}
            </div>
          )}
          {!item.romaji && !item.meaning && (
            <div className="text-lg font-bold text-[#829296]">Chưa có gợi ý nghĩa</div>
          )}
          <span className="mt-6 text-xs font-bold text-[#829296]">Vuốt ← → để chuyển thẻ</span>
        </div>
      </div>
    </motion.div>
  );
}
