import Link from 'next/link';
import Image from 'next/image';
import { forwardRef, useState } from 'react';
import s from '@/components/header/header.module.scss';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisclosure } from "@nextui-org/react";
import TransactionModal from "@/components/modals";


export const Header = forwardRef((_, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shouldOpenToMint, setShouldOpenToMint] = useState(false);

  const handleOpenMintModal = () => {
    setShouldOpenToMint(true);
    onOpen();
  };

  const handleModalClose = () => {
    setShouldOpenToMint(false);
    onClose();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 via-black/20 to-transparent backdrop-blur-sm h-20" ref={ref}>
        <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto w-full">
          {/* Logo a la izquierda */}
          <div>
            <Link href="/" className="link">
              <Image
                src="/images/logo/shogun_logo.png"
                alt="Shogun Logo"
                width={60}
                height={60}
                priority={true}
                className="hover:scale-110 transition-transform duration-200"
              />
            </Link>
          </div>
          
          {/* MINT BUTTON - SUPER VISIBLE */}
          <div className="flex items-center">
            <button
              onClick={handleOpenMintModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                backgroundColor: '#fb923c',
                border: '2px solid #f97316',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(251, 146, 60, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 9999
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.backgroundColor = '#f97316';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#fb923c';
              }}
            >
              <span style={{ fontSize: '20px' }}>🚰</span>
              <span>MINT TOKENS</span>
            </button>
          </div>
          
          {/* Wallet a la derecha */}
          <div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <TransactionModal
        isOpen={isOpen}
        onClose={handleModalClose}
        shouldOpenToMint={shouldOpenToMint}
      />
    </>
  );
});

Header.displayName = 'Header';
