'use client';

import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineCanvasProps {
  splineUrl: string;
}

export default function SplineCanvas({ splineUrl }: SplineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load(splineUrl);
    }
  }, [splineUrl]);

  return <canvas ref={canvasRef} className="w-full h-[400px]" />;
} 