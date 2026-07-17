"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { getFacebookPageUrl, getMessengerHref } from "../../lib/site-config";
import { SiteLogo } from "../logo/site-logo";

const fbPage = getFacebookPageUrl();
const fbMessenger = getMessengerHref();

function FbLink({
  href,
  children,
  className,
  ...props
}: ComponentProps<"a"> & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#fbf7f0] text-ink pt-16 pb-8 font-sans border-t-2 border-ink/10">
      <div className="w-11/12 max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4">
        
        <div className="lg:col-span-2 flex flex-col gap-5">
          <SiteLogo dark={false} />
          <p className="max-w-[320px] text-xs md:text-sm text-[#5a7177] font-bold leading-relaxed">
            Học tiếng Nhật theo một lộ trình rõ ràng, gần gũi và bền vững. Đồng hành cùng bạn chinh phục JLPT và giao tiếp thực chiến.
          </p>
          
          <div className="flex items-center gap-3 mt-1">
            <FbLink href={fbPage} className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </FbLink>
            <FbLink href={fbMessenger} className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="Messenger">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.015 2 10.73c0 2.913 1.445 5.516 3.707 7.21L5 22l4.168-2.304c.978.272 2.015.418 3.082.418 5.52 0 10-4.015 10-8.73S17.52 2 12 2z"/></svg>
            </FbLink>
            <FbLink href={fbPage} className="grid w-10 h-10 place-items-center rounded-xl border-2 border-ink bg-white text-ink shadow-[2px_2px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#1a2f3a]" aria-label="Fanpage JapanAholic">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.5 2.5 7v10L12 21.5 21.5 17V7L12 2.5zm0 2.2 6.8 3.4v6.8L12 18.3l-6.8-3.4V8.1L12 4.7z"/></svg>
            </FbLink>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Khóa học</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Sơ cấp N5</Link>
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Sơ cấp N4</Link>
            <Link href="/#lo-trinh" className="hover:text-ink transition-colors">Trung cấp N3</Link>
            <Link href="/khoa-hoc" className="hover:text-ink transition-colors">Xem tất cả khóa học</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Về chúng tôi</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <FbLink href={fbPage} className="hover:text-ink transition-colors">Fanpage Facebook</FbLink>
            <FbLink href={fbPage} className="hover:text-ink transition-colors">Giới thiệu</FbLink>
            <FbLink href={fbPage} className="hover:text-ink transition-colors">Tin tức &amp; sự kiện</FbLink>
            <FbLink href={fbMessenger} className="hover:text-ink transition-colors">Nhắn tin trực tiếp</FbLink>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <strong className="text-ink text-sm font-black tracking-wide">Hỗ trợ</strong>
          <nav className="flex flex-col gap-3 text-xs md:text-sm font-bold text-[#5a7177]">
            <FbLink href={fbMessenger} className="hover:text-ink transition-colors">Tư vấn khóa học</FbLink>
            <FbLink href={fbMessenger} className="hover:text-ink transition-colors">Liên hệ</FbLink>
            <FbLink href={fbPage} className="hover:text-ink transition-colors">Cộng đồng học viên</FbLink>
            <FbLink href={fbMessenger} className="hover:text-ink transition-colors">Hỏi đáp nhanh</FbLink>
          </nav>
        </div>

      </div>

      <div className="w-11/12 max-w-[1160px] mx-auto border-t border-ink/10 mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#7fa1a8]">
        <p>© 2026 JapanAholic. Bảo lưu mọi quyền.</p>
        <div className="flex gap-6">
          <FbLink href={fbPage} className="hover:text-ink transition-colors">Fanpage</FbLink>
          <FbLink href={fbMessenger} className="hover:text-ink transition-colors">Messenger</FbLink>
        </div>
      </div>
    </footer>
  );
}
