"use client";

import { SiteHeader } from "../header/site-header";

export function HomeHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 md:pt-4 pointer-events-none">
      <div className="pointer-events-auto w-11/12 max-w-[1160px] mx-auto border-[3px] border-ink bg-white rounded-[24px] p-1.5 shadow-[6px_6px_0px_#1a2f3a]">
        <SiteHeader variant="light" />
      </div>
    </div>
  );
}
