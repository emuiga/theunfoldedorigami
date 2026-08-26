import { createClient } from "contentful";

// Contentful types
interface ContentfulEssay {
  title: string;
  slug: string;
  date: string;
  category?: "technical" | "nontechnical";
  excerpt?: string;
  image?: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
  content: string;
  folds?: number;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export async function getAllContentfulEssays(): Promise<any[]> {
  try {
    const entries = await client.getEntries({
      content_type: "origami", // Using "origami" content type
      order: "-fields.date" as any,
      include: 2, // Include linked assets
    });

    return entries.items.map((item) => {
      const fields = item.fields as any;
      let imageUrl: string | undefined;
      
      // Handle image as array or single object
      if (fields.image) {
        const image = Array.isArray(fields.image) ? fields.image[0] : fields.image;
        if (image && image.fields && image.fields.file) {
          imageUrl = `https:${image.fields.file.url}`;
        }
      }

      return {
        slug: fields.slug,
        frontmatter: {
          title: fields.title,
          date: fields.date,
          category: fields.category?.toLowerCase(),
          excerpt: fields.excerpt,
          image: imageUrl,
          folds: fields.folds,
          substackUrl: fields.substackUrl,
        },
        content: fields.content || "",
      };
    });
  } catch (error) {
    console.error("Error fetching Contentful essays:", error);
    return [];
  }
}

export async function getContentfulEssayBySlug(slug: string): Promise<any | null> {
  try {
    const entries = await client.getEntries({
      content_type: "origami", // Using "origami" content type
      "fields.slug": slug,
      limit: 1,
      include: 2, // Include linked assets
    });

    if (entries.items.length === 0) {
      return null;
    }

    const item = entries.items[0];
    const fields = item.fields as any;
    let imageUrl: string | undefined;
    
    // Handle image as array or single object
    if (fields.image) {
      const image = Array.isArray(fields.image) ? fields.image[0] : fields.image;
      if (image && image.fields && image.fields.file) {
        imageUrl = `https:${image.fields.file.url}`;
      }
    }

    return {
      slug: fields.slug,
      frontmatter: {
        title: fields.title,
        date: fields.date,
        category: fields.category?.toLowerCase(),
        excerpt: fields.excerpt,
        image: imageUrl,
        folds: fields.folds,
        substackUrl: fields.substackUrl,
      },
      content: fields.content,
    };
  } catch (error) {
    console.error("Error fetching Contentful essay:", error);
    return null;
  }
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<any[]> {
  try {
    const entries = await client.getEntries({
      content_type: "project",
      order: "-fields.year" as any,
      include: 2,
    });

    return entries.items.map((item) => {
      const fields = item.fields as any;
      let thumbnailUrl: string | undefined;
      if (fields.thumbnail) {
        const thumb = Array.isArray(fields.thumbnail) ? fields.thumbnail[0] : fields.thumbnail;
        if (thumb?.fields?.file) thumbnailUrl = `https:${thumb.fields.file.url}`;
      }
      return {
        title:       fields.title,
        description: fields.description,
        type:        fields.type || "website",
        href:        fields.link || null,
        thumbnail:   thumbnailUrl,
        year:        fields.year ? new Date(fields.year).getFullYear().toString() : "",
        skills:      Array.isArray(fields.skills) ? fields.skills : [],
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ─── Lab ──────────────────────────────────────────────────────────────────────

export async function getAllLabs(): Promise<any[]> {
  try {
    const entries = await client.getEntries({
      content_type: "lab",
      order: "-fields.year" as any,
      include: 2,
    });

    return entries.items.map((item) => {
      const fields = item.fields as any;
      let thumbnailUrl: string | undefined;
      if (fields.thumbnail) {
        const thumb = Array.isArray(fields.thumbnail) ? fields.thumbnail[0] : fields.thumbnail;
        if (thumb?.fields?.file) thumbnailUrl = `https:${thumb.fields.file.url}`;
      }
      return {
        title:       fields.title,
        description: richTextToString(fields.description),
        href:        fields.link || null,
        thumbnail:   thumbnailUrl,
        year:        fields.year ? new Date(fields.year).getFullYear().toString() : "",
        tags:        Array.isArray(fields.tag) ? fields.tag : (fields.tag ? [fields.tag] : []),
        writeup:     fields.writeup || null,
      };
    });
  } catch (error) {
    console.error("Error fetching lab items:", error);
    return [];
  }
}

// ─── Books ────────────────────────────────────────────────────────────────────

function richTextToString(doc: any): string {
  if (!doc || typeof doc !== "object") return String(doc ?? "");
  if (doc.nodeType === "text") return doc.value || "";
  if (Array.isArray(doc.content)) return doc.content.map(richTextToString).join("");
  return "";
}

export async function getAllBooks(): Promise<any[]> {
  try {
    const entries = await client.getEntries({
      content_type: "book",
      order: "-fields.yearRead" as any,
      include: 2,
    });

    return entries.items.map((item) => {
      const fields = item.fields as any;
      let coverUrl: string | undefined;
      if (fields.coverImage) {
        const img = Array.isArray(fields.coverImage) ? fields.coverImage[0] : fields.coverImage;
        if (img?.fields?.file) coverUrl = `https:${img.fields.file.url}`;
      }
      return {
        title:    fields.title,
        author:   fields.author,
        cover:    coverUrl,
        yearRead: fields.yearRead ? new Date(fields.yearRead).getFullYear().toString() : "",
        tag:      fields.tag,
        reaction: richTextToString(fields.reaction),
      };
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

export async function getAllQuotes(): Promise<any[]> {
  try {
    const entries = await client.getEntries({
      content_type: "quote",
      include: 1,
    });

    return entries.items.map((item) => {
      const fields = item.fields as any;
      return {
        text:        fields.text,
        attribution: fields.attribution,
        type:        fields.type,
      };
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
}

// ─── Essay slugs ──────────────────────────────────────────────────────────────

export async function getAllContentfulEssaySlugs(): Promise<string[]> {
  try {
    const entries = await client.getEntries({
      content_type: "origami", // Using "origami" content type
      select: "fields.slug" as any,
    });

    return entries.items.map((item: any) => item.fields.slug as string);
  } catch (error) {
    console.error("Error fetching Contentful essay slugs:", error);
    return [];
  }
}

