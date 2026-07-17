"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "../../components/header/site-header";
import { SiteFooter } from "../../components/footer/site-footer";
import { getMessengerHref } from "../../lib/site-config";
import { Calendar, Clock, Users, ArrowRight } from "../../components/icons";

interface CourseClass {
  id: string;
  class_name: string;
  time_slot: string;
  start_date: string;
  status: string;
  schedule: string;
  session_count: number;
  location: string;
}

interface Course {
  id: string;
  title: string;
  color: string;
  icon: string;
  course_classes: CourseClass[];
}

export default function KhoaHocClient({ initialCourses }: { initialCourses: Course[] }) {
  const [selected, setSelected] = useState(initialCourses[0]);

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-ink selection:bg-coral selection:text-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 border-b-4 border-ink overflow-hidden">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-0">
            Chọn khóa học <br/>
            <span className="text-coral underline decoration-ink decoration-4 underline-offset-8">phù hợp với bạn.</span>
          </h1>
          <a
            href={getMessengerHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 border-2 border-ink rounded-xl bg-coral px-5 py-3 text-white text-sm font-black shadow-[4px_4px_0px_#1a2f3a] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a]"
          >
            Tư vấn ngay <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>
        </div>
      </section>
      
      <section className="p-6 md:p-12 max-w-[1400px] mx-auto min-h-[60vh]">
        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Cột chọn khóa học */}
          <div className="flex flex-col gap-4">
            {initialCourses.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left border-4 border-ink p-6 rounded-3xl transition-all ${
                  selected.id === c.id ? "bg-ink text-white" : "bg-white hover:bg-[#fff0cd]"
                }`}
              >
                <div className="text-2xl font-black mt-2">{c.title}</div>
                <div className="text-xs font-bold opacity-70 mt-1">{c.course_classes.length} lớp học</div>
              </button>
            ))}
          </div>

          {/* Chi tiết lớp học */}
          <AnimatePresence mode="wait">
            <motion.div key={selected.id} className="border-4 border-ink rounded-3xl bg-white p-8">
              <div className="flex justify-between mb-8 border-b-4 border-ink pb-6">
                <h2 className="text-3xl font-black">{selected.title}</h2>
                <div className="text-right">
                  <div className="text-2xl font-black text-coral">{selected.course_classes.reduce((acc, c) => acc + c.session_count, 0)}</div>
                  <div className="text-xs font-bold text-[#5a7177]">Tổng buổi</div>
                </div>
              </div>

              <div className="grid gap-4">
                {selected.course_classes.map((item) => (
                  <div key={item.id} className="border-4 border-ink rounded-2xl p-6 bg-[#fbf7f0]">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-black">{item.class_name}</h3>
                      <span className="px-3 py-1 rounded bg-[#227e57] text-white text-xs font-black">{item.status}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {item.time_slot}</div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {item.start_date}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {item.schedule}</div>
                      <div>Cơ sở: {item.location}</div>
                    </div>

                    {/* Nút Nhận tư vấn */}
                    <div className="pt-4 border-t-2 border-dashed border-ink/20 flex justify-end">
                      <a
                        href={getMessengerHref({
                          className: item.class_name,
                          courseTitle: selected.title,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-ink rounded-xl bg-coral px-4 py-2 text-white text-xs font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a]"
                      >
                        Tư vấn ngay <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}