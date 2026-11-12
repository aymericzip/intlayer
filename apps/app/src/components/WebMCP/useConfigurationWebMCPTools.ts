import type { ProjectConfiguration } from '@intlayer/backend-contract/project';
import { useAiAPI, useSession } from '@intlayer/design-system/api';
import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';

const DEFAULT_USAGE_DAYS = 30;
const MAX_USAGE_DAYS = 366;

type ListAICreditUsageInput = { days?: number };

/**
 * Copies a project configuration without credentials. The backend already
 * masks the AI key; it is dropped anyway, only its presence is reported.
 */
const toPublicConfiguration = (configuration?: ProjectConfiguration) => {
  if (!configuration) return null;

  const { ai, ...otherSections } = configuration;

  if (!ai) return otherSections;

  const { apiKey, ...publicAIConfiguration } = ai;

  return {
    ...otherSections,
    ai: {
      ...publicAIConfiguration,
      apiKeyConfigured: publicAIConfiguration.apiKeyConfigured ?? !!apiKey,
    },
  };
};

const clampUsageDays = (days?: number): number =>
  Math.min(Math.max(Math.round(days ?? DEFAULT_USAGE_DAYS), 1), MAX_USAGE_DAYS);

/**
 * Read-only WebMCP tools exposing the selected organization, the project
 * configuration and the organization's AI credit balance and usage.
 * Secrets (AI key, access-key secrets, webhook secrets, repo tokens) are
 * never returned.
 */
export const useConfigurationWebMCPTools = (): AnyWebMCPTool[] => {
  const { session } = useSession();
  const aiAPI = useAiAPI();

  const getOrganization: AnyWebMCPTool = {
    name: 'getOrganization',
    description:
      'Describe the selected organization: name, billing plan (type, status, period), member and admin counts, and whether SSO is configured.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => {
      const organization = session?.organization;

      if (!organization) {
        return 'No organization is selected; sign in and pick an organization first.';
      }

      return {
        id: organization.id,
        name: organization.name,
        plan: organization.plan
          ? {
              type: organization.plan.type,
              status: organization.plan.status ?? null,
              period: organization.plan.period ?? null,
            }
          : { type: 'FREE', status: null, period: null },
        membersCount: organization.membersIds.length,
        adminsCount: organization.adminsIds.length,
        ssoEnabled: organization.ssoEnabled,
      };
    },
  };

  const getProjectConfiguration: AnyWebMCPTool = {
    name: 'getProjectConfiguration',
    description:
      'Read the configuration of the selected project: locales and default locale, editor URLs, AI settings (provider, model, whether an own API key is set and used), connected repository, build triggers and environments. `environmentConfiguration` holds the overrides of the selected environment. Credentials are never returned.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => {
      const project = session?.project;

      if (!project) {
        return 'No project is selected; use `updateActiveProject` first.';
      }

      const repository = project.repository;

      return {
        project: { id: project.id, name: project.name },
        configuration: toPublicConfiguration(project.configuration),
        environment: session.environment
          ? {
              id: session.environment.id,
              name: session.environment.name,
              isDefault: session.environment.isDefault,
            }
          : null,
        environmentConfiguration: toPublicConfiguration(
          session.environment?.configuration
        ),
        environments: (project.environments ?? []).map((environment) => ({
          id: environment.id,
          name: environment.name,
          isDefault: environment.isDefault,
        })),
        repository: repository
          ? {
              provider: repository.provider,
              owner: repository.owner,
              repository: repository.repository,
              branch: repository.branch,
              url: repository.url,
              configFilePath: repository.configFilePath,
            }
          : null,
        builds: {
          autoTriggerBuilds: project.webhooks?.autoTriggerBuilds ?? false,
          autoCommitDictionaries:
            project.webhooks?.autoCommitDictionaries ?? false,
          webhooks: (project.webhooks?.webhooks ?? []).map((webhook) => ({
            name: webhook.name,
            enabled: webhook.enabled ?? true,
          })),
        },
        autoFill: project.autoFill ?? false,
        accessKeysCount: project.oAuth2Access.length,
      };
    },
  };

  const getAICredits: AnyWebMCPTool = {
    name: 'getAICredits',
    description:
      'Get the AI credit balance of the selected organization for the current monthly period: plan, monthly, used and remaining credits (1 credit = `tokensPerCredit` tokens), usage per AI feature, and every call per provider/model (own API key included). `hasCreditAllowance: false` means no monthly credits (self-hosted).',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async (_input: Record<string, never>, options) => {
      if (!session?.organization) {
        return 'No organization is selected; sign in and pick an organization first.';
      }

      const response = await aiAPI.getAICredits({ signal: options?.signal });

      return response.data ?? 'No AI credit information is available.';
    },
  };

  const listAICreditUsage: AnyWebMCPTool = {
    name: 'listAICreditUsage',
    description:
      'List the day-by-day AI credit usage of the selected organization (UTC days, ending today), with a per-feature breakdown. Not available on self-hosted instances.',
    inputSchema: {
      type: 'object',
      properties: {
        days: {
          type: 'integer',
          minimum: 1,
          maximum: MAX_USAGE_DAYS,
          description: `Number of days to return (default ${DEFAULT_USAGE_DAYS}).`,
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async ({ days }: ListAICreditUsageInput, options) => {
      if (!session?.organization) {
        return 'No organization is selected; sign in and pick an organization first.';
      }

      const response = await aiAPI.getAICreditUsage(
        { days: String(clampUsageDays(days)) },
        { signal: options?.signal }
      );

      return response.data ?? 'No AI credit usage is available.';
    },
  };

  return [
    getOrganization,
    getProjectConfiguration,
    getAICredits,
    listAICreditUsage,
  ];
};
