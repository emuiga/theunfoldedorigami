import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getAllContentfulEssays,
  getContentfulEssayBySlug,
  getAllContentfulEssaySlugs,
} from "./contentful";

export interface EssayFrontmatter {
  title: string;
  date: string;
  folds?: number;
  excerpt?: string;
  category?: string;
  image?: string;
  substackUrl?: string;
}

export interface Essay {
  slug: string;
  frontmatter: EssayFrontmatter;
  content: string;
}

const essaysDirectory = path.join(process.cwd(), "content/essays");

// Use Contentful if environment variables are set, otherwise fall back to file system
const useContentful =
  !!process.env.CONTENTFUL_SPACE_ID && !!process.env.CONTENTFUL_ACCESS_TOKEN;

async function getAllFileEssays(): Promise<Essay[]> {
  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(essaysDirectory);
  const essays = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(essaysDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as EssayFrontmatter,
        content,
      };
    });

  // Sort by date, newest first
  return essays.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export async function getAllEssays(): Promise<Essay[]> {
  if (useContentful) {
    return await getAllContentfulEssays();
  }
  return await getAllFileEssays();
}

export async function getEssayBySlug(slug: string): Promise<Essay | null> {
  if (useContentful) {
    return await getContentfulEssayBySlug(slug);
  }

  try {
    const fullPath = path.join(essaysDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as EssayFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export async function getAllEssaySlugs(): Promise<string[]> {
  if (useContentful) {
    return await getAllContentfulEssaySlugs();
  }

  if (!fs.existsSync(essaysDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(essaysDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export async function getEssaysByCategory(
  category: "technical" | "nontechnical"
): Promise<Essay[]> {
  const essays = await getAllEssays();
  return essays.filter((essay) => essay.frontmatter.category === category);
}

export async function getRandomEssay(): Promise<Essay | null> {
  const essays = await getAllEssays();
  if (essays.length === 0) return null;
  return essays[Math.floor(Math.random() * essays.length)];
}

