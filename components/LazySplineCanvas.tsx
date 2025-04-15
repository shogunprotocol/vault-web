'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { Application } from '@splinetool/runtime';

const SplineCanvas = dynamic(() => import('./SplineCanvas'), {
  ssr: false
});

interface LazySplineCanvasProps {
  scene: string;
  onLoad?: (app: Application) => void;
  className?: string;
  style?: React.CSSProperties;
  waitForSiteReady?: boolean;
}

export default function LazySplineCanvas(props: LazySplineCanvasProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px'
  });

  return (
    <div ref={ref} className="w-full h-full">
      {inView && <SplineCanvas {...props} />}
    </div>
  );
}