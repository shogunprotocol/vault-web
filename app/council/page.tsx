'use client';

import { default as dynamicImport } from 'next/dynamic';

// Dynamically import the entire Council component with loading fallback
const CouncilClient = dynamicImport(() => import('../../components/council/CouncilClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[80vh] bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">The Council of Ronin</h1>
        <p>Loading the wisdom of the ancients...</p>
      </div>
    </div>
  )
});

export default function TheCouncil() {
  return <CouncilClient />;
}
