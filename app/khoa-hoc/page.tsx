"use client";

import { useState } from "react";
import { SiteHeader } from "../../components/header/site-header";
import { SiteFooter } from "../../components/footer/site-footer";

const courseData = [
  {
    id: "N5",
    title: "Nền tảng N5",
    desc: "Khởi đầu vững chắc cho người mới bắt đầu.",
    classes: [
      { tenLop: "N5.924", time: "18:30-21:00", khaiGiang: "24/07/2026", status: "Còn chỗ", thu: "2-4-6", soBuoi: 48, coSo: "Thủ Đức" },
      { tenLop: "N5.926", time: "18:30-21:00", khaiGiang: "06/07/2026", status: "Gần hết", thu: "2-4-6", soBuoi: 48, coSo: "Thủ Đức" },
      { tenLop: "N5.930", time: "14:30-17:00", khaiGiang: "20/07/2026", status: "Còn chỗ", thu: "2-4-6", soBuoi: 48, coSo: "Thủ Đức" },
    ]
  },
  {
    id: "N4",
    title: "Giao tiếp N4",
    desc: "Tăng phản xạ trong tình huống hằng ngày.",
    classes: [
      { tenLop: "N4.725", time: "18:30-21:00", khaiGiang: "31/07/2026", status: "Còn chỗ", thu: "2-4-6", soBuoi: 45, coSo: "Quận 1" },
      { tenLop: "N4.724", time: "18:30-21:00", khaiGiang: "07/07/2026", status: "Gần hết", thu: "3-5-7", soBuoi: 45, coSo: "Thủ Đức" },
    ]
  },
  {
    id: "N3",
    title: "Bứt phá N3",
    desc: "Chinh phục kỳ thi, mở rộng cơ hội.",
    classes: [
      { tenLop: "N3.3 JLPT", time: "18:30-21:00", khaiGiang: "15/07/2026", status: "Còn chỗ", thu: "2-4-6", soBuoi: 57, coSo: "Thủ Đức" },
      { tenLop: "N3.639 JB", time: "18:30-21:00", khaiGiang: "14/07/2026", status: "Còn chỗ", thu: "3-5-7", soBuoi: 45, coSo: "Thủ Đức" },
    ]
  }
];

export default function KhoaHocPage() {
  const [selected, setSelected] = useState(courseData[0]);

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-ink selection:bg-coral selection:text-white">
      <SiteHeader />

      <section className="px-6 py-16 md:px-12 md:py-24 border-b-4 border-ink">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block border-2 border-ink bg-[#fff0cd] px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest shadow-[2px_2px_0px_#1a2f3a] mb-6">
            Lộ trình học tập 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Chọn khóa học <br/>
            <span className="text-coral underline decoration-ink decoration-4 underline-offset-8">phù hợp với bạn.</span>
          </h1>
        </div>
      </section>
      
      <section className="p-6 md:p-12 max-w-[1200px] mx-auto min-h-[50vh]">
        <div className="grid md:grid-cols-[320px_1fr] gap-12">
          <div className="flex flex-col gap-4">
            {courseData.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left border-2 border-ink p-6 rounded-2xl shadow-[4px_4px_0px_#1a2f3a] transition-all duration-200 
                  ${selected.id === c.id 
                    ? "bg-ink text-white translate-x-1 shadow-[6px_6px_0px_#1a2f3a]" 
                    : "bg-white hover:bg-[#fff0cd] hover:shadow-[6px_6px_0px_#1a2f3a]"}`}
              >
                <div className="text-3xl font-black mb-1">{c.id}</div>
                <div className={`font-bold text-sm ${selected.id === c.id ? "text-coral" : "text-[#5a7177]"}`}>
                  {c.title}
                </div>
              </button>
            ))}
          </div>

          <div className="border-2 border-ink rounded-2xl bg-white p-6 md:p-8 shadow-[6px_6px_0px_#1a2f3a] overflow-x-auto">
            <div className="flex items-center justify-between mb-8 border-b-4 border-ink pb-6">
              <h2 className="text-2xl font-black">Lịch: {selected.title}</h2>
            </div>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-ink text-[10px] font-black uppercase tracking-widest text-[#5a7177]">
                  <th className="pb-4 px-2">Tên lớp</th>
                  <th className="pb-4 px-2">Thời gian</th>
                  <th className="pb-4 px-2">Khai giảng</th>
                  <th className="pb-4 px-2">Tình trạng</th>
                  <th className="pb-4 px-2">Thứ</th>
                  <th className="pb-4 px-2">Số buổi</th>
                  <th className="pb-4 px-2">Cơ sở</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink/10">
                {selected.classes.map((item, i) => (
                  <tr key={i} className="hover:bg-[#fbf7f0]">
                    <td className="py-4 px-2 font-black text-sm">{item.tenLop}</td>
                    <td className="py-4 px-2 font-bold text-xs">{item.time}</td>
                    <td className="py-4 px-2 font-bold text-xs">{item.khaiGiang}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded text-[10px] font-black ${item.status === "Còn chỗ" ? "bg-[#227e57] text-white" : "bg-[#f1a43a] text-white"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 font-bold text-xs">{item.thu}</td>
                    <td className="py-4 px-2 font-bold text-xs">{item.soBuoi}</td>
                    <td className="py-4 px-2 font-bold text-xs">{item.coSo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}