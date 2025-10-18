'use client';

import { useEffect, useRef, useState } from 'react';

type UseSearchProps = {
  minChars?: number;
  debounceMs?: number;
  trim?: boolean;
  defaultValue?: string | null;
  onSearch?: (value: string) => void;
  onClear?: () => void;
};

export const useSearch = (options?: UseSearchProps) => {
  const {
    minChars = 3,
    debounceMs = 300,
    trim = true,
    defaultValue,
    onSearch,
    onClear,
  } = options ?? {};
  const searchRef = useRef('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [search, setDebouncedSearch] = useState<string>(defaultValue ?? '');

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const setSearch = (value: string) => {
    searchRef.current = value;
    const normalized = trim ? value.trim() : value;

    clearTimer();

    if (normalized.length < minChars) {
      setDebouncedSearch('');
      onClear?.();
      return;
    }

    timerRef.current = setTimeout(() => {
      const current = trim ? searchRef.current.trim() : searchRef.current;
      if (current.length >= minChars) {
        setDebouncedSearch(current);
        onSearch?.(current);
      } else {
        setDebouncedSearch('');
        onClear?.();
      }
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const hasMinChars = search.length >= minChars;

  return { setSearch, search, hasMinChars };
};
