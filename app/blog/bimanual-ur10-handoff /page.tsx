import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return { title: `${meta.title} — Omar Ads`, description: meta.summary };
  } catch {
    return {};
  }
}

function formatDate(d: string): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const mdxComponents = {
  h1: (p: any) => <h1 className="text-3xl font-semibold tracking-tight mt-10 mb-4" {...p} />,
  h2: (p: any) => <h2 className="text-2xl font-medium tracking-tight mt-10 mb-3" {...p} />,
  h3: (p: any) => <h3 className="text-xl font-medium mt-8 mb-2" {...p} />,
  p: (p: any) => <p className="text-neutral-300 leading-relaxed my-4" {...p} />,
  ul: (p: any) => (
    <ul className="list-disc list-outside ml-5 my-4 space-y-1.5 text-neutral-300" {...p} />
  ),
  ol: (p: any) => (
    <ol className="list-decimal list-outside ml-5 my-4 space-y-1.5 text-neutral-300" {...p} />
  ),
  li: (p: any) => <li className="leading-relaxed" {...p} />,
  a: (p: any) => (
    <a className="text-violet-400 underline underline-offset-4 hover:text-violet-300" {...p} />
  ),
  blockquote: (p: any) => (
    <blockquote
      className="border-l-2 border-violet-500/40 pl-4 my-6 text-neutral-400 italic"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-neutral-800" />,
  pre: (p: any) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 text-sm leading-relaxed"
      {...p}
    />
  ),
  // Inline code has no className; fenced code gets `language-*` from rehype-prism-plus.
  code: ({ className, ...rest }: any) =>
    className ? (
      <code className={className} {...rest} />
    ) : (
      <code
        className="rounded bg-neutral-800 px-1.5 py-0.5 text-[0.85em] text-violet-200"
        {...rest}
      />
    ),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: { meta: ReturnType<typeof getPostBySlug>["meta"]; content: string };
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post!;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <article className="max-w-3xl mx-auto px-8 py-16 sm:py-24">
        <Link
          href="/blog"
          className="text-sm text-neutral-500 hover:text-violet-400 transition-colors"
        >
          ← All writing
        </Link>

        <div className="flex items-center gap-3 text-xs text-neutral-500 mt-8 mb-3">
          <span>{formatDate(meta.date)}</span>
          <span>·</span>
          <span>{meta.readingTime}</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">{meta.title}</h1>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-10">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrism, { showLineNumbers: false }]],
            },
          }}
        />
      </article>
    </main>
  );
}