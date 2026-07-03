import type { Tool } from '@intlayer/ai';
import { jsonSchema, tool } from '@intlayer/ai';
import * as dictionaryService from '@services/dictionary.service';
import * as organizationService from '@services/organization.service';
import * as projectService from '@services/project.service';
import * as tagService from '@services/tag.service';
import * as userService from '@services/user.service';
import { hasPermission, type Roles } from '@utils/permissions';
import { Types } from 'mongoose';

export type ClientAction =
  | { type: 'navigate'; path: string }
  | { type: 'invalidate_queries' }
  | { type: 'select_organization'; organizationId: string }
  | { type: 'unselect_organization' }
  | { type: 'select_project'; projectId: string }
  | { type: 'unselect_project' };

type SessionContext = {
  projectId?: string;
  organizationId?: string;
  userId?: string;
  roles?: Roles[];
  session?: any;
  onAction?: (action: ClientAction) => void;
};

const paginationSchema = jsonSchema<{ page?: number; pageSize?: number }>({
  type: 'object',
  properties: {
    page: { type: 'number', description: 'Page number (1-based)' },
    pageSize: { type: 'number', description: 'Items per page (default 20)' },
  },
});

export const createSessionTools = ({
  projectId,
  organizationId,
  userId,
  onAction,
  roles,
  session,
}: SessionContext): Record<string, Tool<any, any>> => ({
  // ---- DICTIONARY READ TOOLS ----

  list_dictionaries: tool({
    description:
      'List all dictionaries in the current project. Returns keys, IDs, titles, and metadata.',
    inputSchema: paginationSchema,
    execute: async (params): Promise<string> => {
      const page = params.page ?? 1;
      const pageSize = params.pageSize ?? 20;

      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'dictionary:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      const skip = (page - 1) * pageSize;
      const [dictionaries, total] = await Promise.all([
        dictionaryService.findDictionaries(
          { projectIds: [projectId] } as any,
          skip,
          pageSize,
          undefined,
          false
        ),
        dictionaryService.countDictionaries({ projectIds: [projectId] } as any),
      ]);

      return JSON.stringify({
        data: dictionaries.map((dictionary) => ({
          id: dictionary.id,
          key: dictionary.key,
          title: dictionary.title,
          description: dictionary.description,
        })),
        total,
        page,
        pageSize,
      });
    },
  }),

  get_dictionary: tool({
    description: 'Get a dictionary by its key, including its full content.',
    inputSchema: jsonSchema<{ key: string }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The dictionary key' },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'dictionary:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const dictionary = await dictionaryService.getDictionaryByKey(
          params.key,
          projectId
        );

        if (!dictionary)
          return JSON.stringify({
            error: `Dictionary "${params.key}" not found`,
          });

        return JSON.stringify({
          id: dictionary.id,
          key: dictionary.key,
          title: dictionary.title,
          description: dictionary.description,
          content: dictionary.content,
        });
      } catch {
        return JSON.stringify({
          error: `Dictionary "${params.key}" not found`,
        });
      }
    },
  }),

  // ---- DICTIONARY WRITE TOOLS ----

  create_dictionary: tool({
    description: 'Create a new dictionary in the current project.',
    inputSchema: jsonSchema<{
      key: string;
      title?: string;
      description?: string;
      content?: Record<string, unknown>;
    }>({
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Unique key identifying this dictionary',
        },
        title: { type: 'string', description: 'Human-readable title' },
        description: {
          type: 'string',
          description: 'Purpose of the dictionary',
        },
        content: {
          type: 'object',
          description: 'Initial content of the dictionary',
        },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });
      if (!userId)
        return JSON.stringify({ error: 'No user authenticated in session' });

      if (!hasPermission(roles || [], 'dictionary:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const dictionary = await dictionaryService.createDictionary({
          key: params.key,
          projectIds: [new Types.ObjectId(projectId)],
          title: params.title,
          description: params.description,
          content: params.content as any,
          creatorId: new Types.ObjectId(userId),
        });

        return JSON.stringify({
          id: dictionary.id,
          key: dictionary.key,
          title: dictionary.title,
          description: dictionary.description,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  update_dictionary: tool({
    description: 'Update an existing dictionary by its key.',
    inputSchema: jsonSchema<{
      key: string;
      title?: string;
      description?: string;
      content?: Record<string, unknown>;
      tags?: string[];
    }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The dictionary key to update' },
        title: { type: 'string', description: 'New title' },
        description: { type: 'string', description: 'New description' },
        content: { type: 'object', description: 'New content object' },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tag IDs to associate with this dictionary',
        },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'dictionary:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const { key, ...updates } = params;
        const dictionary = await dictionaryService.updateDictionaryByKey(
          key,
          updates as any,
          projectId
        );

        return JSON.stringify({
          id: dictionary.id,
          key: dictionary.key,
          title: dictionary.title,
          description: dictionary.description,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  delete_dictionary: tool({
    description: 'Delete a dictionary by its key.',
    inputSchema: jsonSchema<{ key: string }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The dictionary key to delete' },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'dictionary:admin')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const dictionary = await dictionaryService.getDictionaryByKey(
          params.key,
          projectId
        );

        if (!dictionary)
          return JSON.stringify({
            error: `Dictionary "${params.key}" not found`,
          });

        await dictionaryService.deleteDictionaryById(String(dictionary.id));
        return JSON.stringify({ success: true, key: params.key });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  // ---- PROJECT TOOLS ----

  get_project: tool({
    description: 'Get details of the current project.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'project:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const project = await projectService.getProjectById(projectId);
        return JSON.stringify({
          id: project.id,
          name: project.name,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  list_projects: tool({
    description: 'List all projects in the current organization.',
    inputSchema: paginationSchema,
    execute: async (params): Promise<string> => {
      const page = params.page ?? 1;
      const pageSize = params.pageSize ?? 20;

      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'project:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      const skip = (page - 1) * pageSize;
      const projects = await projectService.findProjects(
        { organizationId } as any,
        skip,
        pageSize
      );

      return JSON.stringify({
        data: projects.map((project) => ({
          id: project.id,
          name: project.name,
        })),
        page,
        pageSize,
      });
    },
  }),

  update_project: tool({
    description: 'Update the current project.',
    inputSchema: jsonSchema<{ name?: string }>({
      type: 'object',
      properties: {
        name: { type: 'string', description: 'New project name' },
      },
    }),
    execute: async (params): Promise<string> => {
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });

      if (!hasPermission(roles || [], 'project:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const project = await projectService.updateProjectById(
          projectId,
          params as any
        );
        return JSON.stringify({ id: project.id, name: project.name });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  select_project: tool({
    description:
      'Select a project by ID to set it as the active project for the session. Subsequent tools will operate on this project.',
    inputSchema: jsonSchema<{ projectId: string }>({
      type: 'object',
      properties: {
        projectId: { type: 'string', description: 'The project ID to select' },
      },
      required: ['projectId'],
    }),
    execute: async (params): Promise<string> => {
      try {
        const project = await projectService.getProjectById(params.projectId);

        if (
          !hasPermission(
            roles || [],
            'project:read'
          )({
            ...session,
            targetProjects: [project],
          })
        ) {
          return JSON.stringify({ error: 'Permission denied' });
        }

        onAction?.({ type: 'select_project', projectId: params.projectId });
        return JSON.stringify({ success: true, projectId: params.projectId });
      } catch {
        return JSON.stringify({
          error: `Project "${params.projectId}" not found or access denied`,
        });
      }
    },
  }),

  unselect_project: tool({
    description: 'Clear the active project from the session.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      onAction?.({ type: 'unselect_project' });
      return JSON.stringify({ success: true });
    },
  }),

  // ---- ORGANIZATION TOOLS ----

  list_organizations: tool({
    description: 'List all organizations the current user is a member of.',
    inputSchema: paginationSchema,
    execute: async (params): Promise<string> => {
      const page = params.page ?? 1;
      const pageSize = params.pageSize ?? 20;

      if (!userId)
        return JSON.stringify({ error: 'No user authenticated in session' });

      const skip = (page - 1) * pageSize;
      const [organizations, total] = await Promise.all([
        organizationService.findOrganizations(
          { membersIds: { $in: [userId] } } as any,
          skip,
          pageSize
        ),
        organizationService.countOrganizations({
          membersIds: { $in: [userId] },
        } as any),
      ]);

      return JSON.stringify({
        data: organizations.map((org) => ({
          id: org.id,
          name: org.name,
        })),
        total,
        page,
        pageSize,
      });
    },
  }),

  select_organization: tool({
    description:
      'Select an organization by ID to set it as the active organization for the session. Subsequent tools will operate on this organization.',
    inputSchema: jsonSchema<{ organizationId: string }>({
      type: 'object',
      properties: {
        organizationId: {
          type: 'string',
          description: 'The organization ID to select',
        },
      },
      required: ['organizationId'],
    }),
    execute: async (params): Promise<string> => {
      try {
        const organization = await organizationService.getOrganizationById(
          params.organizationId
        );

        if (
          !hasPermission(
            roles || [],
            'organization:read'
          )({
            ...session,
            targetOrganizations: [organization],
          })
        ) {
          return JSON.stringify({ error: 'Permission denied' });
        }

        onAction?.({
          type: 'select_organization',
          organizationId: params.organizationId,
        });
        return JSON.stringify({
          success: true,
          organizationId: params.organizationId,
        });
      } catch {
        return JSON.stringify({
          error: `Organization "${params.organizationId}" not found or access denied`,
        });
      }
    },
  }),

  unselect_organization: tool({
    description: 'Clear the active organization from the session.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      onAction?.({ type: 'unselect_organization' });
      return JSON.stringify({ success: true });
    },
  }),

  get_organization: tool({
    description: 'Get details of the current organization.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'organization:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const organization =
          await organizationService.getOrganizationById(organizationId);
        return JSON.stringify({
          id: organization.id,
          name: organization.name,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  update_organization: tool({
    description: 'Update the current organization.',
    inputSchema: jsonSchema<{ name?: string }>({
      type: 'object',
      properties: {
        name: { type: 'string', description: 'New organization name' },
      },
    }),
    execute: async (params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'organization:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const organization = await organizationService.updateOrganizationById(
          organizationId,
          params as any
        );
        return JSON.stringify({ id: organization.id, name: organization.name });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  // ---- TAG TOOLS ----

  list_tags: tool({
    description:
      'List all tags in the current organization. Tags group dictionaries and provide AI context.',
    inputSchema: paginationSchema,
    execute: async (params): Promise<string> => {
      const page = params.page ?? 1;
      const pageSize = params.pageSize ?? 20;

      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'tag:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      const skip = (page - 1) * pageSize;
      const [tags, total] = await Promise.all([
        tagService.findTags({ organizationId } as any, skip, pageSize),
        tagService.countTags({ organizationId } as any),
      ]);

      return JSON.stringify({
        data: tags.map((tag) => ({
          id: tag.id,
          key: tag.key,
          name: tag.name,
          description: tag.description,
          instructions: tag.instructions,
        })),
        total,
        page,
        pageSize,
      });
    },
  }),

  get_tag: tool({
    description: 'Get a tag by its key.',
    inputSchema: jsonSchema<{ key: string }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The tag key' },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'tag:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const tags = await tagService.getTagsByKeys(
          [params.key],
          organizationId
        );

        if (!tags || tags.length === 0)
          return JSON.stringify({ error: `Tag "${params.key}" not found` });

        const tag = tags[0]!;
        return JSON.stringify({
          id: tag.id,
          key: tag.key,
          name: tag.name,
          description: tag.description,
          instructions: tag.instructions,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  create_tag: tool({
    description: 'Create a new tag in the current organization.',
    inputSchema: jsonSchema<{
      key: string;
      name?: string;
      description?: string;
      instructions?: string;
    }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'Unique key for the tag' },
        name: { type: 'string', description: 'Display name of the tag' },
        description: {
          type: 'string',
          description: 'What this tag represents',
        },
        instructions: {
          type: 'string',
          description: 'AI instructions associated with this tag',
        },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });
      if (!projectId)
        return JSON.stringify({ error: 'No project selected in session' });
      if (!userId)
        return JSON.stringify({ error: 'No user authenticated in session' });

      if (!hasPermission(roles || [], 'tag:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const tag = await tagService.createTag({
          key: params.key,
          name: params.name,
          description: params.description,
          instructions: params.instructions,
          organizationId: new Types.ObjectId(organizationId),
          projectId: new Types.ObjectId(projectId),
          creatorId: new Types.ObjectId(userId),
        });

        return JSON.stringify({
          id: tag.id,
          key: tag.key,
          name: tag.name,
          description: tag.description,
          instructions: tag.instructions,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  update_tag: tool({
    description: 'Update a tag by its key.',
    inputSchema: jsonSchema<{
      key: string;
      name?: string;
      description?: string;
      instructions?: string;
    }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The tag key to update' },
        name: { type: 'string', description: 'New display name' },
        description: { type: 'string', description: 'New description' },
        instructions: { type: 'string', description: 'New AI instructions' },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'tag:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const tags = await tagService.getTagsByKeys(
          [params.key],
          organizationId
        );

        if (!tags || tags.length === 0)
          return JSON.stringify({ error: `Tag "${params.key}" not found` });

        const { key: _key, ...updates } = params;
        const tag = await tagService.updateTagById(
          String(tags[0]!.id),
          updates as any
        );

        return JSON.stringify({
          id: tag.id,
          key: tag.key,
          name: tag.name,
          description: tag.description,
          instructions: tag.instructions,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  delete_tag: tool({
    description: 'Delete a tag by its key.',
    inputSchema: jsonSchema<{ key: string }>({
      type: 'object',
      properties: {
        key: { type: 'string', description: 'The tag key to delete' },
      },
      required: ['key'],
    }),
    execute: async (params): Promise<string> => {
      if (!organizationId)
        return JSON.stringify({ error: 'No organization selected in session' });

      if (!hasPermission(roles || [], 'tag:admin')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const tags = await tagService.getTagsByKeys(
          [params.key],
          organizationId
        );

        if (!tags || tags.length === 0)
          return JSON.stringify({ error: `Tag "${params.key}" not found` });

        await tagService.deleteTagById(String(tags[0]!.id));
        return JSON.stringify({ success: true, key: params.key });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  // ---- USER TOOLS ----

  get_user: tool({
    description: 'Get the current user profile.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      if (!userId) return JSON.stringify({ error: 'No user in session' });

      if (!hasPermission(roles || [], 'user:read')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const user = await userService.getUserById(userId);
        if (!user) return JSON.stringify({ error: 'User not found' });

        return JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  update_user: tool({
    description: 'Update the current user profile.',
    inputSchema: jsonSchema<{ name?: string }>({
      type: 'object',
      properties: {
        name: { type: 'string', description: 'New display name' },
      },
    }),
    execute: async (params): Promise<string> => {
      if (!userId) return JSON.stringify({ error: 'No user in session' });

      if (!hasPermission(roles || [], 'user:write')(session))
        return JSON.stringify({ error: 'Permission denied' });

      try {
        const user = await userService.updateUserById(userId, params as any);
        return JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      } catch (err) {
        return JSON.stringify({ error: String(err) });
      }
    },
  }),

  // ---- CLIENT NAVIGATION & DATA ACTIONS ----

  navigate_to: tool({
    description:
      'Navigate the user to a specific dashboard page. Use this after creating or updating a resource to bring the user to the relevant page (e.g. after creating a dictionary, navigate to /dictionaries/{key}).',
    inputSchema: jsonSchema<{ path: string }>({
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description:
            'The dashboard path to navigate to, e.g. /dictionaries/my-key, /tags/my-tag, /projects, /organizations',
        },
      },
      required: ['path'],
    }),
    execute: async (params): Promise<string> => {
      onAction?.({ type: 'navigate', path: params.path });
      return JSON.stringify({ success: true, path: params.path });
    },
  }),

  invalidate_queries: tool({
    description:
      'Invalidate cached data in the dashboard so the UI refetches fresh data from the server. Call this after any write operation (create, update, delete) so the user sees up-to-date information.',
    inputSchema: jsonSchema<Record<string, never>>({
      type: 'object',
      properties: {},
    }),
    execute: async (_params): Promise<string> => {
      onAction?.({ type: 'invalidate_queries' });
      return JSON.stringify({ success: true });
    },
  }),
});
