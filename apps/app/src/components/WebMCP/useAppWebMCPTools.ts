import {
  useDictionaryAPI,
  useProjectAPI,
  useSelectProject,
  useSession,
  useUser,
} from '@intlayer/design-system/api';
import type { AnyWebMCPTool } from '@intlayer/design-system/hooks';
import {
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Dashboard_Analytics_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useLocation, useRouter } from '@tanstack/react-router';
import { useLocale } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

const DASHBOARD_PATHS = [
  App_Dashboard_Projects_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Translate_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Scanner_Path,
  App_Dashboard_Analytics_Path,
];

type NavigateToPageInput = { path: string };
type OpenAuthenticationInput = {
  mode?: 'login' | 'register';
  redirectPath?: string;
};
type ListInput = { search?: string; page?: number; pageSize?: number };
type SelectProjectInput = { projectId: string };
type GetDictionaryInput = { dictionaryKey: string };

const AUTHENTICATION_PATHS: Record<
  NonNullable<OpenAuthenticationInput['mode']>,
  string
> = {
  login: App_Auth_SignIn_Path,
  register: App_Auth_SignUp_Path,
};

/** Rejects anything an injected page could aim at another host. */
const resolveSameOriginPath = (path: string): URL | null => {
  const target = new URL(path, window.location.origin);
  return target.origin === window.location.origin ? target : null;
};

const clampPageSize = (pageSize?: number): number =>
  Math.min(Math.max(pageSize ?? DEFAULT_PAGE_SIZE, 1), MAX_PAGE_SIZE);

/**
 * Tools exposed to browser agents on every page of the Intlayer dashboard:
 * session awareness, navigation, authentication hand-off, and read access to
 * the projects and dictionaries the signed-in user can see.
 *
 * Every request rides on the user's own session cookie, so an agent can never
 * see more than the person driving it.
 */
export const useAppWebMCPTools = (): AnyWebMCPTool[] => {
  const { session } = useSession();
  const { isAuthenticated, logout } = useUser();
  const { locale, availableLocales } = useLocale();
  const { pathname } = useLocation();
  const navigate = useLocalizedNavigate();
  const router = useRouter();
  const projectAPI = useProjectAPI();
  const dictionaryAPI = useDictionaryAPI();
  const { mutateAsync: selectProject } = useSelectProject();

  const getSession: AnyWebMCPTool = {
    name: 'getSession',
    description:
      'Describe the current dashboard session: whether the user is signed in, who they are, and which organization, project and environment are selected. Call it first to know what the other tools can reach.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => ({
      isAuthenticated,
      url: window.location.href,
      path: pathname,
      locale,
      availableLocales,
      user: session?.user
        ? { name: session.user.name, email: session.user.email }
        : null,
      organization: session?.organization
        ? { id: session.organization.id, name: session.organization.name }
        : null,
      project: session?.project
        ? { id: session.project.id, name: session.project.name }
        : null,
      environment: session?.environment
        ? { id: session.environment.id, name: session.environment.name }
        : null,
      roles: session?.roles ?? [],
    }),
  };

  const navigateToPage: AnyWebMCPTool = {
    name: 'navigateToPage',
    description: `Navigate the current tab to a page of the Intlayer dashboard. Known paths: ${DASHBOARD_PATHS.map((path) => `\`${path}\``).join(', ')}, and \`${App_Dashboard_Dictionaries_Path}/<dictionaryKey>\` to open a dictionary. The path is localized automatically.`,
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Dashboard path to open.' },
      },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: async ({ path }: NavigateToPageInput) => {
      const target = resolveSameOriginPath(path);

      if (!target) {
        return 'Only dashboard paths can be opened with this tool.';
      }

      await navigate({
        to: target.pathname as never,
        search: Object.fromEntries(target.searchParams),
        hash: target.hash.replace(/^#/, '') || undefined,
      });

      return `Navigated to ${target.pathname}.`;
    },
  };

  const openAuthentication: AnyWebMCPTool = {
    name: 'openAuthentication',
    description:
      'Send the user to the sign-in or sign-up page of the dashboard, optionally returning to a given path afterwards. Does nothing when the user is already signed in.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
          enum: ['login', 'register'],
          description: 'Which flow to open (default `login`).',
        },
        redirectPath: {
          type: 'string',
          description:
            'Dashboard path to land on once authenticated (default: the current page).',
        },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: async ({
      mode = 'login',
      redirectPath,
    }: OpenAuthenticationInput) => {
      if (isAuthenticated) {
        return `Already signed in as ${session?.user?.email ?? 'the current user'}.`;
      }

      const redirectTarget = resolveSameOriginPath(redirectPath ?? pathname);

      if (!redirectTarget) {
        return 'redirectPath must be a path on the dashboard.';
      }

      await navigate({
        to: AUTHENTICATION_PATHS[mode] as never,
        search: { redirect_url: redirectTarget.pathname },
      });

      return `Opened the ${mode} page.`;
    },
  };

  const signOut: AnyWebMCPTool = {
    name: 'signOut',
    description:
      'Sign the user out of the Intlayer dashboard and return to its home page.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, consequentialHint: true },
    execute: async () => {
      if (!isAuthenticated) {
        return 'Nobody is signed in.';
      }

      await logout();
      await router.invalidate();
      await navigate({ to: App_Home_Path });

      return 'Signed out.';
    },
  };

  const listProjects: AnyWebMCPTool = {
    name: 'listProjects',
    description:
      'List the projects of the selected organization, with their id and name. Requires a signed-in user with an organization selected.',
    inputSchema: {
      type: 'object',
      properties: {
        search: { type: 'string', description: 'Filter projects by name.' },
        page: { type: 'integer', minimum: 1 },
        pageSize: { type: 'integer', minimum: 1, maximum: MAX_PAGE_SIZE },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async ({ search, page, pageSize }: ListInput, options) => {
      if (!session?.organization) {
        return 'No organization is selected; sign in and pick an organization first.';
      }

      const response = await projectAPI.getProjects(
        { search, page, pageSize: clampPageSize(pageSize) },
        { signal: options?.signal }
      );

      return {
        page: response.page,
        totalPages: response.total_pages,
        total: response.total_items,
        projects: (response.data ?? []).map((project) => ({
          id: project.id,
          name: project.name,
          isSelected: project.id === session.project?.id,
        })),
      };
    },
  };

  const selectProjectTool: AnyWebMCPTool = {
    name: 'selectProject',
    description:
      'Make a project the active one for the session, so dictionary tools and dashboard pages show its content. Use `listProjects` to find its id.',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: { type: 'string' },
      },
      required: ['projectId'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, idempotentHint: true },
    execute: async ({ projectId }: SelectProjectInput) => {
      const response = await selectProject({ projectId });

      return `Selected project "${response.data?.name ?? projectId}".`;
    },
  };

  const listDictionaries: AnyWebMCPTool = {
    name: 'listDictionaries',
    description:
      'List the content dictionaries of the selected project, with their key, title, description and tags. Requires a project to be selected.',
    inputSchema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Filter dictionaries by key, title or description.',
        },
        page: { type: 'integer', minimum: 1 },
        pageSize: { type: 'integer', minimum: 1, maximum: MAX_PAGE_SIZE },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: async ({ search, page, pageSize }: ListInput, options) => {
      if (!session?.project) {
        return 'No project is selected; use `selectProject` first.';
      }

      const response = await dictionaryAPI.getDictionaries(
        { search, page, pageSize: clampPageSize(pageSize) },
        { signal: options?.signal }
      );

      return {
        page: response.page,
        totalPages: response.total_pages,
        total: response.total_items,
        dictionaries: (response.data ?? []).map((dictionary) => ({
          key: dictionary.key,
          title: dictionary.title,
          description: dictionary.description,
          tags: dictionary.tags,
          updatedAt: dictionary.updatedAt,
        })),
      };
    },
  };

  const getDictionary: AnyWebMCPTool = {
    name: 'getDictionary',
    description:
      'Read one content dictionary of the selected project by key, including its full multilingual content. Open it for editing with `navigateToPage`.',
    inputSchema: {
      type: 'object',
      properties: {
        dictionaryKey: { type: 'string' },
      },
      required: ['dictionaryKey'],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, untrustedContentHint: true },
    execute: async ({ dictionaryKey }: GetDictionaryInput, options) => {
      if (!session?.project) {
        return 'No project is selected; use `selectProject` first.';
      }

      const response = await dictionaryAPI.getDictionary(
        dictionaryKey,
        undefined,
        { signal: options?.signal }
      );

      if (!response.data) {
        return `No dictionary "${dictionaryKey}" in the selected project.`;
      }

      return {
        key: response.data.key,
        title: response.data.title,
        description: response.data.description,
        tags: response.data.tags,
        editorPath: `${App_Dashboard_Dictionaries_Path}/${response.data.key}`,
        content: response.data.content,
      };
    },
  };

  return [
    getSession,
    navigateToPage,
    openAuthentication,
    signOut,
    listProjects,
    selectProjectTool,
    listDictionaries,
    getDictionary,
  ];
};
