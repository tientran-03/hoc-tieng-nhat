"use client";

import { Star } from "../icons";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { SectionHeader } from "./SectionHeader";

const testimonials = [
  {
    name: "Minh Anh",
    level: "N4 → N3",
    quote: "Sau 8 tháng học, mình tự tin giao tiếp cơ bản khi đi du lịch Nhật. Lớp nhỏ nên được hỏi rất nhiều.",
    avatar: "MA",
    color: "bg-[#ffcad4]",
  },
  {
    name: "Tuấn Kiệt",
    level: "N5 → N4",
    quote: "Lộ trình rõ ràng, không bị lạc. Giáo viên chữa bài tận tình, nhóm học cũng rất nhiệt tình.",
    avatar: "TK",
    color: "bg-[#dcecf2]",
  },
  {
    name: "Phương Linh",
    level: "Du học N3",
    quote: "Mình chuẩn bị hồ sơ du học và khóa N3 giúp mình vững ngữ pháp + kanji rất nhiều. Highly recommend!",
    avatar: "PL",
    color: "bg-[#fff0cd]",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="w-11/12 max-w-[1160px] mx-auto">
        <FadeIn>
          <SectionHeader
            badge="Học viên nói gì"
            title="Câu chuyện từ lớp học"
            description="Hơn 1.200 học viên đã tin tưởng đồng hành cùng chúng mình trên hành trình chinh phục tiếng Nhật."
            badgeColor="bg-[#ffe1d8]"
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.1}>
              <article className="h-full flex flex-col border-2 border-ink rounded-2xl bg-white p-6 shadow-[4px_4px_0px_#1a2f3a]">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[#f1a43a] fill-current" />
                  ))}
                </div>

                <blockquote className="flex-1 text-sm font-bold text-[#425d68] leading-relaxed m-0 mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <footer className="flex items-center gap-3 pt-4 border-t-2 border-dashed border-ink/20">
                  <div
                    className={`w-10 h-10 ${item.color} border-2 border-ink rounded-lg grid place-items-center text-xs font-black shadow-[2px_2px_0px_#1a2f3a] shrink-0`}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <strong className="block text-sm font-black text-ink">{item.name}</strong>
                    <span className="block text-xs font-bold text-coral">{item.level}</span>
                  </div>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
