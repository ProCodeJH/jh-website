"use client";

import { useCursor } from "@/hooks/use-cursor";

export function CustomCursor() {
  const { dotRef, outlineRef } = useCursor();

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
}
