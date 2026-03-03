import { getAllEssays } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { EssayListHover } from "@/components/EssayListHover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami",
  description: "All essays from The Unfolded Origami.",
};

export const revalidate = 60;

export default async function OrigamiPage() {
  const essays = await getAllEssays();

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/backg3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 z-0" style={{ background: "rgba(8,14,10,0.72)" }} />
      <style>{`:root { --page-bg: #0e1a14; }`}</style>
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <EssayListHover essays={essays} />
        </div>
      </div>
    </div>
  );
}
