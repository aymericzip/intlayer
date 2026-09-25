import * as recast from 'recast';
import { babelTsParser } from '../../../utils/babelParser';
import {
  ensureNamedImport,
  isModuleScopeBinding,
} from '../../utils/astImports';

const { namedTypes: n } = recast.types;

/** Local name the injected middleware / plugin factory is bound to. */
const MIDDLEWARE_IDENTIFIER = 'intlayer';

/** babel-ts parser handles TypeScript *and* plain JavaScript. */
const parseCode = (code: string): any =>
  recast.parse(code, { parser: babelTsParser });

/** Parses a single statement. */
const parseStatement = (code: string): any => parseCode(code).program.body[0];

/** Result of a backend transform. `code` is unchanged for any non-`registered` status. */
export type BackendTransformResult = {
  code: string;
  status: 'registered' | 'already' | 'skipped';
};

/** How a server framework exposes its app factory. */
type FactoryImport = {
  /** Module the factory is imported from, e.g. `express`. */
  source: string;
  /** Accepted forms: the default export, and/or these named exports. */
  default?: boolean;
  named?: string[];
};

/** Whether `node` is a `require("<source>")` call. */
const isRequireOf = (node: any, source: string): boolean =>
  node?.type === 'CallExpression' &&
  node.callee?.type === 'Identifier' &&
  node.callee.name === 'require' &&
  node.arguments[0]?.value === source;

/**
 * Resolves the local names a factory is bound to at module scope, from ESM
 * imports (`import express from "express"`, `import { Hono } from "hono"`) or
 * CommonJS requires (`const express = require("express")`,
 * `const { Hono } = require("hono")`).
 */
const findFactoryLocalNames = (ast: any, factory: FactoryImport): string[] => {
  const localNames: string[] = [];
  const acceptsNamed = (name: string): boolean =>
    factory.named?.includes(name) ?? false;

  for (const statement of ast.program.body) {
    if (
      statement.type === 'ImportDeclaration' &&
      statement.source.value === factory.source
    ) {
      for (const specifier of statement.specifiers) {
        const isAcceptedDefault =
          specifier.type === 'ImportDefaultSpecifier' && factory.default;
        const isAcceptedNamed =
          specifier.type === 'ImportSpecifier' &&
          acceptsNamed(specifier.imported.name);
        if (isAcceptedDefault || isAcceptedNamed) {
          localNames.push(specifier.local.name);
        }
      }
    }

    if (statement.type !== 'VariableDeclaration') continue;

    for (const declarator of statement.declarations) {
      if (!isRequireOf(declarator.init, factory.source)) continue;

      if (declarator.id.type === 'Identifier' && factory.default) {
        localNames.push(declarator.id.name);
      }
      if (declarator.id.type === 'ObjectPattern') {
        for (const property of declarator.id.properties) {
          if (
            property.key?.type === 'Identifier' &&
            property.value?.type === 'Identifier' &&
            acceptsNamed(property.key.name)
          ) {
            localNames.push(property.value.name);
          }
        }
      }
    }
  }

  return localNames;
};

/** Whether the module uses CommonJS (`require`) rather than ESM imports. */
const isCommonJsModule = (ast: any): boolean =>
  !ast.program.body.some(
    (statement: any) =>
      statement.type === 'ImportDeclaration' ||
      statement.type === 'ExportNamedDeclaration' ||
      statement.type === 'ExportDefaultDeclaration'
  ) &&
  ast.program.body.some(
    (statement: any) =>
      statement.type === 'VariableDeclaration' &&
      statement.declarations.some(
        (declarator: any) =>
          declarator.init?.type === 'CallExpression' &&
          declarator.init.callee?.name === 'require'
      )
  );

/**
 * Binds `intlayer` from `source`: an ESM named import, or — in a CommonJS
 * module — `const { intlayer } = require("<source>");` placed after the last
 * top-level `require`.
 */
const ensureMiddlewareBinding = (ast: any, source: string): void => {
  if (!isCommonJsModule(ast)) {
    ensureNamedImport(ast, MIDDLEWARE_IDENTIFIER, source);
    return;
  }

  const body = ast.program.body;
  let insertIndex = 0;
  body.forEach((statement: any, index: number) => {
    const isRequireDeclaration =
      statement.type === 'VariableDeclaration' &&
      statement.declarations.some(
        (declarator: any) => declarator.init?.callee?.name === 'require'
      );
    if (isRequireDeclaration) insertIndex = index + 1;
  });

  body.splice(
    insertIndex,
    0,
    parseStatement(`const { ${MIDDLEWARE_IDENTIFIER} } = require("${source}");`)
  );
};

/**
 * Finds the first `const <app> = <init>` whose initializer matches, returning
 * the app identifier and the statement path to insert after. `export const`
 * declarations resolve to the export statement.
 */
const findAppDeclaration = (
  ast: any,
  matchesInit: (init: any) => boolean
): { appName: string; statementPath: any } | null => {
  let found: { appName: string; statementPath: any } | null = null;

  recast.visit(ast, {
    visitVariableDeclarator(path) {
      const { id, init } = path.node as any;
      if (!found && id.type === 'Identifier' && init && matchesInit(init)) {
        let statementPath = path.parent;
        if (statementPath.parent?.node.type === 'ExportNamedDeclaration') {
          statementPath = statementPath.parent;
        }
        found = { appName: id.name, statementPath };
        return false;
      }
      this.traverse(path);
    },
  });

  return found;
};

/** Whether `node` calls one of `calleeNames` directly (`express()`, `new Hono()`). */
const isFactoryCall = (
  node: any,
  calleeNames: string[],
  type: 'CallExpression' | 'NewExpression'
): boolean =>
  node?.type === type &&
  node.callee?.type === 'Identifier' &&
  calleeNames.includes(node.callee.name);

/**
 * Shared flow of the "declare the app, then register the middleware on the
 * next line" frameworks (Express, Fastify, Hono, NestJS).
 */
const registerAfterAppDeclaration = (
  code: string,
  {
    middlewareSource,
    findDeclaration,
    buildRegistration,
  }: {
    middlewareSource: string;
    findDeclaration: (ast: any) => ReturnType<typeof findAppDeclaration>;
    buildRegistration: (appName: string) => string;
  }
): BackendTransformResult => {
  if (code.includes(middlewareSource)) return { code, status: 'already' };

  const ast = parseCode(code);
  if (isModuleScopeBinding(ast, MIDDLEWARE_IDENTIFIER)) {
    return { code, status: 'skipped' };
  }

  const declaration = findDeclaration(ast);
  if (!declaration) return { code, status: 'skipped' };

  declaration.statementPath.insertAfter(
    parseStatement(buildRegistration(declaration.appName))
  );
  ensureMiddlewareBinding(ast, middlewareSource);

  return { code: recast.print(ast).code, status: 'registered' };
};

/**
 * Registers `express-intlayer` right after `const app = express()`:
 * `app.use(intlayer());`.
 */
export const registerExpressMiddleware = (
  code: string
): BackendTransformResult =>
  registerAfterAppDeclaration(code, {
    middlewareSource: 'express-intlayer',
    findDeclaration: (ast) => {
      const factoryNames = findFactoryLocalNames(ast, {
        source: 'express',
        default: true,
      });
      return findAppDeclaration(ast, (init) =>
        isFactoryCall(init, factoryNames, 'CallExpression')
      );
    },
    buildRegistration: (appName) => `${appName}.use(intlayer());`,
  });

/**
 * Registers `fastify-intlayer` right after `const app = Fastify()`:
 * `app.register(intlayer);`. Not awaited, so it also works in CommonJS and
 * non-async scopes — Fastify queues plugins until `ready`/`listen`.
 */
export const registerFastifyPlugin = (code: string): BackendTransformResult =>
  registerAfterAppDeclaration(code, {
    middlewareSource: 'fastify-intlayer',
    findDeclaration: (ast) => {
      const factoryNames = findFactoryLocalNames(ast, {
        source: 'fastify',
        default: true,
        named: ['fastify', 'Fastify'],
      });
      return findAppDeclaration(ast, (init) =>
        isFactoryCall(init, factoryNames, 'CallExpression')
      );
    },
    buildRegistration: (appName) => `${appName}.register(intlayer);`,
  });

/**
 * Registers `hono-intlayer` right after `const app = new Hono()`:
 * `app.use("*", intlayer());`. A chained declaration
 * (`new Hono().get(…)`) is skipped: its routes would be registered before the
 * middleware, which Hono runs in registration order.
 */
export const registerHonoMiddleware = (code: string): BackendTransformResult =>
  registerAfterAppDeclaration(code, {
    middlewareSource: 'hono-intlayer',
    findDeclaration: (ast) => {
      const factoryNames = findFactoryLocalNames(ast, {
        source: 'hono',
        named: ['Hono'],
      });
      return findAppDeclaration(ast, (init) =>
        isFactoryCall(init, factoryNames, 'NewExpression')
      );
    },
    buildRegistration: (appName) => `${appName}.use("*", intlayer());`,
  });

/**
 * Registers `express-intlayer` on a NestJS (Express platform) app right after
 * `const app = await NestFactory.create(…)`: `app.use(intlayer());`.
 */
export const registerNestJsMiddleware = (
  code: string
): BackendTransformResult =>
  registerAfterAppDeclaration(code, {
    middlewareSource: 'express-intlayer',
    findDeclaration: (ast) =>
      findAppDeclaration(ast, (init) => {
        const call = init.type === 'AwaitExpression' ? init.argument : init;
        return (
          n.CallExpression.check(call) &&
          n.MemberExpression.check(call.callee) &&
          (call.callee.object as any).name === 'NestFactory' &&
          (call.callee.property as any).name === 'create'
        );
      }),
    buildRegistration: (appName) => `${appName}.use(intlayer());`,
  });

/**
 * Registers `elysia-intlayer` directly on the app constructor:
 * `new Elysia()` → `new Elysia().use(intlayer())`. Works for chained
 * declarations too, and keeps the plugin ahead of every route.
 */
export const registerElysiaPlugin = (code: string): BackendTransformResult => {
  const middlewareSource = 'elysia-intlayer';
  if (code.includes(middlewareSource)) return { code, status: 'already' };

  const ast = parseCode(code);
  if (isModuleScopeBinding(ast, MIDDLEWARE_IDENTIFIER)) {
    return { code, status: 'skipped' };
  }

  const factoryNames = findFactoryLocalNames(ast, {
    source: 'elysia',
    named: ['Elysia'],
  });

  let registered = false;
  recast.visit(ast, {
    visitNewExpression(path) {
      if (registered) return false;
      if (isFactoryCall(path.node, factoryNames, 'NewExpression')) {
        const withPlugin = parseStatement(
          '__app__.use(intlayer());'
        ).expression;
        withPlugin.callee.object = path.node;
        path.replace(withPlugin);
        registered = true;
        return false;
      }
      this.traverse(path);
    },
  });

  if (!registered) return { code, status: 'skipped' };

  ensureMiddlewareBinding(ast, middlewareSource);

  return { code: recast.print(ast).code, status: 'registered' };
};
