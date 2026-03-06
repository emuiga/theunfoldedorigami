import { getAllEssays } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { ThoughtsList } from "@/components/ThoughtsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Writing by Steve Muiga — technical and otherwise.",
};

export const revalidate = 60;

export default async function ThoughtsPage() {
  const essays = await getAllEssays();

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
      <div className="absolute inset-0 z-0" style={{ background: "rgba(4,47,46,0.84)" }} />
      <style>{`:root { --page-bg: #042F2E; }`}</style>
      <PageHeader />

      <div className="relative z-10 min-h-screen pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Intro copy */}
          <p
            className="mb-14 max-w-xl italic leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "rgba(245,245,220,0.68)",
            }}
          >
            Sometimes I write long-form about whatever I&apos;m currently building or thinking through.
            Some of these may be a product of their time — and that&apos;s fine.
          </p>

          <ThoughtsList essays={essays} />
        </div>
      </div>
    </div>
  );
}
