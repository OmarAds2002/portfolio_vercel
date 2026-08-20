import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Writing — Omar Ads",
  description: "Project write-ups on robot learning, RL, and control.",
};

function formatDate(d: string): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-3xl mx-auto px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-violet-400 transition-colors"
        >
          ← Back
        </Link>

        <h1 className="text-4xl font-semibold tracking-tight mt-6 mb-3">Writing</h1>
        <p className="text-neutral-400 mb-12">
          Project write-ups — the debugging, the dead ends, and what actually worked.
        </p>

        <div className="flex flex-col divide-y divide-neutral-800">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group block py-6">
              <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                <span>{formatDate(p.date)}</span>
                <span>·</span>
                <span>{p.readingTime}</span>
              </div>
              <h2 className="text-xl font-medium mb-2 group-hover:text-violet-400 transition-colors">
                {p.title}
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.summary}</p>
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}