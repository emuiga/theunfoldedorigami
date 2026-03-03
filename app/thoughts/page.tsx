import { getEssaysByCategory } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { EssayListHover } from "@/components/EssayListHover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Essays and reflections on various topics.",
};

export const revalidate = 60;

export default async function ThoughtsPage() {
  const essays = await getEssaysByCategory("thoughts");

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/backg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(8,12,10,0.70)" }} />
      <style>{`:root { --page-bg: #1a140e; }`}</style>
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <EssayListHover essays={essays} />
        </div>
      </div>
    </div>
  );
}
