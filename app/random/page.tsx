import { redirect } from "next/navigation";
import { getRandomEssay } from "@/lib/essays";

export default async function RandomPage() {
  const randomEssay = await getRandomEssay();
  
  if (!randomEssay) {
    redirect("/essays");
  }
  
  redirect(`/essays/${randomEssay.slug}`);
}
