import { redirect } from "next/navigation";
import { getRandomEssay } from "@/lib/essays";
import { SiteHeader } from "@/components/SiteHeader";

export default async function RandomPage() {
  const randomEssay = await getRandomEssay();
  
  if (!randomEssay) {
    redirect("/essays");
  }
  
  redirect(`/essays/${randomEssay.slug}`);
}
