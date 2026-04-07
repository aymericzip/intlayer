'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

type ParamType = 'string' | 'number' | 'boolean';

type ParamConfig = {
  type: ParamType;
  fallbackValue?: string | number | boolean;
};

type ConfigMap = Record<string, ParamConfig>;

type InferType<T extends ParamType> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : boolean;

type StateFromConfig<TConfig extends ConfigMap> = {
  [K in keyof TConfig]: InferType<TConfig[K]['type']>;
};

const defaultForType = (type: ParamType): string | number | boolean => {
  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    default:
      return '';
  }
};

const parseValueFromUrl = (
  rawValue: string | null,
  cfg: ParamConfig
): string | number | boolean => {
  if (rawValue == null) {
    return cfg.fallbackValue ?? defaultForType(cfg.type);
  }

  switch (cfg.type) {
    case 'string':
      return rawValue;
    case 'number': {
      const parsed = Number.parseInt(rawValue, 10);
      return Number.isNaN(parsed)
        ? ((cfg.fallbackValue as number | undefined) ??
            (defaultForType('number') as number))
        : parsed;
    }
    case 'boolean': {
      const truthy = ['true', '1', 'yes', 'on'];
      return truthy.includes(rawValue.toLowerCase());
    }
    default:
      return rawValue;
  }
};

const valueToUrlString = (
  value: string | number | boolean | null,
  type: ParamType
): string | null => {
  if (value == null) return null;
  switch (type) {
    case 'string': {
      const v = String(value);
      return v.trim() === '' ? null : v;
    }
    case 'number': {
      const n = Number(value);
      return Number.isNaN(n) ? null : String(n);
    }
    case 'boolean':
      return value ? 'true' : 'false';
    default:
      return String(value);
  }
};

export const useSearchParamState = <TConfig extends ConfigMap>(
  config: TConfig
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const computeInitialState = useCallback((): StateFromConfig<TConfig> => {
    const nextState: Record<string, unknown> = {};
    for (const [key, cfg] of Object.entries(config)) {
      nextState[key] = parseValueFromUrl(searchParams.get(key), cfg);
    }
    return nextState as StateFromConfig<TConfig>;
  }, [config, searchParams]);

  const [state, setState] =
    useState<StateFromConfig<TConfig>>(computeInitialState);

  // Keep local state in sync if the URL changes (e.g., back/forward navigation)
  useEffect(() => {
    setState((prev) => {
      const next = computeInitialState();
      // Shallow compare to prevent unnecessary re-renders
      let changed = false;
      for (const key of Object.keys(next) as Array<keyof typeof next>) {
        if (prev[key] !== next[key]) {
          changed = true;
          break;
        }
      }
      return changed ? next : prev;
    });
  }, [computeInitialState]);

  const updateUrl = useCallback(
    (updates: Partial<Record<keyof TConfig, string | null>>) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || typeof value !== 'string') params.delete(key);
        else params.set(key, value);
      }
      const qs = params.toString();
      const url = qs ? `?${qs}` : '?';
      router.push(url);
    },
    [router]
  );

  const setParam = useCallback(
    <K extends keyof TConfig>(
      key: K,
      value: StateFromConfig<TConfig>[K] | null
    ) => {
      const cfg = config[String(key)];
      const urlValue = valueToUrlString(
        value as unknown as string | number | boolean | null,
        cfg.type
      );
      updateUrl({ [key]: urlValue } as Partial<
        Record<keyof TConfig, string | null>
      >);
      setState((prev) => ({
        ...prev,
        [key]: (value ??
          cfg.fallbackValue ??
          defaultForType(cfg.type)) as StateFromConfig<TConfig>[K],
      }));
    },
    [config, updateUrl]
  );

  const setParams = useCallback(
    (
      updates: Partial<{
        [K in keyof TConfig]: StateFromConfig<TConfig>[K] | null;
      }>
    ) => {
      const urlUpdates: Partial<Record<keyof TConfig, string | null>> = {};
      const nextState: Partial<StateFromConfig<TConfig>> = {};

      for (const key of Object.keys(updates) as Array<keyof TConfig>) {
        const cfg = config[String(key)];
        const value = updates[key] as unknown as
          | string
          | number
          | boolean
          | null
          | undefined;
        const urlValue = valueToUrlString(value ?? null, cfg.type);
        urlUpdates[key] = urlValue;
        nextState[key] = (value ??
          cfg.fallbackValue ??
          defaultForType(cfg.type)) as StateFromConfig<TConfig>[typeof key];
      }

      updateUrl(urlUpdates);
      setState(
        (prev) => ({ ...prev, ...nextState }) as StateFromConfig<TConfig>
      );
    },
    [config, updateUrl]
  );

  return { params: state, setParam, setParams } as const;
};
