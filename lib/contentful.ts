import { createClient } from "contentful";

// Contentful types
interface ContentfulEssay {
  title: string;
  slug: string;
  date: string;
  category?: "origami" | "faith" | "coding" | "random" | "thoughts";
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
          category: fields.category,
          excerpt: fields.excerpt,
          image: imageUrl,
          folds: fields.folds,
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
        category: fields.category,
        excerpt: fields.excerpt,
        image: imageUrl,
        folds: fields.folds,
      },
      content: fields.content,
    };
  } catch (error) {
    console.error("Error fetching Contentful essay:", error);
    return null;
  }
}

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

