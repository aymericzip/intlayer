/**
 * @vitest-environment node
 */

import type { Context } from 'node:vm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LoadEnvFileOptions } from './loadEnvFile';
import { parseFileContent } from './loadExternalFile';

// Mock the vm module to control context execution
let mockContext: Context | null = null;
vi.mock('node:vm', () => ({
  runInNewContext: vi.fn((_code: string, context: Context) => {
    // Store the context so we can modify it in tests
    mockContext = context;
  }),
}));

// Mock getSandBoxContext to return a controllable context
vi.mock('./getSandboxContext', () => ({
  getSandBoxContext: vi.fn(() => mockContext),
}));

vi.mock('./logger', () => ({ logger: vi.fn() }));

describe('parseFileContent', () => {
  const mockProjectRequire = vi.fn() as unknown as NodeJS.Require;
  const mockEnvVarOptions: LoadEnvFileOptions = {
    env: 'test',
    envFile: '.env.test',
  };
  const mockAdditionalEnvVars = {
    TEST_VAR: 'test_value',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockContext = null;
  });

  describe('ES Module exports (exports.default)', () => {
    it('should return content from exports.default when it has keys', () => {
      const fileContent = 'export default { key: "value" }';
      mockContext = {
        exports: {
          default: { key: 'value' },
        },
        module: {
          exports: {},
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ key: 'value' });
    });

    it('should skip exports.default when it is empty', () => {
      const fileContent = 'module.exports = { key: "value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: { key: 'value' },
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('CommonJS exports (module.exports.defaults)', () => {
    it('should return content from module.exports.defaults when it has keys', () => {
      const fileContent = 'module.exports.defaults = { key: "value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: {
            defaults: { key: 'value' },
          },
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('CommonJS exports (module.exports.default)', () => {
    it('should return content from module.exports.default when it has keys', () => {
      const fileContent = 'module.exports.default = { key: "value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: {
            default: { key: 'value' },
          },
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ key: 'value' });
    });

    it('should skip module.exports.default when it is empty', () => {
      const fileContent = 'module.exports = { key: "value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: {
            default: {},
            key: 'value',
          },
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ default: {}, key: 'value' });
    });
  });

  describe('CommonJS exports (module.exports)', () => {
    it('should return content from module.exports when it has keys', () => {
      const fileContent = 'module.exports = { key: "value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: { key: 'value' },
        },
      } as unknown as Context;

      const result = parseFileContent(
        fileContent,
        mockProjectRequire,
        mockEnvVarOptions,
        mockAdditionalEnvVars
      );

      expect(result).toEqual({ key: 'value' });
    });
  });

  describe('Priority order', () => {
    it('should prioritize exports.default over module.exports.defaults', () => {
      const fileContent = 'export default { key: "es_module_value" }';
      mockContext = {
        exports: {
          default: { key: 'es_module_value' },
        },
        module: {
          exports: {
            defaults: { key: 'cjs_defaults_value' },
          },
        },
      } as unknown as Context;

      const result = parseFileContent(fileContent, mockProjectRequire);

      expect(result).toEqual({ key: 'es_module_value' });
    });

    it('should prioritize module.exports.defaults over module.exports.default', () => {
      const fileContent = 'module.exports.defaults = { key: "defaults_value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: {
            defaults: { key: 'defaults_value' },
            default: { key: 'default_value' },
          },
        },
      } as unknown as Context;

      const result = parseFileContent(fileContent, mockProjectRequire);

      expect(result).toEqual({ key: 'defaults_value' });
    });

    it('should prioritize module.exports.default over module.exports', () => {
      const fileContent = 'module.exports.default = { key: "default_value" }';
      mockContext = {
        exports: {
          default: {},
        },
        module: {
          exports: {
            default: { key: 'default_value' },
            key: 'exports_value',
          },
        },
      } as unknown as Context;

      const result = parseFileContent(fileContent, mockProjectRequire);

      expect(result).toEqual({ key: 'default_value' });
    });
  });
});
