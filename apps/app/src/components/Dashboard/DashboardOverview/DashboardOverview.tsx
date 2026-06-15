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
import { Tag } from '@intlayer/design-system/tag';
import { cn } from '@intlayer/design-system/utils';
import { getLocaleName } from 'intlayer';
import {
  AlertTriangle,
  Book,
  BrainCircuit,
  CheckCircle2,
  GitBranch,
  Globe,
  KeyRound,
  Languages,
  MessageSquare,
  ScanLine,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '#components/Link/Link';

/** Formats a `[0, 1]` ratio as an integer percentage (e.g. `0.5` → `50%`). */
const formatPercent = (ratio: number): string => `${Math.round(ratio * 100)}%`;

/** Bar color buckets keyed on completion ratio. */
const getBarColor = (ratio: number): string => {
  if (ratio >= 1) return 'bg-success/60';
  if (ratio >= 0.5) return 'bg-warning/60';
  return 'bg-error/60';
};

type StatCardProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
};

/** A single headline metric card. */
const StatCard: FC<StatCardProps> = ({ icon, label, value, hint }) => (
  <Container
    className="flex flex-1 flex-col gap-2 p-4"
    roundedSize="2xl"
    transparency="none"
    border
    borderColor="neutral"
  >
    <span className="flex items-center gap-2 text-neutral text-xs">
      {icon}
      {label}
    </span>
    <span className="font-semibold text-2xl text-text">{value}</span>
    {hint && <span className="text-neutral text-xs">{hint}</span>}
  </Container>
);

type ConfigChipProps = {
  icon: ReactNode;
  label: ReactNode;
  value: ReactNode;
  tone?: 'success' | 'neutral' | 'warning';
};

/** A compact team/configuration status chip. */
const ConfigChip: FC<ConfigChipProps> = ({
  icon,
  label,
  value,
  tone = 'neutral',
}) => (
  <Container
    className="flex items-center gap-3 p-3"
    roundedSize="2xl"
    transparency="none"
    border
    borderColor={tone === 'success' ? 'success' : 'neutral'}
  >
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg',
        tone === 'success' && 'bg-success/10 text-success',
        tone === 'warning' && 'bg-warning/10 text-warning',
        tone === 'neutral' && 'bg-neutral/10 text-neutral'
      )}
    >
      {icon}
    </span>
    <span className="flex min-w-0 flex-col">
      <span className="truncate text-neutral text-xs">{label}</span>
      <span className="truncate font-medium text-sm text-text">{value}</span>
    </span>
  </Container>
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

  if (!hasProject) {
    return (
      <div className="flex flex-1 items-center justify-center p-10">
        <p className="max-w-sm text-center text-neutral text-sm">
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

  const hasMissing = insights.missingTranslationCount > 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Headline metrics */}
      <div className="flex flex-wrap gap-4">
        <StatCard
          icon={<Globe className="size-4" />}
          label={content.statLocales}
          value={insights.localeCount}
          hint={
            insights.defaultLocale
              ? getLocaleName(insights.defaultLocale, locale)
              : undefined
          }
        />
        <StatCard
          icon={<Book className="size-4" />}
          label={content.statDictionaries}
          value={insights.dictionaryCount}
        />
        <StatCard
          icon={<KeyRound className="size-4" />}
          label={content.statKeys}
          value={insights.keyCount}
        />
        <StatCard
          icon={<Languages className="size-4" />}
          label={content.statCompletion}
          value={formatPercent(insights.overallCompletionRate)}
          hint={`${insights.translatedUnitCount} / ${insights.translationUnitCount}`}
        />
      </div>

      {/* Translation health */}
      <Container
        className="flex flex-col gap-4 p-5"
        roundedSize="2xl"
        transparency="none"
        border
        borderColor="neutral"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold text-base text-text">
            {content.translationHealth}
          </h2>
          {hasMissing && (
            <Link
              to={App_Dashboard_Translate_Path}
              variant="button"
              color="text"
              label={content.fillMissingAction.value}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="size-4" />
                {content.fillMissingAction}
              </span>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <AlertTriangle
              className={cn(
                'size-4',
                hasMissing ? 'text-warning' : 'text-neutral'
              )}
            />
            <span className="text-neutral">{content.missingTranslations}</span>
            <span className="font-semibold text-text">
              {insights.missingTranslationCount}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <Book className="size-4 text-neutral" />
            <span className="text-neutral">
              {content.dictionariesWithMissing}
            </span>
            <span className="font-semibold text-text">
              {insights.dictionariesWithMissingTranslations}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-success" />
            <span className="text-neutral">
              {content.fullyTranslatedLocales}
            </span>
            <span className="font-semibold text-text">
              {insights.fullyTranslatedLocaleCount} / {insights.localeCount}
            </span>
          </span>
        </div>
      </Container>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Completion by locale */}
        <Container
          className="flex flex-col gap-4 p-5"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <h2 className="font-semibold text-base text-text">
            {content.completionByLocale}
          </h2>
          <ul className="flex flex-col gap-3">
            {insights.localeInsights.map((localeInsight) => {
              const isComplete =
                localeInsight.totalKeys > 0 &&
                localeInsight.completionRate >= 1;

              return (
                <li
                  key={localeInsight.locale}
                  className="mt-4 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-6">
                      <span className="font-medium text-text">
                        {getLocaleName(localeInsight.locale, locale)}
                      </span>
                      <span className="text-neutral text-xs">
                        {localeInsight.locale}
                      </span>
                      {localeInsight.isDefault && (
                        <Tag size="xs" color="text">
                          {content.defaultTag}
                        </Tag>
                      )}
                      {isComplete && (
                        <Tag size="xs" color="success">
                          {content.completeTag}
                        </Tag>
                      )}
                    </span>
                    <span className="flex items-center gap-3 text-xs">
                      {localeInsight.missingKeys > 0 && (
                        <span className="text-warning">
                          −{localeInsight.missingKeys}
                        </span>
                      )}
                      <span className="font-semibold text-text">
                        {formatPercent(localeInsight.completionRate)}
                      </span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
                    <div
                      className={cn(
                        'h-full min-w-1 transition-all duration-500 ease-out',
                        getBarColor(localeInsight.completionRate)
                      )}
                      style={{
                        width: `${Math.round(localeInsight.completionRate * 100)}%`,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>

        <Container
          className="flex flex-1 flex-col gap-3 p-5"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <h2 className="font-semibold text-base text-text">
            {content.aiUsage}
          </h2>

          {!aiStats || aiStats.totalTokens === 0 ? (
            <div className="m-auto flex flex-1 items-center justify-center">
              <p className="text-neutral text-sm">{content.aiNoData}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Summary row */}
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 text-sm">
                  <MessageSquare className="size-4 text-neutral" />
                  <span className="text-neutral">
                    {content.aiTotalConversations}
                  </span>
                  <span className="font-semibold text-text">
                    {aiStats.totalDiscussions}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <Zap className="size-4 text-neutral" />
                  <span className="text-neutral">{content.aiTotalTokens}</span>
                  <span className="font-semibold text-text">
                    {aiStats.totalTokens.toLocaleString()}
                  </span>
                </span>
              </div>

              {/* Input / Output token split */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-400/70" />
                  <span className="text-neutral">{content.aiInputTokens}</span>
                  <span className="font-medium text-text">
                    {aiStats.totalInputTokens.toLocaleString()}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-purple-400/70" />
                  <span className="text-neutral">{content.aiOutputTokens}</span>
                  <span className="font-medium text-text">
                    {aiStats.totalOutputTokens.toLocaleString()}
                  </span>
                </span>
              </div>

              {/* Per-model breakdown */}
              {aiStats.modelUsage.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {aiStats.modelUsage.map((modelEntry) => {
                    const ratio =
                      aiStats.totalTokens > 0
                        ? modelEntry.totalTokens / aiStats.totalTokens
                        : 0;

                    return (
                      <li
                        key={modelEntry.aiModel}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="flex items-center gap-1.5">
                            <BrainCircuit className="size-3.5 text-neutral" />
                            <span className="font-mono text-text">
                              {modelEntry.aiModel}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 text-neutral">
                            <span>
                              {modelEntry.discussionCount}{' '}
                              {content.aiConversations}
                            </span>
                            <span className="font-semibold text-text">
                              {modelEntry.totalTokens.toLocaleString()}
                            </span>
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
                          <div
                            className="h-full min-w-1 rounded-full bg-purple-400/60 transition-all duration-500 ease-out"
                            style={{ width: `${Math.round(ratio * 100)}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </Container>
      </div>

      {/* Recent activity + team & config */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <Container
          className="flex flex-1 flex-col gap-3 p-5"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-semibold text-base text-text">
              {content.recentActivity}
            </h2>
            <Link
              to={App_Dashboard_Dictionaries_Path}
              variant="invisible-link"
              color="text"
              label={content.viewDictionariesAction.value}
              className="text-neutral text-xs hover:text-text"
            >
              {content.viewDictionariesAction}
            </Link>
          </div>
          {insights.recentlyUpdated.length === 0 ? (
            <p className="text-neutral text-sm">{content.noActivity}</p>
          ) : (
            <ul className="flex flex-col divide-y divide-neutral/10">
              {insights.recentlyUpdated.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between gap-2 py-2"
                >
                  <span className="truncate font-mono text-text text-xs">
                    {item.key}
                  </span>
                  <span className="shrink-0 text-neutral text-xs">
                    {new Date(item.updatedAt).toLocaleDateString(locale)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Container>

        <Container
          className="flex flex-1 flex-col gap-3 p-5"
          roundedSize="2xl"
          transparency="none"
          border
          borderColor="neutral"
        >
          <h2 className="font-semibold text-base text-text">
            {content.teamAndConfig}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ConfigChip
              icon={<Users className="size-4" />}
              label={content.members}
              value={insights.memberCount}
            />
            <ConfigChip
              icon={<Languages className="size-4" />}
              label={content.environments}
              value={insights.environmentCount}
            />
            <ConfigChip
              icon={<Sparkles className="size-4" />}
              label={content.autoFill}
              value={insights.autoFill ? content.enabled : content.disabled}
              tone={insights.autoFill ? 'success' : 'neutral'}
            />
            <ConfigChip
              icon={<Sparkles className="size-4" />}
              label={content.aiAssistant}
              value={
                insights.aiConfigured ? content.enabled : content.notConfigured
              }
              tone={insights.aiConfigured ? 'success' : 'warning'}
            />
            <ConfigChip
              icon={<GitBranch className="size-4" />}
              label={content.repository}
              value={insights.repositoryProvider ?? content.notConnected}
              tone={insights.repositoryProvider ? 'success' : 'neutral'}
            />
            <ConfigChip
              icon={<ScanLine className="size-4" />}
              label={content.scanner}
              value={
                insights.applicationURL
                  ? content.enabled
                  : content.notConfigured
              }
              tone={insights.applicationURL ? 'success' : 'neutral'}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};
