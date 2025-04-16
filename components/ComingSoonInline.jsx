export default function ComingSoonInline() {
  // Function to open Twitter in a new tab
  const goToTwitter = () => {
    window.open('https://x.com/shogun_fi', '_blank');
  };

  return (
    <div className="mt-6 p-5 bg-white/5 backdrop-blur-sm border border-basement-cyan/20 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="w-3 h-3 rounded-full bg-basement-cyan animate-pulse"></div>
        <p className="text-base font-basement text-white/90">
          <span className="text-basement-cyan font-bold">Deposits opening soon.</span> The Shogun's vaults are being prepared for battle.
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-white/60">
          Follow us for early access & updates
        </p>
        <button 
          onClick={goToTwitter}
          className="text-sm bg-basement-cyan text-black font-bold px-4 py-2 rounded-md hover:bg-cyan-400 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
          Get notified
        </button>
      </div>
    </div>
  );
} 