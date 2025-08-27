'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NavBarHome() {
  const navItems = [
    { label: 'visão geral', href: '/overview' },
    { label: 'relatórios', href: '/reports' },
    { label: 'planos', href: '/subscriptions' },
    { label: 'limites de gastos', href: '/budget-limits' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (hoveredIndex !== null && itemRefs.current[hoveredIndex]) {
      const item = itemRefs.current[hoveredIndex];
      const container = containerRef.current;
      if (item && container) {
        const itemRect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setUnderlineProps({
          left: itemRect.left - containerRect.left,
          width: itemRect.width,
        });
      }
    }
  }, [hoveredIndex]);

  return (
    <nav
      ref={containerRef}
      className="flex sticky top-0 z-50 bg-neutral-800 text-white items-center justify-around h-12 px-4 sm:px-8 w-full"
    >
      {navItems.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el; // sem retorno
        }}

          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative px-2 text-sm text-center w-40 sm:text-base cursor-pointer"
        >
          <Link href={item.href} className="block w-full h-full">
            {item.label}
          </Link>
        </div>
      ))}

      {hoveredIndex !== null && (
        <motion.div
          className="absolute bottom-0 h-[2px] bg-white rounded"
          animate={{ left: underlineProps.left, width: underlineProps.width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </nav>
  );
}
