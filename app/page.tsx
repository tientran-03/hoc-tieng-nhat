import Link from "next/link";
import { ArrowRight, Check, Play, Sparkle, Star } from "../components/icons";
import { CoursePreview } from "../components/course-preview";
import { SiteHeader } from "../components/header/site-header";
import { SiteFooter } from "../components/footer/site-footer";

const points = [
  "Lộ trình từ N5 đến N2 rõ ràng, dễ theo",
  "Lớp nhỏ cùng giáo viên giàu kinh nghiệm",
  "Bài tập, chữa bài và cộng đồng hỗ trợ mỗi ngày",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-ink font-sans overflow-x-hidden selection:bg-coral/30">

      {/* 1. HERO SECTION */}
      <section className="relative pt-4 pb-[80px] md:pb-[120px] px-4">
<div className="relative w-11/12 max-w-[1160px] mx-auto my-4 border-[3px] border-ink bg-white rounded-[24px] p-1.5 shadow-[6px_6px_0px_#1a2f3a]">
  <SiteHeader variant="light" />
</div>
        <div className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center pt-8 relative z-10">

          {/* Hero Left Content */}
          <div className="w-full">


            <h1 className="mt-0 mb-6 text-[44px] md:text-[64px] font-black tracking-tight leading-[1.1]">
              Học tiếng Nhật<br />
              <span className="text-coral underline decoration-ink decoration-4 underline-offset-4">đúng lộ trình.</span>
            </h1>

            <p className="max-w-[490px] text-[#425d68] text-base md:text-lg font-bold leading-relaxed mb-8">
              Từ những nét chữ đầu tiên đến mục tiêu du học hay sự nghiệp — chúng mình đồng hành để bạn tiến bộ mỗi ngày.
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-10">
              <Link
                href="/dang-ky"
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

            {/* Trust Badges Neo style */}
            <div className="flex items-center gap-4 pt-6 border-t-2 border-dashed border-ink/30">
              <div className="flex -space-x-2">
                <i className="grid w-[36px] h-[36px] place-items-center rounded-lg bg-[#e86b56] text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a] not-italic">美</i>
                <i className="grid w-[36px] h-[36px] place-items-center rounded-lg bg-[#f1a43a] text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a] not-italic">夢</i>
                <i className="grid w-[36px] h-[36px] place-items-center rounded-lg bg-[#4ba3be] text-white text-xs font-black border-2 border-ink shadow-[2px_2px_0px_#1a2f3a] not-italic">和</i>
              </div>
              <p className="text-xs md:text-sm text-ink font-bold m-0 leading-tight">
                <strong className="text-coral font-black text-base">4.9/5</strong> từ hơn 1.200 học viên • <span className="text-[#6d7d81]">Hành trình học đáng nhớ</span>
              </p>
            </div>
          </div>
          <div className="w-full relative py-8 flex items-center justify-center">
            <div className="w-full max-w-[420px] bg-white border-2 border-ink rounded-2xl p-6 shadow-[8px_8px_0px_#1a2f3a] relative">
              <div className="absolute -top-5 -right-4 w-12 h-12 bg-[#ffcad4] border-2 border-ink rounded-xl grid place-items-center shadow-[2px_2px_0px_#1a2f3a] rotate-12">
                🎯
              </div>


              {/* Khối thông tin khóa học */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#dcecf2] border-2 border-ink rounded-xl grid place-items-center shadow-[2px_2px_0px_#1a2f3a]">
                  <span className="text-xl font-black text-ink">日</span>
                </div>
                <div>
                  <span className="block text-[11px] font-black text-coral uppercase tracking-wider">BÀI HỌC CƠ BẢN</span>
                  <h3 className="m-0 text-lg font-black text-ink">Tiếng Nhật Sơ Cấp N5</h3>
                </div>
              </div>

              <div className="bg-[#fbf7f0] border-2 border-ink rounded-xl p-4 mb-6 text-center shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
                <span className="block text-xs font-bold text-[#718085] mb-1">Từ vựng hôm nay</span>
                <div className="text-2xl font-black text-ink tracking-wide">こんにちは</div>
                <small className="block text-xs text-coral font-bold mt-1">Xin chào (Ban ngày)</small>
              </div>

              {/* Thanh Tiến độ (Progress Bar) chuẩn chỉnh như ảnh */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-black text-ink">Tiến độ khóa học</span>
                  <span className="text-xs font-black text-coral bg-[#ffe1d8] border border-ink px-1.5 py-0.5 rounded">65%</span>
                </div>
                <div className="w-full h-5 bg-[#fbf7f0] border-2 border-ink rounded-full p-0.5 overflow-hidden">
                  <div className="h-full bg-coral rounded-full border-r-2 border-ink" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Nút chính bên trong Card */}
              <button className="w-full min-h-[48px] border-2 border-ink rounded-xl bg-[#227e57] text-white text-sm font-black shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#1a2f3a]">
                Học Tiếp Bài Lên Lớp
              </button>
            </div>

            {/* Huy hiệu Star nhỏ bay lơ lửng cạnh Khung */}
            <div className="absolute right-4 bottom-2 w-10 h-10 bg-[#fff0cd] border-2 border-ink rounded-full grid place-items-center shadow-[2px_2px_0px_#1a2f3a] animate-bounce">
              <Star className="w-5 h-5 text-[#c48516] fill-current" />
            </div>

          </div>
        </div>
      </section>

      {/* 2. PROOF SECTION */}
      <section className="mb-16 px-4">
        <div className="w-11/12 max-w-[1160px] mx-auto bg-white border-2 border-ink rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_#1a2f3a] grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <p className="text-sm md:text-base font-bold text-ink m-0 md:border-r-2 md:border-dashed md:border-ink/30 pb-4 md:pb-0 md:pr-4">
            Không chỉ là học một ngôn ngữ,<br />
            <span className="text-coral font-black">mà là mở ra một thế giới mới.</span>
          </p>
          <div className="text-center md:text-left md:pl-4">
            <strong className="block text-3xl font-black text-ink">12.000+</strong>
            <span className="block text-xs font-bold text-[#829296]">Học viên theo học</span>
          </div>
          <div className="text-center md:text-left border-y-2 md:border-y-0 md:border-x-2 border-dashed border-ink/30 py-4 md:py-0 md:px-6">
            <strong className="block text-3xl font-black text-coral">94%</strong>
            <span className="block text-xs font-bold text-[#829296]">Hài lòng với lộ trình</span>
          </div>
          <div className="text-center md:text-left md:pl-2">
            <strong className="block text-3xl font-black text-ink">06 năm</strong>
            <span className="block text-xs font-bold text-[#829296]">Đồng hành tin cậy</span>
          </div>
        </div>
      </section>

      {/* 3. JOURNEY SECTION (LỘ TRÌNH) */}
      <section id="lo-trinh" className="py-12 px-4">
        <div className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">

          <div className="w-full lg:sticky lg:top-8">
            <span className="inline-block mb-4 text-ink text-xs font-black uppercase bg-[#fff0cd] border-2 border-ink px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#1a2f3a]">
              LỘ TRÌNH CỦA BẠN
            </span>
            <h2 className="mt-0 mb-4 text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Mỗi mục tiêu đều có<br />một điểm khởi đầu.
            </h2>
            <p className="max-w-[420px] text-[#68777c] text-sm md:text-base font-bold mb-6">
              Chọn đúng cấp độ, học đúng trọng tâm và từng bước tiến gần hơn tới Nhật Bản trong mơ.
            </p>
            <Link href="/dang-ky" className="inline-flex items-center gap-2 text-sm font-black text-coral hover:underline">
              Tìm lớp phù hợp ngay <ArrowRight className="w-4 h-4 stroke-[3]" />
            </Link>
          </div>

          {/* Cột hiển thị danh sách khóa học phong cách hộp thô mộc */}
          <div className="w-full grid gap-5">
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_#1a2f3a] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] transition-all">
              <CoursePreview level="N5" title="Nền tảng tiếng Nhật" detail="Dành cho người mới bắt đầu" color="coral" lesson="Hiragana & Katakana" />
            </div>
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_#1a2f3a] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] transition-all">
              <CoursePreview level="N4" title="Giao tiếp vững vàng" detail="Dành cho người đã biết nền tảng" color="gold" lesson="Mẫu câu thường ngày" />
            </div>
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_#1a2f3a] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] transition-all">
              <CoursePreview level="N3" title="Bứt phá mục tiêu" detail="Sẵn sàng cho công việc & du học" color="blue" lesson="Đọc hiểu thực tế" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. METHOD SECTION */}
      <section id="phuong-phap" className="py-12 px-4">
        <div className="w-11/12 max-w-[1160px] mx-auto border-2 border-ink rounded-2xl bg-white p-6 md:p-10 shadow-[6px_6px_0px_#1a2f3a] grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 items-center">

          <div className="w-full">
            <span className="inline-block mb-4 text-ink text-xs font-black uppercase bg-[#dcecf2] border-2 border-ink px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#1a2f3a]">
              PHƯƠNG PHÁP HỌC
            </span>
            <h2 className="mt-0 mb-4 text-3xl md:text-4xl font-black text-ink">
              Học thật, dùng được thật.
            </h2>
            <p className="max-w-[510px] text-[#6d7d81] text-sm font-bold mb-6">
              Không học thuộc máy móc. Mỗi buổi học kết hợp từ vựng, phản xạ và tình huống gần với cuộc sống tại Nhật.
            </p>
            <ul className="grid gap-3.5 p-0 list-none text-ink text-sm font-black">
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

          {/* Sơ đồ vòng tròn tương tác tĩnh */}
          <div className="w-full bg-[#fbf7f0] border-2 border-ink rounded-xl p-8 flex flex-col items-center justify-center text-center relative shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)]">
            <div className="w-20 h-20 bg-ink text-white rounded-xl flex flex-col items-center justify-center text-sm font-black border-2 border-ink shadow-[4px_4px_0px_#coral] mb-4">
              <span>一步</span>
              <span className="text-coral">ずつ</span>
            </div>
            <p className="text-xs font-black text-ink m-0">Từng bước một vững chắc</p>
            <span className="absolute top-4 left-6 bg-[#ffe1d8] border-2 border-ink px-2 py-0.5 rounded-md text-xs font-black text-coral shadow-[2px_2px_0px_#1a2f3a]">あ</span>
            <span className="absolute bottom-4 right-6 bg-[#dcecf2] border-2 border-ink px-2 py-0.5 rounded-md text-xs font-black text-ink shadow-[2px_2px_0px_#1a2f3a]">学</span>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-12 px-4 mb-8">
        <div className="w-11/12 max-w-[1160px] mx-auto bg-coral border-2 border-ink rounded-2xl p-8 md:p-12 text-center shadow-[6px_6px_0px_#1a2f3a] relative overflow-hidden">
          <h2 className="mt-0 mb-6 text-3xl md:text-5xl font-black text-white tracking-tight leading-none drop-shadow-[2px_2px_0px_#1a2f3a]">
            Tiếng Nhật gần hơn<br />bạn nghĩ rất nhiều.
          </h2>
          <Link
            href="/dang-ky"
            className="inline-flex items-center justify-center gap-2 min-h-[52px] border-2 border-ink rounded-xl bg-white px-8 text-ink text-sm font-black shadow-[4px_4px_0px_#1a2f3a] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1a2f3a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a2f3a]"
          >
            Đăng ký tư vấn miễn phí <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}