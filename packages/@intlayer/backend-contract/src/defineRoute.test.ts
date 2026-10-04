import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { z } from 'zod/mini';
import { buildRouteURL, type RouteGroup } from './defineRoute';
import { projectContract } from './project';

const backendURL = 'https://back.example.org';
const { routes } = projectContract;

describe('buildRouteURL', () => {
  it('maps the root path to the bare prefix', () => {
    expect(buildRouteURL(backendURL, projectContract, routes.getProjects)).toBe(
      'https://back.example.org/api/project'
    );
  });

  it('appends static paths', () => {
    expect(
      buildRouteURL(backendURL, projectContract, routes.addNewAccessKey)
    ).toBe('https://back.example.org/api/project/access_key');
  });

  it('replaces and encodes path params', () => {
    expect(
      buildRouteURL(backendURL, projectContract, routes.updateMemberAccess, {
        userId: 'a/b',
      })
    ).toBe('https://back.example.org/api/project/member/a%2Fb/access');
  });

  it('throws when a path param is missing', () => {
    expect(() =>
      buildRouteURL(
        backendURL,
        projectContract,
        routes.selectProject,
        {} as { projectId: string }
      )
    ).toThrow('Missing route param "projectId"');
  });
});

describe('projectContract schemas', () => {
  it('rejects a malformed project id', () => {
    const result = z.safeParse(routes.selectProject.schemas.params, {
      projectId: 'not-an-id',
    });

    expect(result.success).toBe(false);
  });

  it('keeps unknown configuration keys pushed by the CLI', () => {
    const result = z.safeParse(routes.pushProjectConfiguration.schemas.body, {
      internationalization: { locales: ['en', 'fr'], requiredLocales: ['en'] },
    });

    expect(result.data?.internationalization).toEqual({
      locales: ['en', 'fr'],
      requiredLocales: ['en'],
    });
  });

  it('rejects a negative webhook index', () => {
    const result = z.safeParse(routes.triggerWebhook.schemas.body, {
      webhookIndex: -1,
    });

    expect(result.success).toBe(false);
  });

  it('converts every route schema to JSON Schema for OpenAPI', async () => {
    // Every domain file of the package (there is no barrel to import)
    const domainFileNames = readdirSync(new URL('.', import.meta.url)).filter(
      (fileName) => fileName.endsWith('.ts') && !fileName.endsWith('.test.ts')
    );
    const domainModules = await Promise.all(
      domainFileNames.map(
        (fileName) =>
          import(`./${fileName}`) as Promise<Record<string, unknown>>
      )
    );
    const allRoutes = domainModules
      .flatMap((domainModule) => Object.entries(domainModule))
      .filter(([name]) => name.endsWith('Contract'))
      .flatMap(([, group]) => Object.values((group as RouteGroup).routes));

    expect(allRoutes.length).toBeGreaterThan(0);

    for (const route of allRoutes) {
      const { response, ...requestSchemas } = route.schemas;

      // Swagger documents requests as input and responses as output
      for (const schema of Object.values(requestSchemas)) {
        if (!schema) continue;
        expect(() =>
          z.toJSONSchema(schema, { io: 'input', unrepresentable: 'any' })
        ).not.toThrow();
      }
      for (const schema of Object.values(response ?? {})) {
        if (!schema) continue;
        expect(() =>
          z.toJSONSchema(schema, { io: 'output', unrepresentable: 'any' })
        ).not.toThrow();
      }
    }
  });
});

describe('updateProject body', () => {
  const schema = routes.updateProject.schemas.body;

  it('strips membership and ownership fields', () => {
    const result = z.safeParse(schema, {
      id: 'project-id',
      name: 'Renamed',
      adminsIds: ['attacker'],
      membersIds: [],
      viewersIds: [],
      creatorId: 'attacker',
      memberAccess: [],
      environments: [],
    });

    expect(result.data).toEqual({ name: 'Renamed' });
  });

  it('accepts a repository disconnection', () => {
    const result = z.safeParse(schema, { repository: null });

    expect(result.data).toEqual({ repository: null });
  });

  it('keeps the stored id of webhooks', () => {
    const webhook = { _id: 'webhook-id', name: 'Vercel', url: 'https://x.y' };
    const result = z.safeParse(schema, {
      webhooks: { autoTriggerBuilds: true, webhooks: [webhook] },
    });

    expect(result.data?.webhooks?.webhooks).toEqual([webhook]);
  });
});
