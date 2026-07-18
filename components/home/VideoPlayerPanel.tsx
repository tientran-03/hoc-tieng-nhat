"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play } from "../icons";
import { getFacebookPageUrl } from "../../lib/site-config";
import { getFacebookEmbedUrl, parseFacebookVideoInput } from "../../utils/facebook-video";

export type VideoItem = {
  id: string;
  video_url: string;
  video_title: string;
};

type VideoPlayerPanelProps = {
  items: VideoItem[];
  compact?: boolean;
};

export function VideoPlayerPanel({ items, compact = false }: VideoPlayerPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  const activeVideo = items[activeIndex] ?? items[0];
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
    <div className="flex flex-col h-full">
      {activeEmbed ? (
        <div
          className={`relative w-full bg-[#1a2f3a] flex items-center justify-center ${
            isReel ? "py-4 min-h-[280px]" : ""
          }`}
        >
          {isReel ? (
            <div
              className="relative w-full max-w-[240px] mx-auto border-2 border-ink rounded-xl overflow-hidden bg-black"
              style={{ aspectRatio: "267 / 476" }}
            >
              <iframe
                key={activeVideo.id}
                src={activeEmbed.embedUrl}
                title={activeVideo.video_title || "Video bài giảng"}
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          ) : (
            <div className="relative w-full" style={{ paddingTop: compact ? "56.25%" : "56.25%" }}>
              <iframe
                key={activeVideo.id}
                src={activeEmbed.embedUrl}
                title={activeVideo.video_title || "Video bài giảng"}
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 bg-[#fff0cd] text-center flex-1 grid place-items-center">
          <div>
            <p className="text-sm font-black text-ink mb-2">Không nhúng được video</p>
            <a
              href={getFacebookPageUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-ink border-2 border-ink bg-white px-3 py-2 rounded-lg shadow-[2px_2px_0px_#1a2f3a]"
            >
              Xem fanpage <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      <div className="p-4 border-t-2 border-ink bg-[#fbf7f0]">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase text-coral">
              Bài {String(activeIndex + 1).padStart(2, "0")}
              {isReel ? " · Reel" : ""}
            </span>
            <h3 className="text-sm font-black text-ink m-0 leading-snug truncate">
              {activeVideo.video_title || `Bài giảng ${activeIndex + 1}`}
            </h3>
          </div>
          <a
            href={activeCanonical || getFacebookPageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-[10px] font-black text-ink border border-ink bg-white px-2 py-1 rounded-md"
          >
            FB ↗
          </a>
        </div>

        {items.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-left transition-all ${
                  i === activeIndex
                    ? "border-coral bg-[#fff0cd] shadow-[2px_2px_0px_#dd4b37]"
                    : "border-ink/20 bg-white hover:border-ink"
                }`}
              >
                <span className="text-[10px] font-black">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[10px] font-bold text-ink max-w-[100px] truncate">
                  {item.video_title || `Bài ${i + 1}`}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
