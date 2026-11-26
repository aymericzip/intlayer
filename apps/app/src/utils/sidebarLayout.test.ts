import { describe, expect, it } from 'vitest';
import type { SidebarNavigationItem } from '#components/Dashboard/DashboardSidebar/DashboardSidebar';
import {
  applyItemLabels,
  arrangeSidebarItems,
  updateSidebarOrders,
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

describe('sidebar layout', () => {
  it('keeps the default layout without saved orders', () => {
    expect(arrangeSidebarItems(items, {}, pinnedItemKeys)).toBe(items);
  });

  it('restores legacy root orders and respects subsequent unpinning', () => {
    const orders = {
      '': [
        'dictionary-a',
        'overview',
        'dictionaries',
        'organization',
        'projects',
      ],
    };
    expect(getKeys(arrangeSidebarItems(items, orders, pinnedItemKeys))).toEqual(
      orders['']
    );
    expect(getKeys(arrangeSidebarItems(items, orders, new Set()))).toEqual(
      orders[''].slice(1)
    );
  });

  it.each(['dictionary-a', 'tag-a', 'editor-page-/home', 'translate'])(
    'moves %s from a nested section to the root',
    (key) => {
      const tree = [
        createItem('section', [createItem(key)]),
        createItem('overview'),
      ];
      const move = resolveSidebarMove({
        arrangedItems: tree,
        pinnedItemKeys: new Set(),
        draggedKey: key,
        targetKey: 'overview',
        placement: 'after',
      })!;
      expect(Boolean(move.pin)).toBe(key !== 'translate');
      expect(
        arrangeSidebarItems(tree, updateSidebarOrders({}, move), new Set([key]))
      ).toEqual([
        createItem('section', []),
        createItem('overview'),
        createItem(key),
      ]);
    }
  );

  it('moves a whole section between parents, then reorders a sibling beside it', () => {
    const section = createItem('section', [createItem('child')]);
    const tree = [
      section,
      createItem('group', [createItem('sibling')]),
      createItem('overview'),
    ];
    const base = { pinnedItemKeys: new Set<string>() };
    const first = resolveSidebarMove({
      ...base,
      arrangedItems: tree,
      draggedKey: 'section',
      targetKey: 'sibling',
      placement: 'after',
    })!;
    const orders = updateSidebarOrders({}, first);
    const second = resolveSidebarMove({
      ...base,
      arrangedItems: arrangeSidebarItems(tree, orders, base.pinnedItemKeys),
      draggedKey: 'overview',
      targetKey: 'section',
      placement: 'before',
    })!;
    expect(
      arrangeSidebarItems(
        tree,
        updateSidebarOrders(orders, second),
        base.pinnedItemKeys
      )
    ).toEqual([
      createItem('group', [
        createItem('sibling'),
        createItem('overview'),
        section,
      ]),
    ]);
  });

  it('accepts a drop inside an empty section and rejects cycles', () => {
    const tree = [
      createItem('empty', []),
      createItem('section', [createItem('child')]),
    ];
    const base = { arrangedItems: tree, pinnedItemKeys, draggedKey: 'section' };
    expect(
      resolveSidebarMove({ ...base, targetKey: 'child', placement: 'before' })
    ).toBeNull();
    const move = resolveSidebarMove({
      ...base,
      targetKey: 'empty',
      placement: 'inside',
    })!;
    expect(
      arrangeSidebarItems(tree, updateSidebarOrders({}, move), pinnedItemKeys)
    ).toEqual([createItem('empty', [tree[1]])]);
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
