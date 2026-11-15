import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BlogArticleLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const BlogArticleLayout: React.FC<BlogArticleLayoutProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[color:var(--void)] text-[color:var(--ink)]">
      <header className="border-b border-[color:var(--line)] bg-[color:var(--abyss)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--cyan)] transition-colors hover:text-[color:var(--ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Journal</span>
          </Link>
          <Link
            to="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--ink-2)] transition-colors hover:text-[color:var(--ink)]"
          >
            VESTIGE ATLAS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
        <div className="border-b border-[color:var(--line)] pb-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-[color:var(--ink-2)] sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <article className="mt-10">{children}</article>
      </main>
    </div>
  );
};

export default BlogArticleLayout;
