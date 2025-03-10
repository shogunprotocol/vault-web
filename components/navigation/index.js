'use client';

import Link from 'next/link';
import { Lenis } from '@studio-freight/react-lenis';
import cn from 'clsx';
import { useStore } from 'libs/store';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import s from '@/components/navigation/navigation.module.scss';

export function Navigation() {
  const [isNavOpened, setIsNavOpened] = useStore(
    ({ isNavOpened, setIsNavOpened }) => [isNavOpened, setIsNavOpened],
  );

  const pathname = usePathname();

  useEffect(() => {
    // This will run whenever the pathname changes
    setIsNavOpened(false);
  }, [pathname, setIsNavOpened]);

  return (
    <Lenis className={cn(s.navigation, !isNavOpened && s.closed)}>
      <div className={s.content}>
        <Link
          className="font-basement hover:text-basement-cyan p-4 text-lg"
          href="/"
        >
          HOME
        </Link>
        <Link
          className="font-basement hover:text-basement-cyan p-4 text-lg"
          href="/rezy-cle"
        >
          THE COUNCIL
        </Link>
        <Link
          className="font-basement hover:text-basement-cyan p-4 text-lg"
          href="/about"
        >
          ABOUT
        </Link>
      </div>
    </Lenis>
  );
}