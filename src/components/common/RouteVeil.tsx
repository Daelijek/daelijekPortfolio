'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * Short fade-through between pages on client-side navigation.
 *
 * `initial={false}`: on the first load the veil starts transparent. It used to be rendered
 * opaque by the server and faded only after hydration, which hid every page (and its largest
 * contentful paint) behind a dark screen until the JavaScript had run.
 */
export default function RouteVeil() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-30 pointer-events-none bg-[#06080A]"
      />
    </AnimatePresence>
  );
}
