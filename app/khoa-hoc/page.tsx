"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "../../components/header/site-header";
import { SiteFooter } from "../../components/footer/site-footer";
import { ArrowRight, Calendar, User, Clock } from "lucide-react"; 

const courseData = [
  {
    id: "N5",
    title: "Nền tảng N5",
    desc: "Khởi đầu vững chắc cho người mới bắt đầu.",
    schedule: [
      { thu: "Thứ 2 - 4 - 6", time: "18:30 - 20:30", teacher: "Ms. Lan" },
      { thu: "Thứ 3 - 5 - 7", time: "19:00 - 21:00", teacher: "Mr. Minh" },
    ]
  },
  {
    id: "N4",
    title: "Giao tiếp N4",
    desc: "Tăng phản xạ trong tình huống hằng ngày.",
    schedule: [
      { thu: "Thứ 2 - 4 - 6", time: "09:00 - 11:00", teacher: "Ms. Hoa" },
      { thu: "Cuối tuần", time: "08:00 - 11:00", teacher: "Mr. Tuấn" },
    ]
  },
  {
    id: "N3",
    title: "Bứt phá N3",
    desc: "Chinh phục kỳ thi, mở rộng cơ hội.",
    schedule: [
      { thu: "Thứ 7 & CN", time: "08:00 - 11:30", teacher: "Mr. Tuấn" },
    ]
  }
];

export default function KhoaHocPage() {
  const [selected, setSelected] = useState(courseData[0]);

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-ink selection:bg-coral selection:text-white pb-20">
      <SiteHeader />

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 border-b-4 border-ink">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block border-2 border-ink bg-[#fff0cd] px-4 py-1 rounded-lg text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#1a2f3a] mb-6">
            Lộ trình học tập 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Chọn khóa học <br/>
            <span className="text-coral underline decoration-ink decoration-4 underline-offset-8">phù hợp với bạn.</span>
          </h1>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="p-6 md:p-12 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-[300px_1fr] gap-12">
          
          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {courseData.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`relative w-full text-left border-2 border-ink p-6 rounded-2xl transition-all duration-300 
                  ${selected.id === c.id 
                    ? "bg-white translate-x-1 shadow-[6px_6px_0px_#1a2f3a]" 
                    : "bg-[#fbf7f0] hover:bg-white hover:shadow-[4px_4px_0px_#1a2f3a]"}`}
              >
                {selected.id === c.id && <div className="absolute left-0 top-0 bottom-0 w-2 bg-coral rounded-l-xl" />}
                <div className="text-sm font-black text-coral uppercase tracking-wider">{c.id}</div>
                <div className="text-2xl font-black mt-1">{c.title}</div>
                <p className="text-xs font-bold text-[#5a7177] mt-2">{c.desc}</p>
              </button>
            ))}
          </div>

          {/* Schedule Panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="border-2 border-ink rounded-2xl bg-white p-8 shadow-[6px_6px_0px_#1a2f3a]"
              >
                <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-dashed border-ink/20">
                  <h2 className="text-3xl font-black">Lịch: {selected.title}</h2>
                  <span className="px-3 py-1 bg-[#dcecf2] border-2 border-ink rounded-lg font-black text-xs uppercase">Đang mở</span>
                </div>

                <div className="space-y-4">
                  {selected.schedule.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-5 border-2 border-ink rounded-xl bg-[#fbf7f0] hover:border-coral transition-colors">
                      <div className="flex items-center gap-4 mb-3 md:mb-0">
                        <div className="p-2 bg-white rounded-lg border-2 border-ink">
                          <Calendar className="w-5 h-5 text-coral" />
                        </div>
                        <div>
                          <div className="font-black text-lg">{item.thu}</div>
                          <div className="text-xs font-bold text-[#5a7177] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <div className="flex items-center gap-2 text-sm font-black text-ink">
                          <User className="w-4 h-4" /> {item.teacher}
                        </div>
                        <button className="bg-ink text-white p-3 rounded-lg hover:bg-coral transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}