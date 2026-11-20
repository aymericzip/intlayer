import { useLocation, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

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

/** Raw search value as parsed by TanStack Router (JSON-aware, so may be non-string). */
type SearchValue = unknown;

const parseValueFromUrl = (
  searchValue: SearchValue,
  cfg: ParamConfig
): string | number | boolean => {
  if (searchValue === undefined || searchValue === null) {
    return cfg.fallbackValue ?? defaultForType(cfg.type);
  }

  const rawValue = String(searchValue);

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

/**
 * Converts a state value into its search-param value, or `undefined` to drop the param.
 * Typed values are kept as-is so TanStack serializes `true` as `true`, not `"true"`.
 */
const valueToSearchValue = (
  value: string | number | boolean | null,
  type: ParamType
): string | number | boolean | undefined => {
  if (value == null) return undefined;
  switch (type) {
    case 'string': {
      const stringValue = String(value);
      return stringValue.trim() === '' ? undefined : stringValue;
    }
    case 'number': {
      const numberValue = Number(value);
      return Number.isNaN(numberValue) ? undefined : numberValue;
    }
    case 'boolean':
      return Boolean(value);
    default:
      return String(value);
  }
};

type SearchUpdates<TConfig extends ConfigMap> = Partial<
  Record<keyof TConfig, string | number | boolean | undefined>
>;

export const useSearchParamState = <TConfig extends ConfigMap>(
  config: TConfig
) => {
  const navigate = useNavigate();
  // TanStack Router exposes the search as an already-parsed object
  const search = useLocation({
    select: (location) => location.search as Record<string, SearchValue>,
  });

  const computeInitialState = useCallback((): StateFromConfig<TConfig> => {
    const nextState: Record<string, unknown> = {};
    for (const [key, cfg] of Object.entries(config)) {
      nextState[key] = parseValueFromUrl(search[key], cfg);
    }
    return nextState as StateFromConfig<TConfig>;
  }, [config, search]);

  const [state, setState] =
    useState<StateFromConfig<TConfig>>(computeInitialState);

  useEffect(() => {
    setState((prev) => {
      const next = computeInitialState();
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
    (updates: SearchUpdates<TConfig>) => {
      // Must be an object: a string here gets spread into one param per character
      navigate({
        to: '.',
        search: (previousSearch: Record<string, SearchValue>) => {
          const mergedSearch = { ...previousSearch, ...updates };

          return Object.fromEntries(
            Object.entries(mergedSearch).filter(
              ([, value]) => value !== undefined
            )
          );
        },
      } as Parameters<typeof navigate>[0]);
    },
    [navigate]
  );

  const setParam = useCallback(
    <K extends keyof TConfig>(
      key: K,
      value: StateFromConfig<TConfig>[K] | null
    ) => {
      const cfg = config[String(key)];
      const searchValue = valueToSearchValue(
        value as unknown as string | number | boolean | null,
        cfg.type
      );
      updateUrl({ [key]: searchValue } as SearchUpdates<TConfig>);
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
    (updates: Partial<StateFromConfig<TConfig>>) => {
      const urlUpdates: SearchUpdates<TConfig> = {};
      const nextState: Partial<StateFromConfig<TConfig>> = {};

      for (const key of Object.keys(updates) as Array<keyof TConfig>) {
        const cfg = config[String(key)];
        const value = updates[key] as unknown as
          | string
          | number
          | boolean
          | null
          | undefined;
        urlUpdates[key] = valueToSearchValue(value ?? null, cfg.type);
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
