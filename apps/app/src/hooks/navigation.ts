/**
 * Next.js navigation compatibility shims for TanStack Router.
 * Drop-in replacements for hooks from '#/hooks/navigation'.
 */
import {
  useLocation,
  useNavigate,
  useParams as useTanStackParams,
  useSearch,
} from '@tanstack/react-router';

/** Drop-in for Next.js useRouter */
export const useRouter = () => {
  const navigate = useNavigate();

  return {
    push: (url: string) => void navigate({ to: url }),
    replace: (url: string) => void navigate({ to: url, replace: true }),
    back: () => void navigate({ to: -1 as never }),
    refresh: () => {
      if (typeof window !== 'undefined') window.location.reload();
    },
  };
};

/** Drop-in for Next.js usePathname */
export const usePathname = (): string => {
  const { pathname } = useLocation();
  return pathname;
};

/** Drop-in for Next.js useSearchParams */
export const useSearchParams = () => {
  const search = useSearch({ strict: false }) as Record<string, unknown>;

  return {
    get: (key: string): string | null => {
      const val = search[key];
      return typeof val === 'string' ? val : null;
    },
    getAll: (key: string): string[] => {
      const val = search[key];
      if (Array.isArray(val)) return val.map(String);
      return val != null ? [String(val)] : [];
    },
    has: (key: string): boolean => key in search,
    toString: () => new URLSearchParams(search as Record<string, string>).toString(),
  };
};

/** Drop-in for Next.js useParams */
export const useParams = <T extends Record<string, string> = Record<string, string>>(): T => {
  return useTanStackParams({ strict: false }) as T;
};

/** Drop-in for Next.js redirect (client-side) */
export const redirect = (url: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
};
