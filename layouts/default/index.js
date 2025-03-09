'use client';

import { Cursor, CustomHead } from '@studio-freight/compono'
import { Lenis, useLenis } from '@studio-freight/react-lenis'
import cn from 'clsx'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import { Scrollbar } from 'components/scrollbar'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import s from './layout.module.scss'
import Link from 'next/link'

export function Layout({
  seo = { title: '', description: '', image: '', keywords: '' },
  children,
  theme = 'light',
  className,
}) {
  const lenis = useLenis()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle hash scrolling when the URL changes
    const hash = window.location.hash
    if (hash) {
      lenis?.scrollTo(hash)
    }
  }, [lenis, pathname, searchParams])

  return (
    <>
      <CustomHead {...seo} />
      <Lenis root>
        <div className={cn(`theme-${theme}`, s.layout, className)}>
          <Cursor />
          <Scrollbar />
          <Header />
          <main className={s.main}>{children}</main>
          <Footer />
        </div>
      </Lenis>
    </>
  )
}
