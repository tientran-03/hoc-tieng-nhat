"use client";

import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { SectionHeader } from "./SectionHeader";

const points = [
  "Lộ trình từ N5 đến N2 rõ ràng, dễ theo",
  "Lớp nhỏ cùng giáo viên giàu kinh nghiệm",
  "Bài tập, chữa bài và cộng đồng hỗ trợ mỗi ngày",
];

const steps = [
  { label: "Nghe", char: "聞", color: "bg-[#ffcad4]" },
  { label: "Nói", char: "話", color: "bg-[#fff0cd]" },
  { label: "Đọc", char: "読", color: "bg-[#dcecf2]" },
  { label: "Viết", char: "書", color: "bg-[#e1f2eb]" },
];

export function MethodSection() {
  return (
    <section id="phuong-phap" className="py-20 md:py-28 px-4 bg-[#fcfaf7]">
      <div className="w-11/12 max-w-[1160px] mx-auto">
        <div className="border-2 border-ink rounded-2xl bg-white p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_#1a2f3a] grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-14 items-center">
          <FadeIn>
            <div className="w-full">
              <SectionHeader
                badge="Phương pháp học"
                title="Học thật, dùng được thật."
                description="Không học thuộc máy móc. Mỗi buổi học kết hợp từ vựng, phản xạ và tình huống gần với cuộc sống tại Nhật."
                badgeColor="bg-[#dcecf2]"
                align="left"
              />

              <ul className="grid gap-3.5 p-0 list-none text-ink text-sm font-black -mt-6">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="grid w-6 h-6 place-items-center rounded-lg bg-[#e1f2eb] border-2 border-ink text-[#227e57] shrink-0 font-bold shadow-[1px_1px_0px_#1a2f3a]">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="w-full bg-[#fbf7f0] border-2 border-ink rounded-2xl p-8 flex flex-col items-center justify-center text-center relative shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)] min-h-[280px]">
              <div className="grid grid-cols-2 gap-3 w-full max-w-[240px] mb-6">
                {steps.map((step) => (
                  <div
                    key={step.label}
                    className={`${step.color} border-2 border-ink rounded-xl py-3 shadow-[2px_2px_0px_#1a2f3a]`}
                  >
                    <span className="block text-xl font-black text-ink">{step.char}</span>
                    <span className="block text-[10px] font-black text-[#6d7d81] uppercase mt-0.5">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-20 h-20 bg-ink text-white rounded-xl flex flex-col items-center justify-center text-sm font-black border-2 border-ink shadow-[4px_4px_0px_#coral]">
                <span>一步</span>
                <span className="text-coral">ずつ</span>
              </div>
              <p className="text-xs font-black text-ink mt-4 mb-0">Từng bước một vững chắc</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
