'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Vault</h1>
        <p className="text-xl md:text-2xl mb-8">Welcome to the Vault experience</p>
        <div className="mb-8">
          <p className="text-basement-cyan">Simplified deployment version</p>
        </div>
        <a 
          href="/council" 
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
        >
          Visit Council
        </a>
      </div>
    </div>
  );
}
