"use client";

import Link from "next/link";
import { SiteLogo } from "../logo/site-logo";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#fbf7f0] text-ink pt-16 pb-8 font-sans border-t-2 border-ink/10">
      <div className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
        
        {/* Cột 1: Thông tin thương hiệu & Mạng xã hội */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <SiteLogo dark={false} />
          <p className="max-w-[320px] text-xs md:text-sm text-[#5a7177] font-bold leading-relaxed">
            Học tiếng Nhật theo một lộ trình rõ ràng, gần gũi và bền vững. Đồng hành cùng bạn chinh phục JLPT và giao tiếp thực chiến.
          </p>
          
          {/* Social Icons dạng hộp vuông bo góc viền đen chuẩn style ảnh mẫu */}
          <div className="flex items-center gap-3 mt-1">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93 Bell.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* Cột 2: Khám phá */}
        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Courses</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Web Development</Link>
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Design</Link>
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Data Science</Link>
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Mobile Apps</Link>
          </nav>
        </div>

        {/* Cột 3: Công ty */}
        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Company</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <Link href="/gioi-thieu" className="hover:text-ink transition-colors">About Us</Link>
            <Link href="/tuyen-dung" className="hover:text-ink transition-colors">Careers</Link>
            <Link href="/tin-tuc" className="hover:text-ink transition-colors">Blog</Link>
            <Link href="/doi-tac" className="hover:text-ink transition-colors">Partners</Link>
          </nav>
        </div>

        {/* Cột 4: Hỗ trợ */}
        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Support</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <Link href="/tro-giup" className="hover:text-ink transition-colors">Help Center</Link>
            <Link href="/lien-he" className="hover:text-ink transition-colors">Contact</Link>
            <Link href="/cong-dong" className="hover:text-ink transition-colors">Community</Link>
            <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
          </nav>
        </div>

      </div>

      {/* Đường gạch ngang mảnh ngăn cách phần Bản quyền */}
      <div className="w-11/12 max-w-[1160px] mx-auto border-t border-ink/10 mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#7fa1a8]">
        <p>© 2026 Nihongo Path. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/chinh-sach" className="hover:text-ink transition-colors">Privacy</Link>
          <Link href="/chinh-sach" className="hover:text-ink transition-colors">Terms</Link>
          <Link href="/chinh-sach" className="hover:text-ink transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}