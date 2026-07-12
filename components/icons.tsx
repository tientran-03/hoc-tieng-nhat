type IconProps = { 
  size?: number; 
  className?: string; // Thêm thuộc tính này để nhận class Tailwind từ ngoài truyền vào
};

export function ArrowRight({ size = 18, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; 
}

export function Sparkle({ size = 15, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Zm7 14 .9 3.1L23 20l-3.1.9L19 24l-.9-3.1L15 20l3.1-.9L19 16Z" /></svg>; 
}

export function Play({ size = 16, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" /></svg>; 
}

export function Star({ size = 14, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.1l6.2-.9L12 2.5Z" /></svg>; 
}

export function Check({ size = 18, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5" /></svg>; 
}

export function ChevronDown({ size = 16, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>; 
}

export function Calendar({ size = 18, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>; 
}

export function Clock({ size = 18, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>; 
}

export function Users({ size = 18, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6" /></svg>; 
}

export function Shield({ size = 20, className }: IconProps) { 
  return <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>; 
}