'use client';
import { Loader } from '@intlayer/design-system';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.endsWith('/admin')) {
      router.push(`${pathname}/users`);
    }
  }, []);

  return <Loader />;
}
