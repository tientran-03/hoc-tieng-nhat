"use client";

import { CourseCard } from "../coure_card/CourseCard";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { SectionHeader } from "./SectionHeader";

const courses = [
  {
    level: "SƠ CẤP N5",
    title: "Nhập môn tiếng Nhật",
    desc: "Xây dựng nền tảng vững chắc, làm quen với bảng chữ cái và giao tiếp đơn giản.",
    features: ["Hiragana & Katakana", "150 từ vựng cơ bản", "Hỗ trợ 1-1"],
    color: "bg-coral",
  },
  {
    level: "SƠ CẤP N4",
    title: "Giao tiếp thực tế",
    desc: "Mở rộng vốn từ và ngữ pháp để tự tin trò chuyện trong đời sống hàng ngày.",
    features: ["Mẫu câu thông dụng", "Nghe hiểu chuyên sâu", "Luyện phản xạ"],
    color: "bg-[#f1a43a]",
    featured: true,
  },
  {
    level: "TRUNG CẤP N3",
    title: "Bứt phá sự nghiệp",
    desc: "Đạt trình độ làm việc, du học và đọc hiểu tài liệu chuyên sâu.",
    features: ["Đọc hiểu nâng cao", "Hán tự (Kanji)", "Luyện đề thi thực tế"],
    color: "bg-[#4ba3be]",
  },
];

export function JourneySection() {
  return (
    <section id="lo-trinh" className="py-20 md:py-28 px-4 bg-[#fcfaf7] relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(221,75,55,0.04),transparent_50%)]" aria-hidden="true" />

      <div className="w-11/12 max-w-[1160px] mx-auto relative">
        <FadeIn>
          <SectionHeader
            badge="Lộ trình học tập"
            title="Chọn cấp độ phù hợp với bạn"
            description="Mỗi cấp độ được thiết kế rõ ràng — bạn luôn biết mình đang ở đâu và cần làm gì tiếp theo."
            badgeColor="bg-[#ffcad4]"
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {courses.map((course, i) => {
            const { featured, ...cardProps } = course;
            return (
              <FadeIn key={course.level} delay={i * 0.1}>
                <div
                  className={`h-full ${
                    featured ? "md:-translate-y-2 md:scale-[1.02]" : ""
                  }`}
                >
                  {featured && (
                    <div className="hidden md:block text-center mb-3">
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-[#227e57] text-white border-2 border-ink px-3 py-1 rounded-full shadow-[2px_2px_0px_#1a2f3a]">
                        Phổ biến nhất
                      </span>
                    </div>
                  )}
                  <CourseCard {...cardProps} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
