import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getBlogRoute } from '@/lib/blog';

const BlogIndexPage = () => (
  <main className="min-h-screen bg-[color:var(--void)] text-[color:var(--ink)]">
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--cyan)] transition-colors hover:text-[color:var(--ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Atlas</span>
      </Link>
      <div className="max-w-3xl space-y-5">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--cyan)]">
          VESTIGE // ARCHIVE JOURNAL
        </p>
        <h1 className="font-display text-4xl leading-tight text-[color:var(--ink)] sm:text-5xl">
          Field notes on off-world hardware &amp; orbital heritage
        </h1>
        <p className="text-lg leading-8 text-[color:var(--ink-2)]">
          Add Markdown files under <code className="rounded bg-[color:var(--surface-2)] px-1.5 py-0.5 text-sm text-[color:var(--cyan)]">seo/content/</code> to automatically generate journal articles and prerendered SEO routes.
        </p>
      </div>

      <div className="mt-12 grid gap-6">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)]"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[color:var(--ink-3)]">
                {post.frontmatter.date ? <span>{post.frontmatter.date}</span> : null}
                {post.frontmatter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--line)] bg-[color:var(--surface-2)] px-3 py-1 text-[color:var(--cyan)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-display mt-4 text-2xl text-[color:var(--ink)]">
                <Link className="transition-colors hover:text-[color:var(--cyan)]" to={getBlogRoute(post.slug)}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--ink-2)]">
                {post.description}
              </p>
              <Link
                to={getBlogRoute(post.slug)}
                className="mt-5 inline-flex font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--cyan)] underline underline-offset-4"
              >
                Read article
              </Link>
            </article>
          ))
        ) : (
          <section className="rounded-2xl border border-dashed border-[color:var(--line-strong)] bg-[color:var(--surface)] p-8">
            <h2 className="font-display text-2xl text-[color:var(--ink)]">No articles published yet</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--ink-2)]">
              Add Markdown files under <code className="rounded bg-[color:var(--surface-2)] px-1.5 py-0.5 text-sm text-[color:var(--cyan)]">seo/content/</code> and article cards will appear here automatically during development and static prerendering.
            </p>
          </section>
        )}
      </div>
    </section>
  </main>
);

export default BlogIndexPage;
