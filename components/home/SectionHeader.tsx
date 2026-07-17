type SectionHeaderProps = {
  badge: string;
  title: string;
  description?: string;
  badgeColor?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  badge,
  title,
  description,
  badgeColor = "bg-[#dcecf2]",
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? "text-center" : "text-left"}`}>
      <span
        className={`inline-block mb-4 text-ink text-xs font-black uppercase ${badgeColor} border-2 border-ink px-3 py-1 rounded-lg shadow-[2px_2px_0px_#1a2f3a]`}
      >
        {badge}
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-ink tracking-tight leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[#6d7d81] text-sm md:text-base font-bold max-w-[560px] ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
