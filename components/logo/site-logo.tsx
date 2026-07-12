import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  dark?: boolean;
};

export function SiteLogo({ dark = false }: SiteLogoProps) {
  return (
    <Link 
      href="/" 
      className="inline-flex items-center gap-3.5 group transition-all duration-200" 
      aria-label="JAPAN AHOLIC - Trang chủ"
    >
      <div className="w-[54px] h-[54px] relative bg-white border-2 border-ink rounded-xl overflow-hidden shadow-[4px_4px_0px_#1a2f3a] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[6px_6px_0px_#1a2f3a] group-active:translate-x-[1px] group-active:translate-y-[1px] group-active:shadow-[2px_2px_0px_#1a2f3a] transition-all duration-200 shrink-0">
        <Image 
          className="object-cover w-full h-full p-1 rounded-lg" 
          src="/logo.jpg" 
          alt="JAPAN AHOLIC Logo" 
          width={54} 
          height={54} 
          priority 
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5 select-none transition-all duration-200 group-hover:translate-x-[1px]">
        <span 
          className={`text-xl font-black tracking-tighter uppercase leading-none transition-all duration-200 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.8)] ${
            dark 
              ? "text-[#ffcad4] group-hover:text-[#fff0cd] group-hover:scale-105" 
              : "text-ink group-hover:text-coral"
          }`}
        >
          JAPAN
        </span>
        <span 
          className={`inline-block text-xs font-black tracking-wide uppercase px-2 py-0.5 border-2 border-ink rounded-md shadow-[2px_2px_0px_#1a2f3a] transition-colors duration-200 ${
            dark 
              ? "bg-[#227e57] text-white group-hover:bg-coral" 
              : "bg-coral text-white group-hover:bg-[#227e57]"
          }`}
        >
          AHOLIC
        </span>
      </div>
    </Link>
  );
}