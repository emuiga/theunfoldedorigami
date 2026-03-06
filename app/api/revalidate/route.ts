import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const slug = body?.fields?.slug?.["en-US"] ?? null;

    // Always revalidate the listing pages
    revalidatePath("/thoughts");
    revalidatePath("/essays");

    // Revalidate the specific essay page if we have the slug
    if (slug) {
      revalidatePath(`/essays/${slug}`);
    }

    return NextResponse.json({ revalidated: true, slug });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
