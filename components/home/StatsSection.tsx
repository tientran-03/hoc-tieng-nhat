"use client";

import { FadeIn } from "../motion_wrapper/motion-wrapper";

const stats = [
  { value: "12.000+", label: "Học viên theo học", highlight: false },
  { value: "94%", label: "Hài lòng với lộ trình", highlight: true },
  { value: "06 năm", label: "Đồng hành tin cậy", highlight: false },
];

export function StatsSection() {
  return (
    <section className="mb-20 md:mb-24 px-4">
      <FadeIn>
        <div className="w-11/12 max-w-[1160px] mx-auto bg-white border-2 border-ink rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#1a2f3a]">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-6 md:gap-4 items-center">
            <p className="text-sm md:text-base font-bold text-ink m-0 md:border-r-2 md:border-dashed md:border-ink/30 pb-4 md:pb-0 md:pr-6">
              Không chỉ là học một ngôn ngữ,
              <br />
              <span className="text-coral font-black">mà là mở ra một thế giới mới.</span>
            </p>

            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center md:text-left ${
                  i === 1
                    ? "border-y-2 md:border-y-0 md:border-x-2 border-dashed border-ink/30 py-4 md:py-0 md:px-6"
                    : i === 2
                      ? "md:pl-2"
                      : "md:pl-4"
                }`}
              >
                <strong
                  className={`block text-3xl md:text-4xl font-black tracking-tight ${
                    stat.highlight ? "text-coral" : "text-ink"
                  }`}
                >
                  {stat.value}
                </strong>
                <span className="block text-xs font-bold text-[#829296] mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
