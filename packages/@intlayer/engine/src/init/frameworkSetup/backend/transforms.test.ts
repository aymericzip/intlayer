import { describe, expect, it } from 'vitest';
import {
  registerElysiaPlugin,
  registerExpressMiddleware,
  registerFastifyPlugin,
  registerHonoMiddleware,
  registerNestJsMiddleware,
} from './transforms';

describe('registerExpressMiddleware', () => {
  it('registers the middleware right after the app declaration (ESM)', () => {
    const { code, status } =
      registerExpressMiddleware(`import express from "express";

const app = express();

app.get("/", (req, res) => res.send("ok"));
`);

    expect(status).toBe('registered');
    expect(code).toContain('import { intlayer } from "express-intlayer";');
    expect(code.indexOf('app.use(intlayer());')).toBeLessThan(
      code.indexOf('app.get(')
    );
    expect(code.indexOf('const app = express();')).toBeLessThan(
      code.indexOf('app.use(intlayer());')
    );
  });

  it('uses require in a CommonJS module', () => {
    const { code, status } =
      registerExpressMiddleware(`const express = require("express");
const cors = require("cors");

const server = express();
server.listen(3000);
`);

    expect(status).toBe('registered');
    expect(code).toContain('const { intlayer } = require("express-intlayer");');
    expect(code).not.toContain('import {');
    expect(code).toContain('server.use(intlayer());');
    expect(code.indexOf('require("cors")')).toBeLessThan(
      code.indexOf('require("express-intlayer")')
    );
  });

  it('handles an exported app declaration', () => {
    const { code, status } =
      registerExpressMiddleware(`import express from "express";

export const app = express();
`);

    expect(status).toBe('registered');
    expect(code).toMatch(
      /export const app = express\(\);\s+app\.use\(intlayer\(\)\);/
    );
  });

  it('is idempotent', () => {
    const source = `import express from "express";
import { intlayer } from "express-intlayer";

const app = express();
app.use(intlayer());
`;
    expect(registerExpressMiddleware(source)).toEqual({
      code: source,
      status: 'already',
    });
  });

  it('skips a file that does not create an Express app', () => {
    const source = `import { Router } from "express";

export const router = Router();
`;
    expect(registerExpressMiddleware(source).status).toBe('skipped');
  });

  it('skips when `intlayer` is already bound', () => {
    const source = `import express from "express";
import { intlayer } from "./i18n";

const app = express();
`;
    expect(registerExpressMiddleware(source).status).toBe('skipped');
  });
});

describe('registerFastifyPlugin', () => {
  it('registers the plugin after `Fastify()`', () => {
    const { code, status } =
      registerFastifyPlugin(`import Fastify from "fastify";

const fastify = Fastify({ logger: true });

fastify.get("/", async () => ({ ok: true }));
`);

    expect(status).toBe('registered');
    expect(code).toContain('import { intlayer } from "fastify-intlayer";');
    expect(code.indexOf('fastify.register(intlayer);')).toBeLessThan(
      code.indexOf('fastify.get(')
    );
  });

  it('accepts the named `fastify` export', () => {
    const { code, status } =
      registerFastifyPlugin(`import { fastify } from "fastify";

const server = fastify();
`);

    expect(status).toBe('registered');
    expect(code).toContain('server.register(intlayer);');
  });
});

describe('registerHonoMiddleware', () => {
  it('registers the middleware after `new Hono()`', () => {
    const { code, status } =
      registerHonoMiddleware(`import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("ok"));

export default app;
`);

    expect(status).toBe('registered');
    expect(code).toContain('import { intlayer } from "hono-intlayer";');
    expect(code.indexOf('app.use("*", intlayer());')).toBeLessThan(
      code.indexOf('app.get(')
    );
  });

  it('skips a chained declaration whose routes would run first', () => {
    const source = `import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.text("ok"));
`;
    expect(registerHonoMiddleware(source).status).toBe('skipped');
  });
});

describe('registerElysiaPlugin', () => {
  it('chains the plugin right after the constructor', () => {
    const { code, status } =
      registerElysiaPlugin(`import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => "ok")
  .listen(3000);
`);

    expect(status).toBe('registered');
    expect(code).toContain('import { intlayer } from "elysia-intlayer";');
    expect(code).toContain('new Elysia().use(intlayer())');
    expect(code.indexOf('.use(intlayer())')).toBeLessThan(
      code.indexOf('.get(')
    );
  });

  it('skips a file without an Elysia app', () => {
    expect(registerElysiaPlugin('export const port = 3000;\n').status).toBe(
      'skipped'
    );
  });
});

describe('registerNestJsMiddleware', () => {
  it('registers the middleware after `NestFactory.create`', () => {
    const { code, status } =
      registerNestJsMiddleware(`import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
`);

    expect(status).toBe('registered');
    expect(code).toContain('import { intlayer } from "express-intlayer";');
    expect(code.indexOf('app.use(intlayer());')).toBeLessThan(
      code.indexOf('app.listen(')
    );
  });
});
