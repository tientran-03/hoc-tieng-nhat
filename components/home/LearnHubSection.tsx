"use client";

import { useState } from "react";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { PronunciationDeck, type PronItem } from "./PronunciationDeck";
import { SectionHeader } from "./SectionHeader";
import { VideoPlayerPanel, type VideoItem } from "./VideoPlayerPanel";

type LearnHubSectionProps = {
  title?: string;
  pronItems: PronItem[];
  videoItems: VideoItem[];
};

type Tab = "video" | "pron";

export function LearnHubSection({
  title = "Học thử miễn phí",
  pronItems,
  videoItems,
}: LearnHubSectionProps) {
  const hasVideo = videoItems.length > 0;
  const hasPron = pronItems.length > 0;

  const [mobileTab, setMobileTab] = useState<Tab>(hasVideo ? "video" : "pron");

  if (!hasVideo && !hasPron) return null;

  const both = hasVideo && hasPron;

  return (
    <section id="hoc-thu" className="py-20 md:py-28 px-4 bg-[#fcfaf7]">
      <div className="w-11/12 max-w-[1160px] mx-auto">
        <FadeIn>
          <SectionHeader
            badge="Trải nghiệm học thử"
            title={title}
            description={
              both
                ? "Xem bài giảng trước, rồi luyện phát âm từ vựng ngay bên cạnh — một luồng học liền mạch."
                : hasVideo
                  ? "Xem thử bài giảng miễn phí từ page Facebook."
                  : "Luyện phát âm qua thẻ từ vựng — lật thẻ và vuốt như Quizlet."
            }
            badgeColor="bg-[#dcecf2]"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-2 border-ink rounded-2xl bg-white shadow-[6px_6px_0px_#1a2f3a] overflow-hidden">
            {/* Flow steps — desktop */}
            {both && (
              <div className="hidden lg:grid grid-cols-2 border-b-2 border-ink">
                <div className="flex items-center gap-3 px-6 py-4 bg-[#ffe1d8]/50 border-r-2 border-ink">
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-coral text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a]">
                    1
                  </span>
                  <div>
                    <p className="text-xs font-black text-ink m-0">Xem bài giảng</p>
                    <p className="text-[10px] font-bold text-[#829296] m-0">Video từ Facebook</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-6 py-4 bg-[#dcecf2]/50">
                  <span className="w-8 h-8 grid place-items-center rounded-lg bg-[#227e57] text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a]">
                    2
                  </span>
                  <div>
                    <p className="text-xs font-black text-ink m-0">Luyện phát âm</p>
                    <p className="text-[10px] font-bold text-[#829296] m-0">Thẻ từ vựng tương tác</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile tabs */}
            {both && (
              <div className="lg:hidden grid grid-cols-2 border-b-2 border-ink">
                <button
                  type="button"
                  onClick={() => setMobileTab("video")}
                  className={`py-3 text-xs font-black transition-colors ${
                    mobileTab === "video"
                      ? "bg-[#ffe1d8] text-ink"
                      : "bg-[#fbf7f0] text-[#829296]"
                  }`}
                >
                  Bước 1 · Bài giảng
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("pron")}
                  className={`py-3 text-xs font-black border-l-2 border-ink transition-colors ${
                    mobileTab === "pron"
                      ? "bg-[#dcecf2] text-ink"
                      : "bg-[#fbf7f0] text-[#829296]"
                  }`}
                >
                  Bước 2 · Phát âm
                </button>
              </div>
            )}

            {/* Content */}
            <div
              className={`grid ${
                both ? "lg:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {hasVideo && (
                <div
                  className={`border-ink ${
                    both ? "lg:border-r-2" : ""
                  } ${both && mobileTab !== "video" ? "hidden lg:block" : ""}`}
                >
                  <VideoPlayerPanel items={videoItems} compact={both} />
                </div>
              )}

              {hasPron && (
                <div
                  className={`bg-[#fbf7f0]/40 ${
                    both && mobileTab !== "pron" ? "hidden lg:block" : ""
                  } ${hasVideo ? "border-t-2 lg:border-t-0 border-ink" : ""}`}
                >
                  <PronunciationDeck items={pronItems} compact={both} />
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
