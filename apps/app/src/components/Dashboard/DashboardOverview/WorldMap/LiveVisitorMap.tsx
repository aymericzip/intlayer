import type {
  LiveVisitor,
  LiveVisitorFlow,
  LiveVisitorFlowStep,
} from '@intlayer/backend-contract/analytics';
import { getCachedIntl } from '@intlayer/core/utils';
import { useGetLiveVisitorFlow } from '@intlayer/design-system/api';
import { Loader } from '@intlayer/design-system/loader';
import { ArrowLeft, FileText, X } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  EMPTY_LIVE_VISITOR_SELECTION,
  getVisitorsActiveAt,
  type LiveVisitorSelection,
} from './liveVisitorSelection';
import { WorldMap, type WorldMapRow } from './WorldMap';
import {
  countryToFlag,
  getCountryName,
  UNKNOWN_COUNTRY_CODE,
} from './worldMap.utils';
import { groupVisitorsByPlace, type LiveMapPlace } from './worldMapProjection';

/** How often an open visitor journey is refreshed — matches the live report. */
const JOURNEY_REFRESH_INTERVAL_MS = 15_000;

/** Activity this recent counts as "now" in the journey. */
const NOW_THRESHOLD_MS = 60_000;

/** Most visitors listed in the panel before a place is picked. */
const MAX_LISTED_VISITORS = 50;

/** "Lyon, France" / "France" / unknown, for a visitor or a place. */
const formatLocation = (
  location: { city?: string; country: string },
  locale: string,
  unknownLabel: string
): string => {
  if (location.country === UNKNOWN_COUNTRY_CODE) {
    return location.city ?? unknownLabel;
  }

  const countryName = getCountryName(location.country, locale);

  return location.city ? `${location.city}, ${countryName}` : countryName;
};

/** "2 minutes ago" / "now", relative to `referenceTime`. */
const formatRelativeTime = (
  isoDate: string,
  referenceTime: number,
  locale: string
): string => {
  const elapsedSeconds = Math.round(
    (referenceTime - Date.parse(isoDate)) / 1000
  );
  const formatter = getCachedIntl('RelativeTimeFormat', locale, {
    numeric: 'auto',
  });

  return elapsedSeconds < 60
    ? formatter.format(-Math.max(0, elapsedSeconds), 'second')
    : formatter.format(-Math.round(elapsedSeconds / 60), 'minute');
};

/** "45 sec" / "3 min" for a time spent on a page. */
const formatDuration = (durationMs: number, locale: string): string => {
  const seconds = Math.max(0, Math.round(durationMs / 1000));
  const isUnderMinute = seconds < 60;

  return getCachedIntl('NumberFormat', locale, {
    style: 'unit',
    unit: isUnderMinute ? 'second' : 'minute',
    unitDisplay: 'short',
  }).format(isUnderMinute ? seconds : Math.round(seconds / 60));
};

type VisitorListProps = {
  visitors: LiveVisitor[];
  locale: string;
  referenceTime: number;
  onSelect: (visitorId: string) => void;
};

/** Clickable rows of active visitors: place, current page, last activity. */
const VisitorList: FC<VisitorListProps> = ({
  visitors,
  locale,
  referenceTime,
  onSelect,
}) => {
  const content = useIntlayer('live-visitor-map');

  return (
    <ul className="flex flex-col gap-1">
      {visitors.map((visitor) => (
        <li key={visitor.visitorId}>
          <button
            type="button"
            onClick={() => onSelect(visitor.visitorId)}
            aria-label={`${formatLocation(visitor, locale, content.unknownLocation.value)} · ${visitor.currentUrl}`}
            className="flex w-full flex-col gap-0.5 rounded-lg px-2 py-1.5 text-start transition-colors hover:bg-neutral/10"
          >
            <span className="flex w-full items-center gap-1.5 text-sm text-text">
              <span aria-hidden>{countryToFlag(visitor.country)}</span>
              <span className="min-w-0 flex-1 truncate">
                {formatLocation(visitor, locale, content.unknownLocation.value)}
              </span>
              <span className="shrink-0 text-xs text-neutral">
                {formatRelativeTime(visitor.lastSeenAt, referenceTime, locale)}
              </span>
            </span>
            <span className="flex w-full items-center gap-1.5 ps-6 text-xs text-neutral">
              <span className="min-w-0 flex-1 truncate font-mono" dir="ltr">
                {visitor.currentUrl}
              </span>
              <span className="shrink-0">
                {visitor.pageCount} {content.pagesLabel}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

type JourneyStepProps = {
  step: LiveVisitorFlowStep;
  /** Arrival on the next page, which ends the time spent on this one. */
  nextStepStart?: string;
  isLast: boolean;
  locale: string;
  referenceTime: number;
};

/** One page of a visitor journey, on a vertical timeline. */
const JourneyStep: FC<JourneyStepProps> = ({
  step,
  nextStepStart,
  isLast,
  locale,
  referenceTime,
}) => {
  const content = useIntlayer('live-visitor-map');
  const stepEnd = Date.parse(nextStepStart ?? step.lastSeenAt);
  const isCurrent =
    isLast && referenceTime - Date.parse(step.lastSeenAt) < NOW_THRESHOLD_MS;

  return (
    <li className="relative flex gap-3 pb-4 last:pb-0">
      {/* Timeline rail */}
      {!isLast && (
        <span
          className="absolute start-[5px] top-4 bottom-0 w-px bg-neutral/30"
          aria-hidden
        />
      )}
      <span
        className={
          isCurrent
            ? 'relative mt-1.5 size-[11px] shrink-0 rounded-full bg-success ring-4 ring-success/20'
            : 'relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-neutral/50 bg-card'
        }
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-1.5 text-sm text-text">
          <FileText className="size-3.5 shrink-0 text-neutral" />
          <span className="truncate font-mono" dir="ltr" title={step.url}>
            {step.url}
          </span>
        </span>
        <span className="text-xs text-neutral">
          {new Date(step.firstSeenAt).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
          {' · '}
          {isCurrent
            ? content.nowLabel
            : formatDuration(stepEnd - Date.parse(step.firstSeenAt), locale)}
          {step.views > 0 && ` · ${step.views} ${content.viewsLabel.value}`}
          {step.locale && ` · ${step.locale}`}
        </span>
      </div>
    </li>
  );
};

type VisitorJourneyProps = {
  visitorId: string;
  locale: string;
  referenceTime: number;
};

/** Page-by-page journey of one live visitor, refreshed while open. */
const VisitorJourney: FC<VisitorJourneyProps> = ({
  visitorId,
  locale,
  referenceTime,
}) => {
  const content = useIntlayer('live-visitor-map');
  const { data, isLoading, dataUpdatedAt } = useGetLiveVisitorFlow(visitorId, {
    refetchInterval: JOURNEY_REFRESH_INTERVAL_MS,
  });
  const flow = data?.data as LiveVisitorFlow | undefined;
  // The journey polls on its own, so "now" follows its own fetch time.
  const journeyReferenceTime = Math.max(referenceTime, dataUpdatedAt);

  if (isLoading && !flow) {
    return (
      <div className="flex justify-center p-6">
        <Loader />
      </div>
    );
  }

  if (!flow?.visitor) {
    return <p className="text-sm text-neutral">{content.visitorLeft}</p>;
  }

  const { visitor, steps } = flow;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1.5 text-sm font-medium text-text">
          <span aria-hidden>{countryToFlag(visitor.country)}</span>
          {formatLocation(visitor, locale, content.unknownLocation.value)}
        </span>
        <span className="text-xs text-neutral">
          {[
            visitor.locale,
            `${visitor.pageCount} ${content.pagesLabel.value}`,
            `${visitor.views} ${content.viewsLabel.value}`,
            formatDuration(
              Date.parse(visitor.lastSeenAt) - Date.parse(visitor.firstSeenAt),
              locale
            ),
          ]
            .filter(Boolean)
            .join(' · ')}
        </span>
      </div>
      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <JourneyStep
            key={`${step.url}-${step.firstSeenAt}`}
            step={step}
            nextStepStart={steps[index + 1]?.firstSeenAt}
            isLast={index === steps.length - 1}
            locale={locale}
            referenceTime={journeyReferenceTime}
          />
        ))}
      </ol>
    </div>
  );
};

/** "14:32" for a `YYYY-MM-DDTHH:mm` UTC minute, in local time. */
const formatMinute = (minute: string, locale: string): string =>
  new Date(`${minute}:00.000Z`).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });

type LiveVisitorMapProps = {
  /** Active visitors of the `live` report. */
  visitors: LiveVisitor[];
  /** Live visitors per country, for the country tooltips. */
  rows: WorldMapRow[];
  /** Time the live report was fetched (epoch ms). */
  referenceTime: number;
  /** Controlled, so the activity chart can pick a minute / visitor too. */
  selection: LiveVisitorSelection;
  onSelectionChange: (selection: LiveVisitorSelection) => void;
  locale: string;
  usersLabel: string;
  chartLabel: string;
};

/**
 * Live view of the audience map: visitor dots with zoom, and a side panel
 * listing who is active (all, at the clicked place, or during the clicked
 * minute) and, for a picked visitor, their page journey over the last 30
 * minutes.
 */
export const LiveVisitorMap: FC<LiveVisitorMapProps> = ({
  visitors,
  rows,
  referenceTime,
  selection,
  onSelectionChange,
  locale,
  usersLabel,
  chartLabel,
}) => {
  const content = useIntlayer('live-visitor-map');
  const {
    placeKey: selectedPlaceKey,
    minute: selectedMinute,
    visitorId: selectedVisitorId,
  } = selection;

  // Re-derived on every refresh, so the panel follows arrivals and departures.
  const selectedPlace = useMemo(
    () =>
      selectedPlaceKey
        ? groupVisitorsByPlace(visitors).find(
            (place) => place.key === selectedPlaceKey
          )
        : undefined,
    [visitors, selectedPlaceKey]
  );

  const handlePlaceSelect = (place: LiveMapPlace) =>
    onSelectionChange({
      placeKey: place.key,
      minute: null,
      // A lone visitor opens straight on their journey.
      visitorId:
        place.visitors.length === 1 ? place.visitors[0].visitorId : null,
    });

  const selectVisitor = (visitorId: string | null) =>
    onSelectionChange({ ...selection, visitorId });

  const clearSelection = () => onSelectionChange(EMPTY_LIVE_VISITOR_SELECTION);

  const listedVisitors = selectedPlaceKey
    ? (selectedPlace?.visitors ?? [])
    : selectedMinute
      ? getVisitorsActiveAt(visitors, selectedMinute)
      : visitors.slice(0, MAX_LISTED_VISITORS);

  const isFiltered = Boolean(selectedPlaceKey || selectedMinute);

  const panelTitle = selectedVisitorId
    ? content.journeyTitle
    : selectedPlace
      ? formatLocation(selectedPlace, locale, content.unknownLocation.value)
      : selectedMinute
        ? `${content.activeAtTitle.value} ${formatMinute(selectedMinute, locale)}`
        : content.activeNowTitle;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="min-w-0 lg:flex-2">
        <WorldMap
          rows={rows}
          locale={locale}
          usersLabel={usersLabel}
          chartLabel={chartLabel}
          live={{
            visitors,
            referenceTime,
            selectedPlaceKey,
            onPlaceSelect: handlePlaceSelect,
            zoomInLabel: content.zoomIn.value,
            zoomOutLabel: content.zoomOut.value,
            resetZoomLabel: content.resetZoom.value,
          }}
        />
      </div>

      <aside className="flex min-w-0 flex-col gap-3 lg:max-h-[28rem] lg:flex-1">
        <div className="flex items-center gap-2">
          {selectedVisitorId && (
            <button
              type="button"
              onClick={() =>
                // Back to the place / minute list, or to everyone for a lone visitor.
                isFiltered && listedVisitors.length > 1
                  ? selectVisitor(null)
                  : clearSelection()
              }
              aria-label={content.back.value}
              title={content.back.value}
              className="rounded-md p-1 text-neutral transition-colors hover:bg-neutral/10 hover:text-text"
            >
              <ArrowLeft className="size-4 rtl-mirror-icons" />
            </button>
          )}
          <h4 className="min-w-0 flex-1 truncate text-sm font-semibold text-text">
            {panelTitle}
          </h4>
          {(isFiltered || selectedVisitorId) && (
            <button
              type="button"
              onClick={clearSelection}
              aria-label={content.close.value}
              title={content.close.value}
              className="rounded-md p-1 text-neutral transition-colors hover:bg-neutral/10 hover:text-text"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {selectedVisitorId ? (
            <VisitorJourney
              visitorId={selectedVisitorId}
              locale={locale}
              referenceTime={referenceTime}
            />
          ) : listedVisitors.length > 0 ? (
            <>
              {!isFiltered && (
                <p className="mb-2 text-xs text-neutral">{content.mapHint}</p>
              )}
              <VisitorList
                visitors={listedVisitors}
                locale={locale}
                referenceTime={referenceTime}
                onSelect={selectVisitor}
              />
            </>
          ) : (
            <p className="text-sm text-neutral">{content.noVisitors}</p>
          )}
        </div>
      </aside>
    </div>
  );
};
