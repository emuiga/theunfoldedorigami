import { getEssaysByCategory } from "@/lib/essays";
import { PageHeader } from "@/components/PageHeader";
import { VideoBackground } from "@/components/VideoBackground";
import CodingContent from "@/components/CodingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coding",
  description: "Essays about coding and technology.",
};

export default async function CodingPage() {
  const essays = await getEssaysByCategory("coding");

  return (
    <>
      <VideoBackground />
      <PageHeader />
      <CodingContent essays={essays} />
    </>
  );
}
