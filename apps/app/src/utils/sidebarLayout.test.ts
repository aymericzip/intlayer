import { describe, expect, it } from 'vitest';
import type { SidebarNavigationItem } from '#components/Dashboard/DashboardSidebar/DashboardSidebar';
import {
  applyItemLabels,
  arrangeSidebarItems,
  moveKey,
  resolveSidebarMove,
} from './sidebarLayout';

const createItem = (
  key: string,
  items?: SidebarNavigationItem[]
): SidebarNavigationItem => ({ key, label: key, title: key, items });

const items = [
  createItem('overview'),
  createItem('dictionaries', [createItem('dictionary-a')]),
  createItem('projects'),
  createItem('organization'),
];
const pinnedItemKeys = new Set(['dictionary-a']);
const getKeys = (nodes: SidebarNavigationItem[]) => nodes.map(({ key }) => key);

describe('moveKey', () => {
  it('places the dragged key before or after the target', () => {
    expect(moveKey(['a', 'b', 'c'], 'a', 'c', 'after')).toEqual([
      'b',
      'c',
      'a',
    ]);
    expect(moveKey(['a', 'b', 'c'], 'c', 'a', 'before')).toEqual([
      'c',
      'a',
      'b',
    ]);
  });

  it('ignores an unknown target', () => {
    expect(moveKey(['a', 'b'], 'a', 'x', 'after')).toEqual(['a', 'b']);
  });
});

describe('arrangeSidebarItems', () => {
  it('keeps the default order without a persisted order', () => {
    expect(arrangeSidebarItems(items, [], pinnedItemKeys)).toBe(items);
  });

  it('places projects below organization', () => {
    const arranged = arrangeSidebarItems(
      items,
      ['overview', 'dictionaries', 'organization', 'projects'],
      pinnedItemKeys
    );

    expect(getKeys(arranged)).toEqual([
      'overview',
      'dictionaries',
      'organization',
      'projects',
    ]);
  });

  it('moves a pinned entry to the top level and empties its section', () => {
    const arranged = arrangeSidebarItems(
      items,
      ['dictionary-a', 'overview', 'dictionaries', 'projects', 'organization'],
      pinnedItemKeys
    );

    expect(getKeys(arranged)[0]).toBe('dictionary-a');
    expect(arranged.find(({ key }) => key === 'dictionaries')?.items).toBe(
      undefined
    );
  });

  it('ignores a promoted entry that is no longer pinned', () => {
    const arranged = arrangeSidebarItems(
      items,
      ['dictionary-a', 'overview'],
      new Set()
    );

    expect(getKeys(arranged)).not.toContain('dictionary-a');
  });
});

describe('resolveSidebarMove', () => {
  const base = { arrangedItems: items, pinnedItemKeys };

  it('reorders top-level items', () => {
    expect(
      resolveSidebarMove({
        ...base,
        draggedKey: 'projects',
        targetKey: 'organization',
        placement: 'after',
      })
    ).toEqual({
      rootOrder: ['overview', 'dictionaries', 'organization', 'projects'],
    });
  });

  it('promotes a pinned entry dropped on a top-level row', () => {
    expect(
      resolveSidebarMove({
        ...base,
        draggedKey: 'dictionary-a',
        targetKey: 'overview',
        placement: 'before',
      })?.rootOrder?.[0]
    ).toBe('dictionary-a');
  });

  it('rejects a non-pinned child and cross-kind drops', () => {
    expect(
      resolveSidebarMove({
        ...base,
        draggedKey: 'dictionary-unpinned',
        targetKey: 'overview',
        placement: 'before',
      })
    ).toBeNull();
    expect(
      resolveSidebarMove({
        ...base,
        draggedKey: 'projects',
        targetKey: 'dictionary-a',
        placement: 'before',
      })
    ).toBeNull();
  });
});

describe('applyItemLabels', () => {
  it('renames pinned entries only', () => {
    const labeled = applyItemLabels(
      items,
      { 'dictionary-a': 'Home copy', projects: 'Nope' },
      pinnedItemKeys
    );

    expect(labeled[1].items?.[0].title).toBe('Home copy');
    expect(labeled[2].title).toBe('projects');
  });
});
