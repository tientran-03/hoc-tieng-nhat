"use client";

import Link from "next/link";
import { ArrowRight } from "../icons";
import { getMessengerHref } from "../../lib/site-config";
import { FadeIn } from "../motion_wrapper/motion-wrapper";

export function CtaSection() {
  return (
    <section className="py-12 md:py-16 px-4 mb-8">
      <FadeIn>
        <div className="w-11/12 max-w-[1160px] mx-auto bg-coral border-2 border-ink rounded-2xl p-8 md:p-14 text-center shadow-[6px_6px_0px_#1a2f3a] relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            <p className="text-white/90 text-xs font-black uppercase tracking-widest mb-4">
              Bắt đầu hôm nay
            </p>
            <h2 className="mt-0 mb-4 text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[2px_2px_0px_#1a2f3a]">
              Tiếng Nhật gần hơn
              <br />
              bạn nghĩ rất nhiều.
            </h2>
            <p className="text-white/85 text-sm font-bold mb-8 max-w-[420px] mx-auto">
              Chọn khóa phù hợp hoặc nhắn tin Facebook — tư vấn lộ trình miễn phí.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={getMessengerHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] border-2 border-ink rounded-xl bg-white px-8 text-ink text-sm font-black shadow-[4px_4px_0px_#1a2f3a] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a2f3a]"
              >
                Tư vấn qua Facebook <ArrowRight className="w-4 h-4 stroke-[3]" />
              </a>
              <Link
                href="/khoa-hoc"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] border-2 border-white/60 rounded-xl bg-transparent px-8 text-white text-sm font-black transition-all hover:bg-white/10"
              >
                Xem khóa học
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
