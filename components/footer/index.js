import Link from 'next/link';
import cn from 'clsx';
import s from '@/components/footer/footer.module.scss';

export function Footer() {
  return (
    <footer className={cn(s.footer, 'layout-block')}>
      <Link href="mailto:cryptopoeta@gmail.com" className="link">
        mail
      </Link>

      <Link href="https://x.com/criptopoeta" className="link">
        twitter
      </Link>
    </footer>
  );
}
