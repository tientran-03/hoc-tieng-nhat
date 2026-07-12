"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "../../lib/supabase/client";
import { SiteLogo } from "../logo/site-logo";
import { ArrowRight } from "../icons";

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

export function SiteHeader({ variant = "light" }: SiteHeaderProps) {
  const [accountName, setAccountName] = useState<string | null>(null);
  const isDark = variant === "dark";

  useEffect(() => {
    // Đồng bộ trạng thái người dùng với Supabase
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const updateAccount = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAccountName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || null);
    };

    void updateAccount();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setAccountName(user?.user_metadata?.full_name || user?.email?.split("@")[0] || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    // Bỏ sticky ở đây, đổi thành một flex container sạch sẽ để file HomePage quản lý khối bọc ngoài
    <header className={`w-full flex items-center justify-between gap-4 px-2 md:px-4 h-16 md:h-20 select-none ${
      isDark ? "text-white" : "text-ink"
    }`}>
      
      {/* Site Logo */}
      <div className="shrink-0">
        <SiteLogo dark={isDark} />
      </div>
      
      {/* Navigation Links */}
      <nav className="flex items-center gap-4 md:gap-8 text-xs md:text-sm font-black" aria-label="Điều hướng chính">
        
        {/* Menu Item: Lộ trình */}
        <Link 
          href="/#lo-trinh" 
          className={`relative py-1 transition-colors group ${
            isDark ? "text-white hover:text-coral" : "text-[#43575c] hover:text-coral"
          }`}
        >
          Lộ trình
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-coral transition-all duration-200 group-hover:w-full" />
        </Link>

        {/* Menu Item: Phương pháp */}
        <Link 
          href="/#phuong-phap" 
          className={`relative py-1 transition-colors group ${
            isDark ? "text-white hover:text-coral" : "text-[#43575c] hover:text-coral"
          }`}
        >
          Phương pháp
          <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-coral transition-all duration-200 group-hover:w-full" />
        </Link>
        

        
        <Link 
          href="/khoa-hoc" 
          className={`inline-flex items-center gap-1.5 border-2 border-ink rounded-xl px-4 py-2 md:px-5 md:py-2.5 text-[11px] md:text-xs font-black tracking-wide uppercase shadow-[3px_3px_0px_#1a2f3a] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#1a2f3a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#1a2f3a] ${
            isDark 
              ? "bg-[#227e57] text-white" 
              : "bg-[#227e57] text-white" 
          }`}
        >
          <span>Khoá Học</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </Link>

      </nav>
    </header>
  );
}