'use client';

import { useRect } from '@studio-freight/hamo';
import { useLenis } from '@studio-freight/react-lenis';
import { mapRange } from '@/libs/maths';
import { useEffect, useRef } from 'react';
import s from '@/components/scrollbar/scrollbar.module.scss';
import { throttle } from '@/libs/throttle';

export function Scrollbar() {
  const thumbRef = useRef();
  const lenis = useLenis();
  const [innerMeasureRef, { height: innerHeight }] = useRect();
  const [thumbMeasureRef, { height: thumbHeight }] = useRect();

  useLenis(
    throttle(({ scroll, limit }) => {
      const progress = scroll / limit;

      if (thumbRef.current) {
        thumbRef.current.style.transform = `translate3d(0,${
          progress * (innerHeight - thumbHeight)
        }px,0)`;
      }
    }, 16), // 16ms throttle (approximately 60fps)
    [innerHeight, thumbHeight],
  );

  useEffect(() => {
    let start = null;

    // Define the throttled function
    const throttledOnPointerMove = throttle(function(e) {
      if (!start) return;
      e.preventDefault();

      const scroll = mapRange(
        start,
        innerHeight - (thumbHeight - start),
        e.clientY,
        0,
        lenis.limit,
      );
      lenis.scrollTo(scroll, { immediate: true });
    }, 20); // Small throttle for smoother scrolling

    function onPointerDown(e) {
      start = e.offsetY;
    }

    function onPointerUp() {
      start = null;
    }

    thumbRef.current?.addEventListener('pointerdown', onPointerDown, false);
    // Use the throttled function instead
    window.addEventListener('pointermove', throttledOnPointerMove, false);
    window.addEventListener('pointerup', onPointerUp, false);

    return () => {
      thumbRef.current?.removeEventListener(
        'pointerdown',
        onPointerDown,
        false,
      );
      // Remove the throttled function
      window.removeEventListener('pointermove', throttledOnPointerMove, false);
      window.removeEventListener('pointerup', onPointerUp, false);
    };
  }, [lenis, innerHeight, thumbHeight]); // Add thumbHeight to dependency array

  return (
    <div className={s.scrollbar}>
      <div ref={innerMeasureRef} className={s.inner}>
        <div
          className={s.thumb}
          ref={(node) => {
            thumbRef.current = node;
            thumbMeasureRef(node);
          }}
        />
      </div>
    </div>
  );
}
