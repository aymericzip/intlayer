import type {
  RouteDefinition,
  RouteGroup,
} from '@intlayer/backend-contract/defineRoute';
import { environmentContract } from '@intlayer/backend-contract/environment';
import { projectContract } from '@intlayer/backend-contract/project';
import { showcaseProjectContract } from '@intlayer/backend-contract/showcaseProject';
import { tagContract } from '@intlayer/backend-contract/tag';
import {
  type ContractHandlers,
  registerContractRoutes,
} from '@utils/contract/registerContractRoutes';
import {
  openAPIRoutePrefix,
  registerOpenAPI,
} from '@utils/contract/registerOpenAPI';
import Fastify, { type FastifyInstance } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const validProjectId = '0123456789abcdef01234567';

/** Handlers echoing what Fastify handed them after validation, plus the route name. */
const createEchoHandlers = <Routes extends Record<string, RouteDefinition>>(
  group: RouteGroup<string, Routes>
) =>
  Object.fromEntries(
    Object.keys(group.routes).map((name) => [
      name,
      async (
        request: { body: unknown; params: unknown; query: unknown },
        reply: { send: (payload: unknown) => void }
      ) => {
        reply.send({
          success: true,
          status: 200,
          data: {
            route: name,
            body: request.body,
            params: request.params,
            query: request.query,
          },
        });
      },
    ])
  ) as unknown as ContractHandlers<Routes>;

const registerEchoGroup = async <
  Routes extends Record<string, RouteDefinition>,
>(
  app: FastifyInstance,
  group: RouteGroup<string, Routes>
) =>
  app.register(
    async (scope) =>
      registerContractRoutes(scope, group, createEchoHandlers(group)),
    { prefix: group.prefix }
  );

describe('registerContractRoutes', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = Fastify();
    await registerOpenAPI(app);
    await registerEchoGroup(app, projectContract);
    await registerEchoGroup(app, environmentContract);
    await registerEchoGroup(app, tagContract);
    await registerEchoGroup(app, showcaseProjectContract);
    // A legacy route still described with plain JSON Schema
    app.get(
      '/legacy/:id',
      {
        schema: {
          params: {
            type: 'object',
            required: ['id'],
            properties: { id: { type: 'string' } },
          },
        },
      },
      async () => ({ ok: true })
    );
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('rejects an invalid path param with a 400', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: '/api/project/not-an-id',
    });

    expect(response.statusCode).toBe(400);
  });

  it('accepts a valid path param', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: `/api/project/${validProjectId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.params).toEqual({ projectId: validProjectId });
  });

  it('rejects an invalid body with the backend error envelope', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/project/webhook',
      payload: { webhookIndex: 'first' },
    });
    const payload = response.json();

    expect(response.statusCode).toBe(400);
    expect(payload.success).toBe(false);
    expect(payload.error.code).toBe('INVALID_REQUEST_BODY');
  });

  it('keeps unknown keys of loose bodies', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: '/api/project/configuration',
      payload: { internationalization: { requiredLocales: ['en'] } },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.body).toEqual({
      internationalization: { requiredLocales: ['en'] },
    });
  });

  it('parses the access key expiry into a Date', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/project/access_key',
      payload: {
        name: 'CI',
        grants: ['dictionary:read'],
        expiresAt: '2030-01-01T00:00:00.000Z',
      },
    });

    expect(response.statusCode).toBe(200);
    // The Date serializes back to its ISO string
    expect(response.json().data.body.expiresAt).toBe(
      '2030-01-01T00:00:00.000Z'
    );
  });

  it('never alters a response that drifts from its schema', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/project/ci',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data).toHaveProperty('query');
  });

  it('strips ownership fields from a new tag', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/tag',
      payload: {
        key: 'marketing',
        projectId: validProjectId,
        organizationId: validProjectId,
        creatorId: validProjectId,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.body).toEqual({ key: 'marketing' });
  });

  it('routes the production selection before the environment id param', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: '/api/project/environment/production/select',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().data.route).toBe('resetToProductionEnvironment');
  });

  it('validates showcase submissions in the contract', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/showcase-project/submit',
      payload: { name: 'Site', url: 'https://github.com/owner/repo' },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe('INVALID_REQUEST_BODY');
  });

  it('normalizes the showcase GitHub URL', async () => {
    const response = await app.inject({
      method: 'PATCH',
      url: `/api/showcase-project/${validProjectId}`,
      payload: { githubUrl: 'github.com/owner/repo' },
    });

    expect(response.json().data.body.githubUrl).toBe(
      'https://github.com/owner/repo'
    );
  });

  it('leaves routes with a null entry unregistered', async () => {
    const scopedApp = Fastify();
    await scopedApp.register(
      async (scope) =>
        registerContractRoutes(scope, tagContract, {
          ...createEchoHandlers(tagContract),
          deleteTag: null,
        }),
      { prefix: tagContract.prefix }
    );

    const response = await scopedApp.inject({
      method: 'DELETE',
      url: `/api/tag/${validProjectId}`,
    });

    expect(response.statusCode).toBe(404);
    await scopedApp.close();
  });

  it('documents contract and legacy routes in the OpenAPI document', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `${openAPIRoutePrefix}/json`,
    });
    const document = response.json();

    expect(response.statusCode).toBe(200);
    expect(document.openapi).toBe('3.1.0');
    expect(document.paths['/api/project/{projectId}'].put.operationId).toBe(
      'selectProject'
    );
    expect(
      document.paths['/api/project/webhook'].post.requestBody.content[
        'application/json'
      ].schema.properties.webhookIndex.type
    ).toBe('integer');
    expect(document.paths['/legacy/{id}'].get.parameters[0].name).toBe('id');
  });
});
