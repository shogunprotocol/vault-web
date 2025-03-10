'use client';

import { default as dynamicImport } from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports with SSR disabled for components using Spline
const HomePage = dynamicImport(() => import('../components/home-page/index'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[80vh] bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Vault</h1>
        <p>Loading the experience...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomePage />
    </Suspense>
  );
}
