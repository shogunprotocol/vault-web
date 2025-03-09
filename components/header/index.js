import Link from 'next/link';
import cn from 'clsx';
import { Navigation } from 'components/navigation';
import { useStore } from 'libs/store';
import Image from 'next/image';
import { forwardRef } from 'react';
import s from './header.module.scss';
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = forwardRef((_, ref) => {
  const [isNavOpened, setIsNavOpened] = useStore(
    ({ isNavOpened, setIsNavOpened }) => [isNavOpened, setIsNavOpened],
  );

  return (
    <header className={s.header} ref={ref}>
      <Navigation />
      <div className={cn('layout-block', s.head)}>
        <button
          className="font-basement"
          onClick={() => {
            setIsNavOpened(!isNavOpened);
          }}
        >
          MENU
        </button>

        {/* Logo container with hover effect */}
        <div className={s.logoContainer}>
          <Link href="/" className="link px-4">
            <div className={s.logoImageContainer}>
              <Image
                src="/images/logo/ai-cult-icon.png"
                alt="Logo"
                width={75}
                height={75}
                objectFit="contain"
                className={s.logoImage} // This will have the hover effect
              />
              <Image
                src="/images/logo/cult-of-roning-typography.png"
                alt="Logo Alternative"
                width={75}
                height={75}
                objectFit="contain"
                className={s.logoImageAlt} // This starts with opacity 0
              />
            </div>
          </Link>
        </div>
        
        <div className="uppercase font-basement flex items-center">
          <Link href="/council" className="link px-4">
            The Council
          </Link>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
