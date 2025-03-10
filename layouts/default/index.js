'use client';

import { Cursor, CustomHead } from '@studio-freight/compono'
import { Lenis, useLenis } from '@studio-freight/react-lenis'
import cn from 'clsx'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Scrollbar } from '@/components/scrollbar'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import s from '@/layouts/default/layout.module.scss'
import Link from 'next/link'

// Create a separate component for the scroll handling
function ScrollHandler() {
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

  return null
}

export function Layout({
  seo = { title: '', description: '', image: '', keywords: '' },
  children,
  theme = 'light',
  className,
}) {
  return (
    <>
      <CustomHead {...seo} />
      <Lenis root>
        <div className={cn(`theme-${theme}`, s.layout, className)}>
          <Cursor />
          <Scrollbar />
          <Header />
          <Suspense fallback={null}>
            <ScrollHandler />
          </Suspense>
          <main className={s.main}>{children}</main>
          <Footer />
        </div>
      </Lenis>
    </>
  )
}
