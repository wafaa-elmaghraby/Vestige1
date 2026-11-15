import React from 'react';
import Markdown from 'markdown-to-jsx';

interface MarkdownArticleProps {
  markdown: string;
}

/**
 * Long-form article body for the blog island. Typography is tuned for the
 * dark archive surface rather than the default prose palette.
 */
export const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdown }) => (
  <div
    className="prose prose-invert max-w-none
      prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[color:var(--ink)]
      prose-h1:mt-0 prose-h1:text-4xl prose-h1:leading-tight
      prose-h2:mt-12 prose-h2:border-t prose-h2:border-[color:var(--line)] prose-h2:pt-8 prose-h2:text-3xl prose-h2:leading-snug
      prose-h3:mt-10 prose-h3:text-2xl prose-h3:leading-snug
      prose-p:text-[1.02rem] prose-p:leading-8 prose-p:text-[color:var(--ink-2)]
      prose-li:leading-8 prose-li:text-[color:var(--ink-2)]
      prose-strong:text-[color:var(--ink)]
      prose-code:rounded prose-code:bg-[color:var(--surface-2)] prose-code:px-1.5 prose-code:py-0.5
      prose-code:text-[0.9em] prose-code:font-normal prose-code:text-[color:var(--cyan)]
      prose-pre:rounded-xl prose-pre:border prose-pre:border-[color:var(--line)]
      prose-pre:bg-[color:var(--surface)] prose-pre:p-5
      prose-a:text-[color:var(--cyan)] prose-a:no-underline
      prose-a:decoration-[color:var(--line-strong)] prose-a:underline-offset-4
      hover:prose-a:underline prose-blockquote:border-s-[color:var(--blue)]
      prose-blockquote:text-[color:var(--ink-2)] prose-hr:border-[color:var(--line)]"
  >
    <Markdown>{markdown}</Markdown>
  </div>
);

export default MarkdownArticle;