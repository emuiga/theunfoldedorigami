import { getAllEssays } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { EssayListHover } from "@/components/EssayListHover";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description: "All essays from The Unfolded Origami. Ideas, slowly unfolded.",
};

export const revalidate = 60;

export default async function EssaysPage() {
  const essays = await getAllEssays();

  return (
    <div className="min-h-screen">
      <style>{`:root { --page-bg: #0e1a14; }`}</style>
      <PageHeader />
      <div className="relative z-10 min-h-screen pt-40 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <EssayListHover essays={essays} />
        </div>
      </div>
    </div>
  );
}
