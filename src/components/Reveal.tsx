'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scene sequencing: a section arrives once and is never replayed on scroll-back.
 * CSS handles the reduced-motion case by rendering the final state, so this
 * component does not need to branch on the preference.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3;
  as?: 'div' | 'section';
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  const cls = [
    'reveal',
    seen ? 'reveal--in' : '',
    delay ? `reveal--d${delay}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    // @ts-expect-error — ref type narrows per tag, both are HTMLElement
    <Tag ref={ref} className={cls}>{children}</Tag>
  );
}
