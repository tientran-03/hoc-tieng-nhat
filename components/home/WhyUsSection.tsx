"use client";

import { Calendar, Clock, Shield, Users } from "../icons";
import { FadeIn } from "../motion_wrapper/motion-wrapper";
import { SectionHeader } from "./SectionHeader";

const features = [
  {
    icon: Users,
    title: "Lớp nhỏ, sát sao",
    desc: "Tối đa 12 học viên/lớp — giáo viên theo sát tiến độ và phản hồi cá nhân hóa.",
    color: "bg-[#ffcad4]",
  },
  {
    icon: Calendar,
    title: "Lịch học linh hoạt",
    desc: "Ca sáng, chiều, tối và cuối tuần — phù hợp cả sinh viên lẫn người đi làm.",
    color: "bg-[#dcecf2]",
  },
  {
    icon: Clock,
    title: "Học thực chiến",
    desc: "Mỗi buổi kết hợp nghe – nói – đọc – viết qua tình huống đời sống tại Nhật.",
    color: "bg-[#fff0cd]",
  },
  {
    icon: Shield,
    title: "Cam kết lộ trình",
    desc: "Lộ trình N5 → N2 minh bạch, có checkpoint đánh giá và hỗ trợ khi bạn gặp khó.",
    color: "bg-[#e1f2eb]",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 px-4">
      <div className="w-11/12 max-w-[1160px] mx-auto">
        <FadeIn>
          <SectionHeader
            badge="Vì sao chọn chúng mình"
            title="Học tiếng Nhật không cần phải khó"
            description="Chúng mình xây dựng trải nghiệm học gần gũi, có cấu trúc và thực sự giúp bạn dùng được tiếng Nhật."
            badgeColor="bg-[#e1f2eb]"
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.08}>
              <article className="h-full border-2 border-ink rounded-2xl bg-white p-6 shadow-[4px_4px_0px_#1a2f3a] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#1a2f3a]">
                <div
                  className={`w-12 h-12 ${item.color} border-2 border-ink rounded-xl grid place-items-center shadow-[2px_2px_0px_#1a2f3a] mb-4`}
                >
                  <item.icon className="w-5 h-5 text-ink" />
                </div>
                <h3 className="text-base font-black text-ink mb-2">{item.title}</h3>
                <p className="text-xs font-bold text-[#6d7d81] leading-relaxed m-0">{item.desc}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
