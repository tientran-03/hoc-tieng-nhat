"use client";

import Link from "next/link";
import { ArrowRight, Play, Star } from "../icons";
import { FadeIn } from "../motion_wrapper/motion-wrapper";

export function HeroSection() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 md:pb-28 px-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#ffcad4]/40 blur-3xl" />
        <div className="absolute top-1/3 -left-16 w-56 h-56 rounded-full bg-[#dcecf2]/60 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-[#fff0cd]/50 blur-2xl" />
        <span className="absolute top-32 right-[12%] text-6xl font-black text-ink/[0.04] rotate-12 select-none">
          学
        </span>
        <span className="absolute bottom-24 left-[8%] text-5xl font-black text-ink/[0.04] -rotate-6 select-none">
          日
        </span>
        <span className="absolute top-1/2 right-[6%] text-4xl font-black text-coral/[0.06] rotate-45 select-none">
          語
        </span>
      </div>

      <div className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center relative z-10">
        <FadeIn delay={0.1}>
          <div className="w-full">
            <div className="inline-flex items-center gap-2 mb-6 border-2 border-ink bg-[#fff0cd] rounded-full px-4 py-1.5 shadow-[2px_2px_0px_#1a2f3a]">
              <span className="w-2 h-2 rounded-full bg-[#227e57] animate-pulse" />
              <span className="text-xs font-black text-ink uppercase tracking-wide">
                Lộ trình N5 → N2 rõ ràng
              </span>
            </div>

            <h1 className="mt-0 mb-6 text-[40px] sm:text-[48px] md:text-[64px] font-black tracking-tight leading-[1.08]">
              Học tiếng Nhật
              <br />
              <span className="text-coral underline decoration-ink decoration-4 underline-offset-[6px]">
                đúng lộ trình.
              </span>
            </h1>

            <p className="max-w-[500px] text-[#425d68] text-base md:text-lg font-bold leading-relaxed mb-8">
              Từ những nét chữ đầu tiên đến mục tiêu du học hay sự nghiệp — chúng mình đồng hành để bạn tiến bộ mỗi ngày.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/khoa-hoc"
                className="inline-flex items-center justify-center gap-2 min-h-[52px] border-2 border-ink rounded-xl bg-coral px-6 text-white text-sm font-black shadow-[4px_4px_0px_#1a2f3a] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a2f3a]"
              >
                Chọn khóa học ngay <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
              <a
                className="group inline-flex items-center justify-center gap-2 min-h-[52px] border-2 border-ink rounded-xl bg-[#dcecf2] px-6 text-ink text-sm font-black shadow-[4px_4px_0px_#1a2f3a] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a]"
                href="#phuong-phap"
              >
                <Play className="w-4 h-4 text-ink fill-current" /> Xem cách học
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t-2 border-dashed border-ink/25">
              <div className="flex -space-x-2">
                {[
                  { char: "美", bg: "bg-[#e86b56]" },
                  { char: "夢", bg: "bg-[#f1a43a]" },
                  { char: "和", bg: "bg-[#4ba3be]" },
                ].map(({ char, bg }) => (
                  <i
                    key={char}
                    className={`grid w-9 h-9 place-items-center rounded-lg ${bg} text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a] not-italic`}
                  >
                    {char}
                  </i>
                ))}
              </div>
              <p className="text-xs md:text-sm text-ink font-bold m-0 leading-tight">
                <strong className="text-coral font-black text-base">4.9/5</strong> từ hơn 1.200 học viên
                <span className="hidden sm:inline text-[#6d7d81]"> • Hành trình học đáng nhớ</span>
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="w-full relative py-6 flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-white border-2 border-ink rounded-2xl p-6 shadow-[8px_8px_0px_#1a2f3a] relative">
              <div className="absolute -top-5 -right-4 w-12 h-12 bg-[#ffcad4] border-2 border-ink rounded-xl grid place-items-center shadow-[2px_2px_0px_#1a2f3a] rotate-12 text-lg">
                🎯
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#dcecf2] border-2 border-ink rounded-xl grid place-items-center shadow-[2px_2px_0px_#1a2f3a]">
                  <span className="text-xl font-black text-ink">日</span>
                </div>
                <div>
                  <span className="block text-[11px] font-black text-coral uppercase tracking-wider">
                    Bài học cơ bản
                  </span>
                  <h3 className="m-0 text-lg font-black text-ink">Tiếng Nhật Sơ Cấp N5</h3>
                </div>
              </div>

              <div className="bg-[#fbf7f0] border-2 border-ink rounded-xl p-4 mb-6 text-center shadow-[inset_2px_2px_0px_rgba(0,0,0,0.08)]">
                <span className="block text-xs font-bold text-[#718085] mb-1">Từ vựng hôm nay</span>
                <div className="text-2xl font-black text-ink tracking-wide">こんにちは</div>
                <small className="block text-xs text-coral font-bold mt-1">Xin chào (Ban ngày)</small>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-black text-ink">Tiến độ khóa học</span>
                  <span className="text-xs font-black text-coral bg-[#ffe1d8] border border-ink px-1.5 py-0.5 rounded">
                    65%
                  </span>
                </div>
                <div className="w-full h-5 bg-[#fbf7f0] border-2 border-ink rounded-full p-0.5 overflow-hidden">
                  <div className="h-full bg-coral rounded-full border-r-2 border-ink w-[65%]" />
                </div>
              </div>

              <Link
                href="/khoa-hoc"
                className="block w-full text-center min-h-[48px] leading-[48px] border-2 border-ink rounded-xl bg-[#227e57] text-white text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#1a2f3a]"
              >
                Học tiếp bài lên lớp
              </Link>
            </div>

            <div className="absolute right-0 lg:right-4 bottom-0 w-10 h-10 bg-[#fff0cd] border-2 border-ink rounded-full grid place-items-center shadow-[2px_2px_0px_#1a2f3a] animate-bounce">
              <Star className="w-5 h-5 text-[#c48516] fill-current" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
