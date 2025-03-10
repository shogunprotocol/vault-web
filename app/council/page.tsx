'use client';

export default function TheCouncil() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">The Council of Ronin</h1>
        <p className="text-xl md:text-2xl mb-8">The wisdom of the ancients will be revealed soon</p>
        <div className="mb-8">
          <p className="text-basement-cyan">Simplified deployment version</p>
        </div>
        <a 
          href="/" 
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
