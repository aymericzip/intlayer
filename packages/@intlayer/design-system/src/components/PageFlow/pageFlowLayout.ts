import type { PageFlow } from '@intlayer/backend-contract/analytics';

/** A positioned page of the flow chart, in viewBox units. */
export type PageFlowLayoutNode = {
  /** Unique across steps: `<step>:<url>`, `other` for the merged bucket. */
  key: string;
  step: number;
  /** `null` for the "other pages" bucket. */
  url: string | null;
  value: number;
  exits: number | null;
  x: number;
  y: number;
  height: number;
};

/** A positioned ribbon between two pages of consecutive steps. */
export type PageFlowLayoutLink = {
  key: string;
  sourceKey: string;
  targetKey: string;
  value: number;
  /** Closed SVG path of the ribbon. */
  path: string;
};

export type PageFlowLayout = {
  nodes: PageFlowLayoutNode[];
  links: PageFlowLayoutLink[];
};

export type PageFlowLayoutOptions = {
  width: number;
  height: number;
  /** Width of a node bar. */
  nodeWidth: number;
  /** Vertical space between two nodes of a step. */
  nodeGap: number;
  /** Space kept right of the last step for its labels. */
  labelSpace: number;
  /** Smallest drawn node height, so tiny pages stay clickable. */
  minNodeHeight: number;
};

/** Key of a node, unique across steps. */
export const getPageFlowNodeKey = (step: number, url: string | null): string =>
  `${step}:${url ?? 'other'}`;

/**
 * Lays a page flow out as a left-to-right Sankey diagram: one column per step,
 * nodes stacked top-down with heights proportional to their traffic (one
 * scale for every column, so widths of ribbons compare across steps), and
 * ribbons leaving / entering each node in the vertical order of the pages they
 * connect, so they do not cross at the nodes.
 *
 * @param flow - The flow report.
 * @param options - Chart geometry.
 * @returns Positioned nodes and ribbons.
 */
export const layoutPageFlow = (
  flow: Pick<PageFlow, 'steps' | 'links'>,
  options: PageFlowLayoutOptions
): PageFlowLayout => {
  const { width, height, nodeWidth, nodeGap, labelSpace, minNodeHeight } =
    options;
  const stepCount = flow.steps.length;
  const columnSpacing =
    stepCount > 1 ? (width - labelSpace - nodeWidth) / (stepCount - 1) : 0;

  // One scale for all columns: the fullest column fits the height exactly.
  const scale = Math.min(
    ...flow.steps.map((nodes) => {
      const total = nodes.reduce((sum, node) => sum + node.value, 0);
      const available = height - nodeGap * Math.max(0, nodes.length - 1);

      return total > 0 ? available / total : Number.POSITIVE_INFINITY;
    })
  );
  const valueScale = Number.isFinite(scale) ? scale : 0;

  const nodes: PageFlowLayoutNode[] = [];
  const nodesByKey = new Map<string, PageFlowLayoutNode>();

  flow.steps.forEach((stepNodes, step) => {
    let y = 0;

    for (const node of stepNodes) {
      const layoutNode: PageFlowLayoutNode = {
        key: getPageFlowNodeKey(step, node.url),
        step,
        url: node.url,
        value: node.value,
        exits: node.exits,
        x: step * columnSpacing,
        y,
        height: Math.max(minNodeHeight, node.value * valueScale),
      };

      nodes.push(layoutNode);
      nodesByKey.set(layoutNode.key, layoutNode);
      y += layoutNode.height + nodeGap;
    }
  });

  const positionedLinks = flow.links
    .map((link) => ({
      link,
      source: nodesByKey.get(getPageFlowNodeKey(link.fromStep, link.fromUrl)),
      target: nodesByKey.get(getPageFlowNodeKey(link.fromStep + 1, link.toUrl)),
    }))
    .filter(
      (
        entry
      ): entry is typeof entry & {
        source: PageFlowLayoutNode;
        target: PageFlowLayoutNode;
      } => entry.source !== undefined && entry.target !== undefined
    );

  // Stack ribbons on each side in the order of the node at their other end.
  const outgoingOffset = new Map<string, number>();
  const incomingOffset = new Map<string, number>();
  const sourceOrder = [...positionedLinks].sort(
    (entryA, entryB) =>
      entryA.source.y - entryB.source.y || entryA.target.y - entryB.target.y
  );
  const ribbonStarts = new Map<(typeof positionedLinks)[number], number>();

  for (const entry of sourceOrder) {
    const offset = outgoingOffset.get(entry.source.key) ?? 0;
    ribbonStarts.set(entry, entry.source.y + offset);
    outgoingOffset.set(
      entry.source.key,
      offset + entry.link.value * valueScale
    );
  }

  const links: PageFlowLayoutLink[] = [...positionedLinks]
    .sort(
      (entryA, entryB) =>
        entryA.target.y - entryB.target.y || entryA.source.y - entryB.source.y
    )
    .map((entry) => {
      const thickness = entry.link.value * valueScale;
      const incoming = incomingOffset.get(entry.target.key) ?? 0;
      incomingOffset.set(entry.target.key, incoming + thickness);

      const startX = entry.source.x + nodeWidth;
      const endX = entry.target.x;
      const middleX = (startX + endX) / 2;
      const startY = ribbonStarts.get(entry) ?? entry.source.y;
      const endY = entry.target.y + incoming;

      return {
        key: `${entry.source.key}->${entry.target.key}`,
        sourceKey: entry.source.key,
        targetKey: entry.target.key,
        value: entry.link.value,
        path: [
          `M${startX},${startY}`,
          `C${middleX},${startY} ${middleX},${endY} ${endX},${endY}`,
          `L${endX},${endY + thickness}`,
          `C${middleX},${endY + thickness} ${middleX},${startY + thickness} ${startX},${startY + thickness}`,
          'Z',
        ].join(' '),
      };
    });

  return { nodes, links };
};
