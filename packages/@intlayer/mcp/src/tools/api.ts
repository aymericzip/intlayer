import { getConfiguration } from '@intlayer/config';
import { getIntlayerAPI } from '@intlayer/api';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';

type LoadAPITools = (server: McpServer) => void;

const authSchema = {
  clientId: z
    .string()
    .optional()
    .describe(
      'Intlayer OAuth2 client ID (access key). Falls back to INTLAYER_CLIENT_ID env var.'
    ),
  clientSecret: z
    .string()
    .optional()
    .describe(
      'Intlayer OAuth2 client secret. Falls back to INTLAYER_CLIENT_SECRET env var.'
    ),
};

const getAPI = async (clientId?: string, clientSecret?: string) => {
  const config = getConfiguration();
  const resolvedClientId = clientId ?? config.editor.clientId;
  const resolvedClientSecret = clientSecret ?? config.editor.clientSecret;

  if (!resolvedClientId || !resolvedClientSecret) {
    throw new Error(
      'Intlayer credentials not found. Provide clientId/clientSecret or set INTLAYER_CLIENT_ID/INTLAYER_CLIENT_SECRET.'
    );
  }

  const configWithCreds = {
    ...config,
    editor: { ...config.editor, clientId: resolvedClientId, clientSecret: resolvedClientSecret },
  };

  const tempAPI = getIntlayerAPI({}, configWithCreds);
  const tokenResult = await tempAPI.oAuth.getOAuth2AccessToken();
  const token = (tokenResult as any)?.data?.access_token as string | undefined;

  if (!token) {
    throw new Error('Failed to obtain OAuth2 access token. Check your credentials.');
  }

  return getIntlayerAPI(
    { headers: { Authorization: `Bearer ${token}` } },
    config
  );
};

const ok = (data: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
});

const fail = (label: string, error: unknown) => ({
  content: [
    {
      type: 'text' as const,
      text: `${label} failed: ${error instanceof Error ? error.message : String(error)}`,
    },
  ],
  isError: true as const,
});

export const loadAPITools: LoadAPITools = (server) => {
  // ── Dictionaries ──────────────────────────────────────────────────────────

  server.registerTool(
    'intlayer-dictionaries-list',
    {
      title: 'List Dictionaries',
      description:
        'List all dictionaries for the selected project. Returns keys, IDs, and metadata.',
      inputSchema: {
        ...authSchema,
        page: z.number().optional().describe('Page number (1-based)'),
        pageSize: z.number().optional().describe('Items per page'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ clientId, clientSecret, page, pageSize }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.dictionary.getDictionaries({ page, pageSize } as any);
        return ok(result);
      } catch (error) {
        return fail('List dictionaries', error);
      }
    }
  );

  server.registerTool(
    'intlayer-dictionary-get',
    {
      title: 'Get Dictionary',
      description: 'Get a dictionary by its key, including its full content.',
      inputSchema: {
        ...authSchema,
        dictionaryKey: z.string().describe('The dictionary key'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ clientId, clientSecret, dictionaryKey }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.dictionary.getDictionary(dictionaryKey);
        return ok(result);
      } catch (error) {
        return fail('Get dictionary', error);
      }
    }
  );

  server.registerTool(
    'intlayer-dictionary-create',
    {
      title: 'Create Dictionary',
      description: 'Create a new dictionary in the selected project.',
      inputSchema: {
        ...authSchema,
        key: z.string().describe('Unique key for the dictionary'),
        title: z.string().optional().describe('Human-readable title'),
        description: z.string().optional().describe('Description of the dictionary'),
        content: z.record(z.unknown()).optional().describe('Initial content as JSON object'),
      },
      annotations: { destructiveHint: false },
    },
    async ({ clientId, clientSecret, key, title, description, content }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.dictionary.addDictionary({ key, title, description, content } as any);
        return ok(result);
      } catch (error) {
        return fail('Create dictionary', error);
      }
    }
  );

  server.registerTool(
    'intlayer-dictionary-update',
    {
      title: 'Update Dictionary',
      description: 'Update an existing dictionary content or metadata.',
      inputSchema: {
        ...authSchema,
        id: z.string().describe('Dictionary ID'),
        key: z.string().optional().describe('New key for the dictionary'),
        title: z.string().optional().describe('New title'),
        description: z.string().optional().describe('New description'),
        content: z.record(z.unknown()).optional().describe('Updated content as JSON object'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, id, key, title, description, content }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.dictionary.updateDictionary({ id, key, title, description, content } as any);
        return ok(result);
      } catch (error) {
        return fail('Update dictionary', error);
      }
    }
  );

  server.registerTool(
    'intlayer-dictionary-delete',
    {
      title: 'Delete Dictionary',
      description: 'Delete a dictionary by its ID. This action is irreversible.',
      inputSchema: {
        ...authSchema,
        dictionaryId: z.string().describe('Dictionary ID to delete'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, dictionaryId }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.dictionary.deleteDictionary(dictionaryId);
        return ok(result);
      } catch (error) {
        return fail('Delete dictionary', error);
      }
    }
  );

  // ── Tags ──────────────────────────────────────────────────────────────────

  server.registerTool(
    'intlayer-tags-list',
    {
      title: 'List Tags',
      description: 'List all tags for the selected organization.',
      inputSchema: {
        ...authSchema,
        page: z.number().optional().describe('Page number (1-based)'),
        pageSize: z.number().optional().describe('Items per page'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ clientId, clientSecret, page, pageSize }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.tag.getTags({ page, pageSize } as any);
        return ok(result);
      } catch (error) {
        return fail('List tags', error);
      }
    }
  );

  server.registerTool(
    'intlayer-tag-create',
    {
      title: 'Create Tag',
      description:
        'Create a new tag in the organization. Tags can be used to group dictionaries and provide AI context.',
      inputSchema: {
        ...authSchema,
        key: z.string().describe('Unique tag key'),
        name: z.string().optional().describe('Display name for the tag'),
        description: z.string().optional().describe('Description of the tag'),
        color: z.string().optional().describe('Tag color (hex code)'),
        instructions: z.string().optional().describe('AI instructions to apply when this tag is used'),
      },
      annotations: { destructiveHint: false },
    },
    async ({ clientId, clientSecret, key, name, description, color, instructions }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.tag.addTag({ key, name, description, color, instructions } as any);
        return ok(result);
      } catch (error) {
        return fail('Create tag', error);
      }
    }
  );

  server.registerTool(
    'intlayer-tag-update',
    {
      title: 'Update Tag',
      description: 'Update an existing tag.',
      inputSchema: {
        ...authSchema,
        tagId: z.string().describe('Tag ID to update'),
        key: z.string().optional().describe('New key'),
        name: z.string().optional().describe('New display name'),
        description: z.string().optional().describe('New description'),
        color: z.string().optional().describe('New color (hex code)'),
        instructions: z.string().optional().describe('New AI instructions'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, tagId, key, name, description, color, instructions }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.tag.updateTag(tagId, { key, name, description, color, instructions } as any);
        return ok(result);
      } catch (error) {
        return fail('Update tag', error);
      }
    }
  );

  server.registerTool(
    'intlayer-tag-delete',
    {
      title: 'Delete Tag',
      description: 'Delete a tag by its ID.',
      inputSchema: {
        ...authSchema,
        tagId: z.string().describe('Tag ID to delete'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, tagId }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.tag.deleteTag(tagId);
        return ok(result);
      } catch (error) {
        return fail('Delete tag', error);
      }
    }
  );

  // ── Organizations ─────────────────────────────────────────────────────────

  server.registerTool(
    'intlayer-organizations-list',
    {
      title: 'List Organizations',
      description: 'List all organizations the authenticated user belongs to.',
      inputSchema: {
        ...authSchema,
        page: z.number().optional().describe('Page number (1-based)'),
        pageSize: z.number().optional().describe('Items per page'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ clientId, clientSecret, page, pageSize }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.organization.getOrganizations({ page, pageSize } as any);
        return ok(result);
      } catch (error) {
        return fail('List organizations', error);
      }
    }
  );

  server.registerTool(
    'intlayer-organization-select',
    {
      title: 'Select Organization',
      description:
        'Select an organization as the current active organization. Required before accessing organization-specific resources.',
      inputSchema: {
        ...authSchema,
        organizationId: z.string().describe('Organization ID to select'),
      },
      annotations: { destructiveHint: false },
    },
    async ({ clientId, clientSecret, organizationId }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.organization.selectOrganization(organizationId);
        return ok(result);
      } catch (error) {
        return fail('Select organization', error);
      }
    }
  );

  server.registerTool(
    'intlayer-organization-update',
    {
      title: 'Update Organization',
      description: 'Update the selected organization name or settings.',
      inputSchema: {
        ...authSchema,
        name: z.string().optional().describe('New organization name'),
        customInstructions: z.string().optional().describe('Custom AI instructions for this organization'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, name, customInstructions }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.organization.updateOrganization({ name, customInstructions } as any);
        return ok(result);
      } catch (error) {
        return fail('Update organization', error);
      }
    }
  );

  // ── Projects ──────────────────────────────────────────────────────────────

  server.registerTool(
    'intlayer-cms-projects-list',
    {
      title: 'List CMS Projects',
      description:
        'List all Intlayer CMS projects for the selected organization. These are server-side projects, not local project directories.',
      inputSchema: {
        ...authSchema,
        page: z.number().optional().describe('Page number (1-based)'),
        pageSize: z.number().optional().describe('Items per page'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ clientId, clientSecret, page, pageSize }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.project.getProjects({ page, pageSize } as any);
        return ok(result);
      } catch (error) {
        return fail('List CMS projects', error);
      }
    }
  );

  server.registerTool(
    'intlayer-cms-project-select',
    {
      title: 'Select CMS Project',
      description:
        'Select a CMS project as the current active project. Required before accessing project-specific dictionaries.',
      inputSchema: {
        ...authSchema,
        projectId: z.string().describe('Project ID to select'),
      },
      annotations: { destructiveHint: false },
    },
    async ({ clientId, clientSecret, projectId }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.project.selectProject(projectId);
        return ok(result);
      } catch (error) {
        return fail('Select CMS project', error);
      }
    }
  );

  server.registerTool(
    'intlayer-cms-project-create',
    {
      title: 'Create CMS Project',
      description: 'Create a new CMS project in the selected organization.',
      inputSchema: {
        ...authSchema,
        name: z.string().describe('Project name'),
      },
      annotations: { destructiveHint: false },
    },
    async ({ clientId, clientSecret, name }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.project.addProject({ name } as any);
        return ok(result);
      } catch (error) {
        return fail('Create CMS project', error);
      }
    }
  );

  server.registerTool(
    'intlayer-cms-project-update',
    {
      title: 'Update CMS Project',
      description: 'Update the selected CMS project settings.',
      inputSchema: {
        ...authSchema,
        name: z.string().optional().describe('New project name'),
      },
      annotations: { destructiveHint: true },
    },
    async ({ clientId, clientSecret, name }) => {
      try {
        const api = await getAPI(clientId, clientSecret);
        const result = await api.project.updateProject({ name } as any);
        return ok(result);
      } catch (error) {
        return fail('Update CMS project', error);
      }
    }
  );
};
