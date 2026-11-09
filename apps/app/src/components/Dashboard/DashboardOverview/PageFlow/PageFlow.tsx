import {
  type AudienceRange,
  PAGE_FLOW_ENTRANCE,
  type PageFlow as PageFlowReport,
} from '@intlayer/backend-contract/analytics';
import { useGetPageFlow } from '@intlayer/design-system/api';
import { Loader } from '@intlayer/design-system/loader';
import { Select } from '@intlayer/design-system/select';
import { type FC, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  layoutPageFlow,
  type PageFlowLayoutLink,
  type PageFlowLayoutNode,
} from './pageFlowLayout';

/** Default starting page of the flow. */
const DEFAULT_START_URL = '/';

/** How often the flow refreshes in the live view. */
const LIVE_REFRESH_INTERVAL_MS = 15_000;

/** Chart geometry, in viewBox units (the height is also its pixel height). */
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 360;
const NODE_WIDTH = 10;
const LABEL_SPACE = 180;
/** Gap between nodes of a step — tall enough for a two-line label. */
const NODE_GAP = 32;

/** Readable average: whole numbers, one decimal under 10. */
const formatFlowValue = (value: number, locale: string): string =>
  value.toLocaleString(locale, {
    maximumFractionDigits: value < 10 ? 1 : 0,
  });

/** "42%" share of `value` in `total`. */
const formatShare = (value: number, total: number, locale: string): string =>
  (total > 0 ? value / total : 0).toLocaleString(locale, {
    style: 'percent',
    maximumFractionDigits: 0,
  });

type PageFlowProps = {
  /** Window of the report, shared with the rest of the audience section. */
  range: AudienceRange;
  /** Pages offered as starting points, most visited first. */
  pageOptions: string[];
  locale: string;
};

/**
 * Averaged user flow: from a starting page (`/` by default, or the session
 * start for landing pages), the pages visitors navigate to over the next
 * steps, drawn as a left-to-right Sankey diagram. Clicking a page re-roots the
 * flow on it.
 */
export const PageFlow: FC<PageFlowProps> = ({ range, pageOptions, locale }) => {
  const content = useIntlayer('page-flow');
  const [startUrl, setStartUrl] = useState(DEFAULT_START_URL);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const { data, isLoading } = useGetPageFlow(range, startUrl, {
    refetchInterval: range === 'live' ? LIVE_REFRESH_INTERVAL_MS : false,
  });
  const flow = data?.data as PageFlowReport | undefined;

  const layout = useMemo(
    () =>
      flow
        ? layoutPageFlow(flow, {
            width: CHART_WIDTH,
            height: CHART_HEIGHT,
            nodeWidth: NODE_WIDTH,
            nodeGap: NODE_GAP,
            labelSpace: LABEL_SPACE,
            minNodeHeight: 3,
          })
        : null,
    [flow]
  );

  const startOptions = useMemo(
    () =>
      [...new Set([DEFAULT_START_URL, startUrl, ...pageOptions])].filter(
        (url) => url !== PAGE_FLOW_ENTRANCE
      ),
    [pageOptions, startUrl]
  );

  const getPageLabel = (url: string | null): string =>
    url === null
      ? content.otherPages.value
      : url === PAGE_FLOW_ENTRANCE
        ? content.sessionStart.value
        : url;

  /** Whether a ribbon touches the hovered node or is the hovered ribbon. */
  const isLinkHighlighted = (link: PageFlowLayoutLink): boolean =>
    hoveredKey === link.key ||
    hoveredKey === link.sourceKey ||
    hoveredKey === link.targetKey;

  const canReRoot = (
    node: PageFlowLayoutNode
  ): node is PageFlowLayoutNode & {
    url: string;
  } => node.url !== null && node.url !== startUrl;

  const stepCount = flow?.steps.length ?? 0;
  const startNode = layout?.nodes[0];
  const hasFlow = stepCount > 1;
  const columnSpacing =
    stepCount > 1
      ? (CHART_WIDTH - LABEL_SPACE - NODE_WIDTH) / (stepCount - 1)
      : CHART_WIDTH;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-text">{content.title}</h3>
          <span className="text-xs text-neutral">{content.subtitle}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral">
          {content.startPageLabel}
          <Select value={startUrl} onValueChange={setStartUrl}>
            <Select.Trigger className="w-56 max-w-[60vw]">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={PAGE_FLOW_ENTRANCE}>
                {content.sessionStart}
              </Select.Item>
              {startOptions.map((url) => (
                <Select.Item key={url} value={url}>
                  <span className="font-mono" dir="ltr">
                    {url}
                  </span>
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
      </div>

      {isLoading && !flow ? (
        <div
          className="flex items-center justify-center"
          style={{ height: CHART_HEIGHT }}
        >
          <Loader />
        </div>
      ) : !layout || !hasFlow ? (
        <p className="py-10 text-center text-sm text-neutral">
          {content.noData}
        </p>
      ) : (
        <>
          {/* Steps read left to right, like the time they represent. */}
          <div className="flex flex-col gap-2" dir="ltr">
            <div className="relative h-4 text-xs text-neutral">
              {flow?.steps.map((_, step) => (
                <span
                  // oxlint-disable-next-line react/no-array-index-key -- steps are positional
                  key={step}
                  className="absolute"
                  style={{
                    left: `${((step * columnSpacing) / CHART_WIDTH) * 100}%`,
                  }}
                >
                  {step === 0
                    ? content.startPageLabel
                    : `${content.stepLabel.value} ${step}`}
                </span>
              ))}
            </div>

            <div
              className="relative"
              style={{ height: CHART_HEIGHT }}
              onPointerLeave={() => setHoveredKey(null)}
            >
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible text-text"
                role="img"
                aria-label={content.chartLabel.value}
              >
                {layout.links.map((link) => {
                  const sourceNode = layout.nodes.find(
                    (node) => node.key === link.sourceKey
                  );

                  return (
                    <path
                      key={link.key}
                      d={link.path}
                      className="fill-current transition-opacity"
                      opacity={isLinkHighlighted(link) ? 0.32 : 0.1}
                      onPointerEnter={() => setHoveredKey(link.key)}
                    >
                      <title>
                        {`${getPageLabel(sourceNode?.url ?? null)} → ${getPageLabel(
                          layout.nodes.find(
                            (node) => node.key === link.targetKey
                          )?.url ?? null
                        )} · ${formatFlowValue(link.value, locale)} ${content.viewsLabel.value} (${formatShare(
                          link.value,
                          sourceNode?.value ?? 0,
                          locale
                        )})`}
                      </title>
                    </path>
                  );
                })}

                {layout.nodes.map((node) => (
                  <rect
                    key={node.key}
                    x={node.x}
                    y={node.y}
                    width={NODE_WIDTH}
                    height={node.height}
                    rx={2}
                    className={
                      node.url === null ? 'fill-neutral/50' : 'fill-current'
                    }
                    onPointerEnter={() => setHoveredKey(node.key)}
                  />
                ))}
              </svg>

              {/* HTML labels, so long paths truncate and stay clickable. */}
              {layout.nodes.map((node) => {
                const label = (
                  <>
                    <span
                      className={
                        node.url === null || node.url === PAGE_FLOW_ENTRANCE
                          ? 'truncate font-medium text-text'
                          : 'truncate font-mono font-medium text-text'
                      }
                      title={node.url ?? undefined}
                    >
                      {getPageLabel(node.url)}
                    </span>
                    <span className="truncate text-neutral">
                      {formatFlowValue(node.value, locale)} {content.viewsLabel}
                      {node.step > 0 &&
                        startNode &&
                        ` · ${formatShare(node.value, startNode.value, locale)}`}
                      {node.exits !== null &&
                        node.exits > 0 &&
                        ` · ${formatShare(node.exits, node.value, locale)} ${content.exitLabel.value}`}
                    </span>
                  </>
                );
                const labelStyle = {
                  left: `${((node.x + NODE_WIDTH + 6) / CHART_WIDTH) * 100}%`,
                  top: node.y,
                  maxWidth: `${((Math.min(columnSpacing, LABEL_SPACE) - 16) / CHART_WIDTH) * 100}%`,
                };
                const labelClassName =
                  'absolute flex flex-col rounded bg-card/70 text-start text-xs leading-tight';

                return canReRoot(node) ? (
                  <button
                    key={node.key}
                    type="button"
                    onClick={() => setStartUrl(node.url)}
                    onPointerEnter={() => setHoveredKey(node.key)}
                    title={content.reRootHint.value}
                    className={`${labelClassName} px-1 transition-colors hover:bg-neutral/10`}
                    style={labelStyle}
                  >
                    {label}
                  </button>
                ) : (
                  <div
                    key={node.key}
                    className={`${labelClassName} px-1`}
                    style={labelStyle}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-neutral">{content.reRootHint}</p>
        </>
      )}
    </div>
  );
};
