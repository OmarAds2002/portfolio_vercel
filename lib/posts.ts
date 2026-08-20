import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO string, e.g. "2026-08-18"
  summary: string;
  tags: string[];
  readingTime: string;
};

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
  return `${minutes} min read`;
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    summary: (data.summary as string) ?? "",
    tags: (data.tags as string[]) ?? [],
    readingTime: estimateReadingTime(content),
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { data, content } = matter(raw);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: toMeta(slug, data, content), content };
}