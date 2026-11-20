import { createElement, type FC } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchParamState } from './useSearchParamState';

const mockNavigate = vi.fn();
let currentSearch: Record<string, unknown> = {};

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useLocation: ({
    select,
  }: {
    select: (location: { search: Record<string, unknown> }) => unknown;
  }) => select({ search: currentSearch }),
}));

const scannerConfig = {
  auto_start: { type: 'boolean', fallbackValue: false },
  url: { type: 'string', fallbackValue: '' },
} as const;

type SearchParamState = ReturnType<
  typeof useSearchParamState<typeof scannerConfig>
>;

/** Renders the hook once on the server and returns what it exposed. */
const renderSearchParamState = (): SearchParamState => {
  let result: SearchParamState | undefined;

  const Probe: FC = () => {
    result = useSearchParamState(scannerConfig);
    return null;
  };

  renderToString(createElement(Probe));

  return result as SearchParamState;
};

/** Runs the `search` reducer of the last navigate call against a previous search. */
const getNextSearch = (
  previousSearch: Record<string, unknown>
): Record<string, unknown> => {
  const [{ search }] = mockNavigate.mock.lastCall as [
    { search: (previous: Record<string, unknown>) => Record<string, unknown> },
  ];

  return search(previousSearch);
};

describe('useSearchParamState', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    currentSearch = {};
  });

  it('reads typed values from the parsed router search', () => {
    currentSearch = { url: 'https://example.com/blog', auto_start: true };

    const { params } = renderSearchParamState();

    expect(params).toEqual({
      url: 'https://example.com/blog',
      auto_start: true,
    });
  });

  it('falls back when params are missing', () => {
    const { params } = renderSearchParamState();

    expect(params).toEqual({ url: '', auto_start: false });
  });

  it('writes the search as an object, keeping other params', () => {
    const { setParam } = renderSearchParamState();

    setParam('url', 'https://openrouter.ai/blog/announcements/');

    expect(typeof getNextSearch({})).toBe('object');
    expect(
      getNextSearch({ url: 'https://example.com', auto_start: true })
    ).toEqual({
      url: 'https://openrouter.ai/blog/announcements/',
      auto_start: true,
    });
  });

  it('removes a param set to an empty value', () => {
    const { setParam } = renderSearchParamState();

    setParam('url', '');

    expect(
      getNextSearch({ url: 'https://example.com', auto_start: true })
    ).toEqual({ auto_start: true });
  });

  it('does not grow the search across successive updates', () => {
    const { setParam } = renderSearchParamState();

    setParam('url', 'https://example.com/a');
    const firstSearch = getNextSearch({ auto_start: true });

    setParam('url', 'https://example.com/b');
    const secondSearch = getNextSearch(firstSearch);

    expect(Object.keys(secondSearch).sort()).toEqual(['auto_start', 'url']);
  });
});
