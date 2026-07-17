"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play } from "../icons";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { getFacebookEmbedUrl, parseFacebookVideoInput } from "../../utils/facebook-video";
import { getFacebookPageUrl } from "../../lib/site-config";
import { SectionHeader } from "./SectionHeader";

interface VideoSectionProps {
  items: {
    id: string;
    video_url: string;
    video_title: string;
  }[];
  sectionTitle: string;
}

export function VideoSection({ items, sectionTitle }: VideoSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const activeVideo = items[activeIndex] ?? items[0];
  const hasPlaylist = items.length > 1;

  const activeEmbed = useMemo(
    () => getFacebookEmbedUrl(activeVideo.video_url),
    [activeVideo.video_url]
  );

  const activeCanonical = useMemo(
    () => parseFacebookVideoInput(activeVideo.video_url)?.canonicalUrl ?? activeVideo.video_url,
    [activeVideo.video_url]
  );

  const isReel = activeEmbed?.kind === "reel";

  return (
    <section id="video-bai-giang" className="py-20 md:py-28 px-4">
      <div className="w-11/12 max-w-[1160px] mx-auto">
        <FadeIn>
          <SectionHeader
            badge="Video bài giảng"
            title={sectionTitle}
            description="Xem thử bài giảng miễn phí — chọn video bên dưới để xem tiếp."
            badgeColor="bg-[#ffe1d8]"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-2 border-ink rounded-2xl bg-white shadow-[6px_6px_0px_#1a2f3a] overflow-hidden">
            <div className={`grid grid-cols-1 ${hasPlaylist ? "lg:grid-cols-[1fr_320px]" : ""}`}>
              <div className="relative">
                {/* Player — Reel dọc vs video ngang */}
                {activeEmbed ? (
                  <div
                    className={`relative w-full bg-[#1a2f3a] flex items-center justify-center ${
                      isReel ? "py-6 md:py-10 min-h-[360px]" : ""
                    }`}
                  >
                    {isReel ? (
                      <div
                        className="relative w-full max-w-[320px] mx-auto border-2 border-ink rounded-xl overflow-hidden shadow-[4px_4px_0px_#1a2f3a] bg-black"
                        style={{ aspectRatio: "267 / 476" }}
                      >
                        <iframe
                          key={activeVideo.id}
                          src={activeEmbed.embedUrl}
                          title={activeVideo.video_title || "Video bài giảng"}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: "none" }}
                          scrolling="no"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                        <iframe
                          key={activeVideo.id}
                          src={activeEmbed.embedUrl}
                          title={activeVideo.video_title || "Video bài giảng"}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: "none" }}
                          scrolling="no"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 md:p-12 bg-[#fff0cd] border-b-2 border-ink text-center">
                    <p className="text-sm font-black text-ink mb-2">Không nhúng được video</p>
                    <p className="text-xs font-bold text-[#6d7d81] mb-4 max-w-md mx-auto">
                      Link không hợp lệ. Hãy dán link Facebook dạng{" "}
                      <code className="text-coral">facebook.com/reel/...</code> hoặc mã iframe embed.
                    </p>
                    <a
                      href={getFacebookPageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-ink border-2 border-ink bg-white px-4 py-2 rounded-lg shadow-[2px_2px_0px_#1a2f3a]"
                    >
                      Xem fanpage JapanAholic <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="p-5 md:p-6 border-t-2 border-ink bg-[#fbf7f0]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block mb-2 text-[10px] font-black uppercase tracking-wider bg-[#ffe1d8] border border-ink px-2 py-0.5 rounded-md text-coral">
                        Đang xem · Bài {String(activeIndex + 1).padStart(2, "0")}
                        {isReel ? " · Reel" : ""}
                      </span>
                      <h3 className="text-base md:text-lg font-black text-ink m-0 leading-snug">
                        {activeVideo.video_title || `Bài giảng ${activeIndex + 1}`}
                      </h3>
                    </div>

                    <a
                      href={activeCanonical || getFacebookPageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 shrink-0 text-xs font-black text-ink border-2 border-ink bg-white px-3 py-2 rounded-lg shadow-[2px_2px_0px_#1a2f3a] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#1a2f3a]"
                    >
                      Xem trên Facebook
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {hasPlaylist && (
                <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-ink bg-white">
                  <div className="p-4 border-b-2 border-ink/10">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#829296] m-0">
                      Danh sách bài ({items.length})
                    </h4>
                  </div>

                  <ul className="max-h-[360px] lg:max-h-[480px] overflow-y-auto p-3 space-y-2 list-none m-0 custom-scrollbar">
                    {items.map((item, index) => {
                      const isActive = index === activeIndex;
                      const itemKind = getFacebookEmbedUrl(item.video_url)?.kind;

                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`w-full flex items-start gap-3 text-left p-3 rounded-xl border-2 transition-all ${
                              isActive
                                ? "border-coral bg-[#fff0cd] shadow-[2px_2px_0px_#dd4b37]"
                                : "border-ink/20 bg-[#fbf7f0] hover:border-ink hover:shadow-[2px_2px_0px_#1a2f3a]"
                            }`}
                          >
                            <span
                              className={`shrink-0 w-9 h-9 grid place-items-center rounded-lg border-2 border-ink text-[10px] font-black shadow-[1px_1px_0px_#1a2f3a] ${
                                isActive ? "bg-coral text-white" : "bg-white text-ink"
                              }`}
                            >
                              {isActive ? (
                                <Play className="w-3.5 h-3.5 fill-current" />
                              ) : (
                                String(index + 1).padStart(2, "0")
                              )}
                            </span>

                            <div className="flex-1 min-w-0 pt-0.5">
                              <span className="block text-[10px] font-black text-[#829296] uppercase mb-0.5">
                                Bài {String(index + 1).padStart(2, "0")}
                                {itemKind === "reel" ? " · Reel" : ""}
                              </span>
                              <span className="block text-xs font-black text-ink line-clamp-2 leading-snug">
                                {item.video_title || `Bài giảng ${index + 1}`}
                              </span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
