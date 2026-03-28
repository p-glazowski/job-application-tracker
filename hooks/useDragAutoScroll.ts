// hooks/useDragAutoScroll.ts
import { useEffect, useRef, RefObject } from 'react';

export function useDragAutoScroll(
  scrollRef: RefObject<HTMLDivElement | null>, // 👈 match React 19's useRef type
  isDragging: boolean,
) {
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isDragging || !scrollRef.current) return;

    const el = scrollRef.current;
    const EDGE_SIZE = 80;
    const MAX_SPEED = 12;

    let lastX = 0;

    function onTouchMove(e: TouchEvent) {
      lastX = e.touches[0].clientX;
    }

    function onPointerMove(e: PointerEvent) {
      lastX = e.clientX;
    }

    function scroll() {
      const rect = el.getBoundingClientRect();
      const distFromRight = rect.right - lastX;
      const distFromLeft = lastX - rect.left;

      if (distFromRight < EDGE_SIZE && distFromRight > 0) {
        const speed = Math.round(MAX_SPEED * (1 - distFromRight / EDGE_SIZE));
        el.scrollLeft += speed;
      } else if (distFromLeft < EDGE_SIZE && distFromLeft > 0) {
        const speed = Math.round(MAX_SPEED * (1 - distFromLeft / EDGE_SIZE));
        el.scrollLeft -= speed;
      }

      animFrameRef.current = requestAnimationFrame(scroll);
    }

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('pointermove', onPointerMove);
    animFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointermove', onPointerMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging, scrollRef]);
}
