'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  const noLayoutPrefixes = ['/admin'];
  const isLayoutHidden = noLayoutPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  return (
    <>
      {!isLayoutHidden && <Header />}
      <main className="min-h-screen bg-white text-black">{children}</main>
      {!isLayoutHidden && <Footer />}
    </>
  );
}
