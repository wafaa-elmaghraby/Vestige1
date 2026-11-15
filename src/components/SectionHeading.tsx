import React from 'react';

interface SectionHeadingProps {
  index: string;
  tag: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
}

/**
 * Shared chapter header: numbered index, mono tag, display title and an
 * optional right-aligned control cluster. Keeps every section on the same
 * baseline rhythm.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  tag,
  title,
  description,
  align = 'left',
  action,
}) => {
  const centered = align === 'center';

  return (
    <header
      className={`mb-10 flex flex-col gap-6 border-b border-[color:var(--line)] pb-7 md:mb-12 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="font-mono-tabular text-[11px] tracking-[0.18em] text-[color:var(--ink-3)]">
            {index}
          </span>
          <span className="h-px w-6 bg-[color:var(--line-strong)]" aria-hidden="true" />
          <span className="chapter-tag">{tag}</span>
        </div>

        <h2 className="chapter-title mt-4">{title}</h2>

        {description && <p className="chapter-sub mt-3">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
};