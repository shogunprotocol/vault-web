'use client';

import { default as dynamicImport } from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import for the presentation component
const PresentationComponent = dynamicImport(() => import('../../components/presentation/Presentation'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[80vh] bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Shogun Presentation</h1>
        <p>Loading the presentation...</p>
      </div>
    </div>
  )
});

export default function Presentation() {
  return (
    <Suspense fallback={null}>
      <PresentationComponent />
    </Suspense>
  );
} 