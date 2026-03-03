import { getEssaysByCategory } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { EssayListHover } from "@/components/EssayListHover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faith",
  description: "Essays about faith and spirituality.",
};

export const revalidate = 60;

export default async function FaithPage() {
  const essays = await getEssaysByCategory("faith");

  return (
    <div className="min-h-screen">
      <style>{`:root { --page-bg: #0f1525; }`}</style>
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <EssayListHover essays={essays} />
        </div>
      </div>
    </div>
  );
}
