import { navigate } from 'astro:transitions/client';
import { useEffect, useState } from 'react';

export function useRouter() {
  return {
    push: (url: string) => {
      navigate(url);
    },
    replace: (url: string) => {
      navigate(url, { history: 'replace' });
    },
    back: () => {
      window.history.back();
    },
    forward: () => {
      window.history.forward();
    },
    refresh: () => {
      window.location.reload();
    },
    prefetch: () => {},
  };
}

export function usePathname(): string {
  // Static initialization to match initial SSR and prevent hydration mismatch
  const [pathname, setPathname] = useState<string>('/');

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);

    // Update immediately on client mount to reflect the actual URL
    update();

    // Listen to Astro's View Transitions to update state on client-side navigation
    document.addEventListener('astro:after-swap', update);
    return () => document.removeEventListener('astro:after-swap', update);
  }, []);

  return pathname;
}

export function useSearchParams() {
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams()
  );

  useEffect(() => {
    const update = () =>
      setSearchParams(new URLSearchParams(window.location.search));

    update();

    document.addEventListener('astro:after-swap', update);
    return () => document.removeEventListener('astro:after-swap', update);
  }, []);

  return searchParams;
}

export function redirect(url: string): never {
  if (typeof window !== 'undefined') {
    navigate(url);
  }
  throw new Error('redirect');
}

export function notFound(): never {
  if (typeof window !== 'undefined') {
    navigate('/404', { history: 'replace' });
  }
  throw new Error('notFound');
}

export function permanentRedirect(url: string): never {
  return redirect(url);
}

export type ReadonlyURLSearchParams = URLSearchParams;
