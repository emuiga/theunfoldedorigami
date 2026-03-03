import { getEssaysByCategory } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import CodingContent from "@/components/CodingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding",
  description: "Essays about coding and technology.",
};

export const revalidate = 60;

export default async function CodingPage() {
  const essays = await getEssaysByCategory("coding");

  return (
    <div className="min-h-screen">
      <style>{`:root { --page-bg: #0c1520; }`}</style>
      <PageHeader />
      <CodingContent essays={essays} />
    </div>
  );
}
