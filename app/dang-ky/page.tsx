"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowRight, Calendar, Check, ChevronDown, Clock, Shield, Sparkle, Users } from "../../components/icons";

import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import { SiteHeader } from "../../components/header/site-header";
import { SiteFooter } from "../../components/footer/site-footer";

type Course = {
  slug: string;
  level: string;
  title: string;
  description: string;
  price: string;
  sessions: string;
  schedule: string;
  students: string;
  tag?: string;
  color: "coral" | "gold" | "blue";
};

const courses: Course[] = [
  { slug: "n5-foundation", level: "N5", title: "Nền tảng tiếng Nhật", description: "Từ con số 0 đến giao tiếp nền tảng vững vàng.", price: "2.490.000đ", sessions: "36 buổi", schedule: "T2 · T4 · T6", students: "Còn 8 chỗ", tag: "Phổ biến nhất", color: "coral" },
  { slug: "n4-communication", level: "N4", title: "Giao tiếp N4", description: "Mở rộng phản xạ và tự tin trong tình huống hằng ngày.", price: "2.790.000đ", sessions: "30 buổi", schedule: "T3 · T5 · T7", students: "Còn 5 chỗ", color: "gold" },
  { slug: "n3-breakthrough", level: "N3", title: "Bứt phá N3", description: "Rèn kỹ năng thực chiến cho công việc và du học.", price: "3.190.000đ", sessions: "32 buổi", schedule: "T2 · T5 · CN", students: "Còn 12 chỗ", color: "blue" },
];

const initialForm = { phone: "", schedule: "evening", note: "" };

export default function RegistrationPage() {
  const [selectedSlug, setSelectedSlug] = useState(courses[0].slug);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [user, setUser] = useState<User | null>(null);
  const selectedCourse = useMemo(() => courses.find((course) => course.slug === selectedSlug) ?? courses[0], [selectedSlug]);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const syncUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    void syncUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase || !user) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("No active session");
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ ...form, courseSlug: selectedCourse.slug }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  const getCourseColorClasses = (color: Course["color"], isSelected: boolean) => {
    const base = {
      coral: {
        bg: "bg-[#ffe1d8] text-ink",
        border: isSelected ? "border-coral shadow-[4px_4px_0px_#1a2f3a]" : "border-ink shadow-[2px_2px_0px_#1a2f3a]",
        radio: "group-[.selected]:border-coral group-[.selected]:bg-coral"
      },
      gold: {
        bg: "bg-[#fff0cd] text-ink",
        border: isSelected ? "border-[#dea52e]" : "border-ink",
        radio: "group-[.selected]:border-[#dea52e] group-[.selected]:bg-[#dea52e]"
      },
      blue: {
        bg: "bg-[#dcecf2] text-ink",
        border: isSelected ? "border-[#438fa8]" : "border-ink",
        radio: "group-[.selected]:border-[#438fa8] group-[.selected]:bg-[#438fa8]"
      }
    };
    return base[color];
  };

  return (
    <main className="min-h-screen bg-[#fbf7f0] text-ink font-sans antialiased">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="w-11/12 max-w-[1160px] mx-auto pt-20 pb-14 text-center">

        <h1 className="mt-0 mb-4 text-4xl md:text-6xl font-black tracking-tight leading-none text-ink">
          Chọn lớp, để chúng mình<br />
          <span className="text-coral underline decoration-ink decoration-4 underline-offset-8">lo phần còn lại.</span>
        </h1>
        <p className="max-w-[520px] mx-auto mt-6 text-[#5a7177] text-sm md:text-base font-bold leading-relaxed">
          Đăng ký trong chưa đến 2 phút. Đội ngũ tư vấn sẽ liên hệ xác nhận lịch học phù hợp với bạn.
        </p>
      </section>

      {/* Main Content Layout */}
      <section className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-10 items-start pb-16">
        
        {/* Step 1: Course Picker */}
        <div className="w-full">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="grid w-10 h-10 place-items-center border-2 border-ink rounded-xl bg-white text-ink text-sm font-black shadow-[2px_2px_0px_#1a2f3a]">01</span>
            <div>
              <strong className="block text-base md:text-lg font-black text-ink uppercase tracking-wide">Chọn khóa học</strong>
              <small className="block mt-0.5 text-[#5a7177] text-xs font-bold">Bạn đang ở trình độ nào?</small>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {courses.map((course) => {
              const isSelected = selectedSlug === course.slug;
              // Tất cả box dùng border-2 viền đen dày dặn chuẩn style
              const theme = getCourseColorClasses(course.color, isSelected);

              return (
                <button
                  key={course.slug}
                  type="button"
                  onClick={() => setSelectedSlug(course.slug)}
                  className={`group relative min-h-0 sm:min-h-[320px] overflow-hidden border-2 rounded-2xl bg-white p-5 text-ink text-left transition-all grid grid-cols-[56px_1fr_auto] sm:block items-center border-ink shadow-[4px_4px_0px_#1a2f3a] ${isSelected ? "selected !border-coral bg-[#fffdf9] -translate-x-0.5 -translate-y-0.5 shadow-[6px_6px_0px_#1a2f3a]" : "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1a2f3a]"}`}
                  aria-pressed={isSelected}
                >
                  {course.tag && (
                    <span className="absolute top-0 right-0 rounded-bl-xl border-l-2 border-b-2 border-ink bg-coral px-3 py-1.5 text-white text-[10px] font-black uppercase tracking-wider">
                      {course.tag}
                    </span>
                  )}
                  
                  <div className="col-start-1 row-start-1 row-end-3 sm:flex sm:items-center sm:justify-between">
                    <span className={`grid w-12 h-12 place-items-center border-2 border-ink rounded-xl text-base font-black shadow-[2px_2px_0px_#1a2f3a] ${theme.bg}`}>
                      {course.level}
                    </span>
                    <span className={`grid w-6 h-6 place-items-center border-2 rounded-full mt-3 mx-auto sm:mt-0 transition-colors ${isSelected ? "border-coral bg-coral text-white" : "border-ink bg-white"}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                  </div>

                  <h2 className="col-start-2 sm:min-h-[44px] sm:mt-6 sm:mb-2 text-base md:text-lg font-black tracking-tight leading-snug m-0 pl-3 sm:pl-0 text-ink">
                    {course.title}
                  </h2>
                  <p className="col-start-2 sm:min-h-[52px] text-xs font-bold leading-relaxed text-[#5a7177] m-0 pl-3 sm:pl-0">
                    {course.description}
                  </p>
                  
                  <div className="hidden sm:grid gap-2 mt-5 mb-5 text-[#5a7177] text-xs font-bold">
                    <span className="flex gap-2 items-center"><Clock className="w-4 h-4 text-ink" />{course.sessions}</span>
                    <span className="flex gap-2 items-center"><Calendar className="w-4 h-4 text-ink" />{course.schedule}</span>
                  </div>

                  <strong className="col-start-3 row-start-1 row-end-3 sm:block sm:border-t-2 sm:border-ink/10 sm:pt-4 text-sm md:text-base font-black text-right sm:text-left text-ink">
                    {course.price}
                  </strong>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Enrollment Form / Auth Side */}
        <div className="w-full lg:sticky lg:top-6">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="grid w-10 h-10 place-items-center border-2 border-ink rounded-xl bg-white text-ink text-sm font-black shadow-[2px_2px_0px_#1a2f3a]">02</span>
            <div>
              <strong className="block text-base md:text-lg font-black text-ink uppercase tracking-wide">Xác nhận đăng ký</strong>
              <small className="block mt-0.5 text-[#5a7177] text-xs font-bold">Khóa học được lưu vào tài khoản</small>
            </div>
          </div>

          {user ? (
            <form className="border-2 border-ink rounded-2xl bg-white p-6 shadow-[5px_5px_0px_#1a2f3a]" onSubmit={handleSubmit}>
              <div className="grid gap-0.5 mb-5 rounded-xl border-2 border-ink bg-[#f7eee4] p-3.5 text-ink shadow-[2px_2px_0px_#1a2f3a]">
                <strong className="font-black text-sm">{user.user_metadata?.full_name || "Học viên"}</strong>
                <span className="text-[#5a7177] text-xs font-bold">{user.email}</span>
              </div>
              
              <label className="block mb-4 text-ink text-xs font-black uppercase tracking-wide">
                Số điện thoại
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="09xx xxx xxx"
                  className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                />
              </label>

              <label className="relative block mb-4 text-ink text-xs font-black uppercase tracking-wide">
                Khung giờ mong muốn
                <select
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  aria-label="Khung giờ học mong muốn"
                  className="appearance-none block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all"
                >
                  <option value="morning">Buổi sáng (08:00 – 10:00)</option>
                  <option value="afternoon">Buổi chiều (14:00 – 16:00)</option>
                  <option value="evening">Buổi tối (19:00 – 21:00)</option>
                </select>
                <ChevronDown className="absolute right-3.5 bottom-3.5 w-4 h-4 pointer-events-none text-ink stroke-[2.5]" />
              </label>

              <label className="block mb-5 text-ink text-xs font-black uppercase tracking-wide">
                Ghi chú <span className="text-[#5a7177] font-bold lowercase">(không bắt buộc)</span>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Bạn muốn được tư vấn thêm điều gì?"
                  rows={3}
                  className="block w-full mt-2 border-2 border-ink rounded-xl outline-none bg-[#fffdf9] p-3 text-ink text-sm font-bold shadow-[2px_2px_0px_#1a2f3a] focus:bg-white focus:shadow-[3px_3px_0px_#1a2f3a] transition-all resize-none"
                />
              </label>

              <button
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-ink rounded-xl py-3.5 text-sm font-black bg-coral text-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] disabled:cursor-wait disabled:opacity-50 disabled:transform-none"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Đang gửi..." : <>{status === "success" ? "Gửi lại đăng ký" : "Gửi đăng ký"} <ArrowRight className="w-4 h-4 stroke-[2.5]" /></>}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 mt-4 border-2 border-ink bg-[#e6f4ea] p-3 rounded-xl text-[#137333] text-xs font-bold shadow-[2px_2px_0px_#1a2f3a]">
                  <Check className="w-4 h-4 stroke-[3]" /> Đã lưu khóa học vào tài khoản của bạn!
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 mt-4 border-2 border-ink bg-[#fce8e6] p-3 rounded-xl text-[#c5221f] text-xs font-bold shadow-[2px_2px_0px_#1a2f3a]">
                  Chưa thể gửi thông tin. Vui lòng thử lại sau.
                </div>
              )}

              <p className="flex items-center justify-center gap-1.5 mt-4 text-[#7fa1a8] text-[11px] font-bold">
                <Shield className="w-3.5 h-3.5" /> Thông tin bảo mật hoàn toàn.
              </p>
            </form>
          ) : (
            <div className="border-2 border-ink rounded-2xl bg-white p-6 shadow-[5px_5px_0px_#1a2f3a]">
              <strong className="block text-lg font-black text-ink uppercase tracking-wide">Yêu cầu tài khoản</strong>
              <p className="mt-2 mb-6 text-[#5a7177] text-sm font-bold leading-relaxed">
                Đăng nhập hoặc tạo tài khoản mới trước khi tiến hành lưu thông tin lớp học.
              </p>
              <Link
                className="w-full inline-flex items-center justify-center gap-2 border-2 border-ink rounded-xl py-3.5 text-sm font-black bg-coral text-white shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a]"
                href="/tai-khoan"
              >
                Đăng nhập / Tạo tài khoản <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <button
                type="button"
                className="w-full text-center mt-4 border-0 bg-transparent text-ink text-xs font-black underline underline-offset-4 cursor-pointer"
                onClick={() => window.location.assign("/tai-khoan")}
              >
                Hoặc tiếp tục nhanh với Google
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Summary Box Section */}
      <section className="w-11/12 max-w-[1160px] mx-auto pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-2 border-ink rounded-2xl bg-white p-5 md:p-6 shadow-[4px_4px_0px_#1a2f3a] gap-4">
          <div>
            <span className="inline-block border-2 border-ink bg-[#fff0cd] px-2 py-0.5 rounded-md text-ink text-[10px] font-black uppercase tracking-wide shadow-[1px_1px_0px_#1a2f3a]">KHÓA HỌC ĐÃ CHỌN</span>
            <strong className="block mt-3 mb-1 text-base md:text-lg font-black text-ink">{selectedCourse.title}</strong>
            <p className="flex items-center gap-2 text-[#5a7177] text-xs font-bold m-0">
              <Users className="w-4 h-4 text-ink" /> {selectedCourse.students} · Khai giảng 18/08
            </p>
          </div>
          <div className="text-left sm:text-right border-t sm:border-t-0 border-ink/10 pt-4 sm:pt-0 w-full sm:w-auto">
            <span className="block text-[#5a7177] text-xs font-bold tracking-wide uppercase">HỌC PHÍ TRỌN KHÓA</span>
            <strong className="block mt-1 text-2xl md:text-3xl text-coral font-black tracking-tight">{selectedCourse.price}</strong>
          </div>
        </div>
      </section>

      {/* Reassurance Footer Bar */}
      <section className="border-t-2 border-ink/10 bg-white">
        <div className="w-11/12 max-w-[1160px] mx-auto min-h-[64px] flex flex-wrap items-center justify-center gap-6 md:gap-14 py-4 text-ink text-xs font-black">
          <span className="flex items-center gap-1.5">✓ Tư vấn miễn phí</span>
          <span className="flex items-center gap-1.5">✓ Lộ trình cá nhân hóa</span>
          <span className="flex items-center gap-1.5">✓ Đổi lớp nếu chưa phù hợp</span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}