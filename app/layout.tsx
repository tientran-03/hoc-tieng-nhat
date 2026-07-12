import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihongo Path | Học tiếng Nhật theo lộ trình",
  description: "Nền tảng học tiếng Nhật và đăng ký khóa học trực tuyến.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased bg-[#fbf7f0] text-ink min-h-screen text-rendering-speed">
        {children}
      </body>
    </html>
  );
}