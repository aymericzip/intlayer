import {
  useGetAIStats,
  useGetProjectInsights,
  useSession,
} from '@intlayer/design-system/api';
import { Container } from '@intlayer/design-system/container';
import { Loader } from '@intlayer/design-system/loader';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Translate_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { getLocaleName } from 'intlayer';
import {
  Bot,
  GitBranch,
  Languages,
  Layers,
  MessageSquare,
  ScanLine,
  Users,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { DashboardAudience } from './DashboardAudience';

/** Formats a `[0, 1]` ratio as an integer percentage (e.g. `0.5` → `50%`). */
const formatPercent = (ratio: number): string => `${Math.round(ratio * 100)}%`;

/** Shared surface for every overview panel, so padding and radius stay equal. */
const Panel: FC<{ className?: string; children: ReactNode }> = ({
  className,
  children,
}) => (
  <Container
    className={cn('flex flex-col gap-4 p-5', className)}
    roundedSize="2xl"
    transparency="none"
    border
    borderColor="neutral"
  >
    {children}
  </Container>
);

/** Panel heading: one size, one weight across the overview. */
const PanelTitle: FC<{ children: ReactNode }> = ({ children }) => (
  <h2 className="text-base font-medium text-text">{children}</h2>
);

/** Locale code set as a small mono tag, used wherever a locale appears. */
const LocaleCode: FC<{ code: string }> = ({ code }) => (
  <span
    dir="ltr"
    className="rounded-md border border-neutral/20 px-1.5 py-0.5 font-mono text-xs leading-none text-neutral"
  >
    {code}
  </span>
);

type StatCardProps = {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
  /** The one figure that matters on the page, set larger than the rest. */
  isPrimary?: boolean;
};

/** A headline metric: label, figure, optional context line. */
const StatCard: FC<StatCardProps> = ({ label, value, hint, isPrimary }) => (
  <Panel className="gap-2">
    <span className="text-sm text-neutral">{label}</span>
    <span
      className={cn(
        'leading-none font-medium text-text tabular-nums',
        isPrimary ? 'text-4xl' : 'text-2xl'
      )}
    >
      {value}
    </span>
    {hint && <span className="text-xs text-neutral tabular-nums">{hint}</span>}
  </Panel>
);

type ConfigRowProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  /** Whether the setting is active; inactive values read muted. */
  isActive?: boolean;
};

/** One key/value line of the team and configuration list. */
const ConfigRow: FC<ConfigRowProps> = ({ icon, label, value, isActive }) => (
  <li className="flex h-10 items-center gap-3 border-t border-neutral/10 text-sm first:border-t-0">
    <span className="flex size-4 shrink-0 items-center justify-center text-neutral">
      {icon}
    </span>
    <span className="flex-1 truncate text-neutral">{label}</span>
    <span
      className={cn(
        'shrink-0 tabular-nums',
        isActive ? 'font-medium text-text' : 'text-neutral'
      )}
    >
      {value}
    </span>
  </li>
);

/**
 * Project overview / insights dashboard. Centralizes the localization health of
 * the selected project: locale and key counts, per-locale completion, missing
 * translations, recent activity and team/configuration status.
 */
export const DashboardOverview: FC = () => {
  const content = useIntlayer('dashboard-overview');
  const { locale } = useLocale();
  const { session } = useSession();
  const hasProject = Boolean(session?.project);

  const { data, isLoading } = useGetProjectInsights({ enabled: hasProject });
  const insights = data?.data;

  const { data: aiStatsData } = useGetAIStats({ enabled: hasProject });
  const aiStats = aiStatsData?.data;
  const hasAIUsage = Boolean(aiStats && aiStats.totalTokens > 0);

  if (!hasProject) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <p className="max-w-sm text-center text-sm text-neutral">
          {content.noProjectSelected}
        </p>
      </div>
    );
  }

  if (isLoading || !insights) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <Loader />
      </div>
    );
  }

  const formatNumber = (value: number): string => value.toLocaleString(locale);
  const hasMissing = insights.missingTranslationCount > 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Headline metrics, completion leads */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <StatCard
            isPrimary
            label={content.statCompletion}
            value={formatPercent(insights.overallCompletionRate)}
            hint={
              <>
                {formatNumber(insights.translatedUnitCount)} /{' '}
                {formatNumber(insights.translationUnitCount)}{' '}
                {content.translatedSuffix}
              </>
            }
          />
        </div>
        <StatCard
          label={content.statLocales}
          value={formatNumber(insights.localeCount)}
          hint={
            insights.defaultLocale
              ? getLocaleName(insights.defaultLocale, locale)
              : undefined
          }
        />
        <StatCard
          label={content.statDictionaries}
          value={formatNumber(insights.dictionaryCount)}
        />
        <StatCard
          label={content.statKeys}
          value={formatNumber(insights.keyCount)}
        />
      </div>

      {/* Completion by locale: the main chart, carrying translation health */}
      <Panel className="gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <PanelTitle>{content.completionByLocale}</PanelTitle>
            <p className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral">
              <span>
                {content.missingTranslations}{' '}
                <span
                  className={cn(
                    'font-medium tabular-nums',
                    hasMissing ? 'text-warning' : 'text-text'
                  )}
                >
                  {formatNumber(insights.missingTranslationCount)}
                </span>
              </span>
              <span>
                {content.dictionariesWithMissing}{' '}
                <span className="font-medium text-text tabular-nums">
                  {formatNumber(insights.dictionariesWithMissingTranslations)}
                </span>
              </span>
              <span>
                {content.fullyTranslatedLocales}{' '}
                <span className="font-medium text-text tabular-nums">
                  {insights.fullyTranslatedLocaleCount} / {insights.localeCount}
                </span>
              </span>
            </p>
          </div>
          {hasMissing && (
            <Link
              to={App_Dashboard_Translate_Path}
              variant="button"
              color="text"
              label={content.fillMissingAction.value}
            >
              {content.fillMissingAction}
            </Link>
          )}
        </div>

        <ul className="flex flex-col">
          {insights.localeInsights.map((localeInsight) => (
            <li
              key={localeInsight.locale}
              className="grid h-12 grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-4 border-t border-neutral/10 text-sm first:border-t-0 sm:grid-cols-[minmax(0,14rem)_1fr_6rem_3rem]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-text">
                  {getLocaleName(localeInsight.locale, locale)}
                </span>
                <LocaleCode code={localeInsight.locale} />
                {localeInsight.isDefault && (
                  <span className="text-xs text-neutral">
                    {content.defaultTag}
                  </span>
                )}
              </span>
              <span className="h-1.5 overflow-hidden rounded-full bg-neutral/10">
                <span
                  className="block h-full rounded-full bg-text/70"
                  style={{
                    width: formatPercent(localeInsight.completionRate),
                  }}
                />
              </span>
              <span className="hidden text-end text-xs text-warning tabular-nums sm:block">
                {localeInsight.missingKeys > 0 &&
                  `${formatNumber(localeInsight.missingKeys)} ${content.missingSuffix.value}`}
              </span>
              <span className="text-end font-medium text-text tabular-nums">
                {formatPercent(localeInsight.completionRate)}
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* AI usage, only when there is something to show */}
      {hasAIUsage && aiStats && (
        <Panel>
          <PanelTitle>{content.aiUsage}</PanelTitle>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {[
              {
                label: content.aiTotalConversations,
                value: aiStats.totalDiscussions,
              },
              { label: content.aiTotalTokens, value: aiStats.totalTokens },
              { label: content.aiInputTokens, value: aiStats.totalInputTokens },
              {
                label: content.aiOutputTokens,
                value: aiStats.totalOutputTokens,
              },
            ].map(({ label, value }) => (
              <div key={label.value} className="flex flex-col gap-1">
                <dt className="text-neutral">{label}</dt>
                <dd className="text-lg font-medium text-text tabular-nums">
                  {formatNumber(value)}
                </dd>
              </div>
            ))}
          </dl>

          {aiStats.modelUsage.length > 0 && (
            <ul className="flex flex-col">
              {aiStats.modelUsage.map((modelEntry) => {
                const ratio = modelEntry.totalTokens / aiStats.totalTokens;

                return (
                  <li
                    key={modelEntry.aiModel}
                    className="grid h-10 grid-cols-[minmax(0,14rem)_1fr_auto] items-center gap-4 border-t border-neutral/10 text-xs first:border-t-0"
                  >
                    <span
                      dir="ltr"
                      className="truncate text-start font-mono text-text"
                    >
                      {modelEntry.aiModel}
                    </span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-neutral/10">
                      <span
                        className="block h-full rounded-full bg-text/70"
                        style={{ width: formatPercent(ratio) }}
                      />
                    </span>
                    <span className="flex items-center gap-3 text-neutral tabular-nums">
                      <span>
                        {formatNumber(modelEntry.discussionCount)}{' '}
                        {content.aiConversations}
                      </span>
                      <span className="font-medium text-text">
                        {formatNumber(modelEntry.totalTokens)}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>
      )}

      {/* Recent activity + team & config */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[3fr_2fr]">
        <Panel>
          <div className="flex items-center justify-between gap-2">
            <PanelTitle>{content.recentActivity}</PanelTitle>
            <Link
              to={App_Dashboard_Dictionaries_Path}
              variant="invisible-link"
              color="text"
              label={content.viewDictionariesAction.value}
              className="text-sm text-neutral transition-colors hover:text-text"
            >
              {content.viewDictionariesAction}
            </Link>
          </div>
          {insights.recentlyUpdated.length === 0 ? (
            <p className="text-sm text-neutral">{content.noActivity}</p>
          ) : (
            <ul className="flex flex-col">
              {insights.recentlyUpdated.map((item) => (
                <li
                  key={item.key}
                  className="flex h-10 items-center justify-between gap-4 border-t border-neutral/10 first:border-t-0"
                >
                  <span
                    dir="ltr"
                    className="truncate font-mono text-sm text-text"
                  >
                    {item.key}
                  </span>
                  <span className="shrink-0 text-xs text-neutral tabular-nums">
                    {new Date(item.updatedAt).toLocaleDateString(locale, {
                      dateStyle: 'medium',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel>
          <PanelTitle>{content.teamAndConfig}</PanelTitle>
          <ul className="flex flex-col">
            <ConfigRow
              isActive
              icon={<Users className="size-4" />}
              label={content.members}
              value={formatNumber(insights.memberCount)}
            />
            <ConfigRow
              isActive
              icon={<Layers className="size-4" />}
              label={content.environments}
              value={formatNumber(insights.environmentCount)}
            />
            <ConfigRow
              isActive={insights.autoFill}
              icon={<Languages className="size-4" />}
              label={content.autoFill}
              value={insights.autoFill ? content.enabled : content.disabled}
            />
            <ConfigRow
              isActive={insights.aiConfigured}
              icon={<Bot className="size-4" />}
              label={content.aiAssistant}
              value={
                insights.aiConfigured ? content.enabled : content.notConfigured
              }
            />
            {!hasAIUsage && (
              <ConfigRow
                icon={<MessageSquare className="size-4" />}
                label={content.aiUsage}
                value={content.aiNoData}
              />
            )}
            <ConfigRow
              isActive={Boolean(insights.repositoryProvider)}
              icon={<GitBranch className="size-4" />}
              label={content.repository}
              value={insights.repositoryProvider ?? content.notConnected}
            />
            <ConfigRow
              isActive={Boolean(insights.applicationURL)}
              icon={<ScanLine className="size-4" />}
              label={content.scanner}
              value={
                insights.applicationURL
                  ? content.enabled
                  : content.notConfigured
              }
            />
          </ul>
        </Panel>
      </div>

      {/* Audience analytics, after the localization health the page is for */}
      <DashboardAudience hideWhenEmpty />
    </div>
  );
};
