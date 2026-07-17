import { SiteFooter } from "../components/footer/site-footer";
import { CtaSection } from "../components/home/CtaSection";
import { HeroSection } from "../components/home/HeroSection";
import { JourneySection } from "../components/home/JourneySection";
import { MethodSection } from "../components/home/MethodSection";
import { PronunciationSection } from "../components/home/PronunciationSection";
import { StatsSection } from "../components/home/StatsSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { VideoSection } from "../components/home/VideoSection";
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

  return (
    <main className="min-h-screen bg-[#fffdf9] text-ink font-sans overflow-x-hidden selection:bg-coral/30">
      {/* 1. Hero — giới thiệu + CTA chính */}
      <HeroSection />

      {/* 2. Social proof — số liệu tin cậy */}
      <StatsSection />

      {/* 3. Lộ trình khóa học N5–N3 */}
      <JourneySection />

      {/* 4. Section động từ Supabase (phát âm, video) */}
      {dynamicSections.map((sec) => {
        if (sec.section_type === "pronunciation" && sec.pronItems && sec.pronItems.length > 0) {
          return (
            <PronunciationSection key={sec.id} sectionTitle={sec.title} items={sec.pronItems} />
          );
        }
        if (sec.section_type === "video" && sec.videoItems && sec.videoItems.length > 0) {
          return <VideoSection key={sec.id} sectionTitle={sec.title} items={sec.videoItems} />;
        }
        return null;
      })}

      {/* 5. Lý do chọn — 4 điểm mạnh */}
      <WhyUsSection />

      {/* 6. Phương pháp học */}
      <MethodSection />

      {/* 7. Testimonials — câu chuyện học viên */}
      <TestimonialsSection />

      {/* 8. CTA cuối trang */}
      <CtaSection />

      <SiteFooter />
    </main>
  );
}
