import { SiteFooter } from "../components/footer/site-footer";
import { CtaSection } from "../components/home/CtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { JourneySection } from "../components/home/JourneySection";
import { LearnHubSection } from "../components/home/LearnHubSection";
import { MethodSection } from "../components/home/MethodSection";
import { StatsSection } from "../components/home/StatsSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { WhyUsSection } from "../components/home/WhyUsSection";
import { createClient } from "../utils/supabase/server";

type DynamicSection = {
  id: string;
  section_type: string;
  title: string;
  sort_order: number;
  pronItems?: { id: string; japanese_text: string; romaji: string; meaning: string }[];
  videoItems?: { id: string; video_url: string; video_title: string }[];
};

export default async function HomePage() {
  let dynamicSections: DynamicSection[] = [];

  try {
    const supabase = await createClient();
    const { data: sections } = await supabase
      .from("home_sections")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (sections && sections.length > 0) {
      dynamicSections = await Promise.all(
        sections.map(async (sec) => {
          if (sec.section_type === "pronunciation") {
            const { data: items } = await supabase
              .from("pronunciation_items")
              .select("*")
              .eq("section_id", sec.id)
              .order("sort_order");
            return { ...sec, pronItems: items || [] };
          }
          if (sec.section_type === "video") {
            const { data: items } = await supabase
              .from("video_items")
              .select("*")
              .eq("section_id", sec.id)
              .order("sort_order");
            return { ...sec, videoItems: items || [] };
          }
          return sec;
        })
      );
    }
  } catch (e) {
    console.error("Error loading sections:", e);
  }

  const pronItems = dynamicSections.flatMap((s) => s.pronItems ?? []);
  const videoItems = dynamicSections.flatMap((s) => s.videoItems ?? []);
  const learnTitle =
    dynamicSections.find((s) => s.section_type === "video" && s.title)?.title ??
    dynamicSections.find((s) => s.section_type === "pronunciation" && s.title)?.title ??
    "Học thử miễn phí";

  return (
    <main className="min-h-screen bg-[#fffdf9] text-ink font-sans overflow-x-hidden selection:bg-coral/30">
      <HeroSection />
      <StatsSection />
      <JourneySection />

      {(pronItems.length > 0 || videoItems.length > 0) && (
        <LearnHubSection title={learnTitle} pronItems={pronItems} videoItems={videoItems} />
      )}

      <WhyUsSection />
      <MethodSection />
      <TestimonialsSection />
      <CtaSection />
      <SiteFooter />
    </main>
  );
}
