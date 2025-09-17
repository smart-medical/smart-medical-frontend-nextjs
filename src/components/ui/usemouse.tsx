"use client";

import { useState, useRef, useEffect, RefObject } from "react";

type MousePosition = {
  elementX: number | null;
  elementY: number | null;
};

export function useMouse<T extends HTMLElement>() {
  const ref = useRef<T | null>(null); // ✅ allow null initially
  const [mouse, setMouse] = useState<MousePosition>({
    elementX: null,
    elementY: null,
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      setMouse({
        elementX: e.clientX - rect.left,
        elementY: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMouse({ elementX: null, elementY: null });
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // ✅ make sure TS infers correct type for ref
  return [mouse, ref as RefObject<T>] as const;
}
