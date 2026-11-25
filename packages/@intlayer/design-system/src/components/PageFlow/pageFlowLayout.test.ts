import { describe, expect, it } from 'vitest';
import { getPageFlowNodeKey, layoutPageFlow } from './pageFlowLayout';

const options = {
  width: 1000,
  height: 200,
  nodeWidth: 10,
  nodeGap: 20,
  labelSpace: 190,
  minNodeHeight: 2,
};

const flow = {
  steps: [
    [{ url: '/', value: 100, exits: 20 }],
    [
      { url: '/docs', value: 60, exits: 30 },
      { url: null, value: 20, exits: null },
    ],
  ],
  links: [
    { fromStep: 0, fromUrl: '/', toUrl: null, value: 20 },
    { fromStep: 0, fromUrl: '/', toUrl: '/docs', value: 60 },
  ],
};

describe('layoutPageFlow', () => {
  const layout = layoutPageFlow(flow, options);
  const node = (key: string) => layout.nodes.find((entry) => entry.key === key);

  it('places one column per step, the last before the label space', () => {
    expect(node('0:/')?.x).toBe(0);
    expect(node('1:/docs')?.x).toBe(800);
  });

  it('scales every column with the fullest one fitting the height', () => {
    // Step 0 binds (200 / 100 = 2) before step 1 ((200 - 20) / 80 = 2.25).
    expect(node('0:/')?.height).toBeCloseTo(200);
    expect(node('1:/docs')?.height).toBeCloseTo(120);
    expect(node('1:other')?.y).toBeCloseTo(140);
  });

  it('stacks ribbons in the vertical order of the pages they reach', () => {
    const [docsLink, otherLink] = layout.links;

    expect(docsLink.targetKey).toBe('1:/docs');
    expect(otherLink.targetKey).toBe('1:other');
    // /docs (top) leaves from the top of "/", "other" right below it.
    expect(docsLink.path.startsWith('M10,0 ')).toBe(true);
    expect(otherLink.path.startsWith('M10,120 ')).toBe(true);
  });

  it('skips links whose pages are not in the flow', () => {
    const { links } = layoutPageFlow(
      {
        ...flow,
        links: [{ fromStep: 0, fromUrl: '/gone', toUrl: '/docs', value: 5 }],
      },
      options
    );

    expect(links).toEqual([]);
  });

  it('keys the "other pages" bucket per step', () => {
    expect(getPageFlowNodeKey(2, null)).toBe('2:other');
    expect(getPageFlowNodeKey(1, '/a')).toBe('1:/a');
  });
});
