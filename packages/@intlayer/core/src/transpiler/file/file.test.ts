import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NodeType } from '../../types';
import { file } from './file';

// Mock the injected variables
declare global {
  var intlayer_file_path: string;
  var intlayer_file_dir: string;
}

// Mock fs functions
vi.mock('node:fs', () => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

// Mock the config
vi.mock('@intlayer/config', () => ({
  getAppLogger: vi.fn(() => vi.fn()),
  colorizePath: vi.fn((path) => path),
}));

vi.mock('@intlayer/config/built', () => ({
  default: {
    content: {
      baseDir: '/test/base',
    },
  },
}));

describe('file function', () => {
  const mockExistsSync = vi.mocked(existsSync);
  const mockReadFileSync = vi.mocked(readFileSync);

  beforeEach(() => {
    vi.clearAllMocks();
    // Set default mock values
    global.intlayer_file_path = '/test/source/file.ts';
    global.intlayer_file_dir = '/test/source';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create a FileContent object with correct structure', () => {
    const testPath = 'test-file.md';
    const testContent = 'Hello, World!';

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(result).toEqual({
      nodeType: NodeType.File,
      file: testPath,
      content: testContent,
      fixedPath: expect.any(String),
    });
  });

  it('should handle relative paths correctly', () => {
    const testPath = './test-file.md';
    const testContent = 'Relative file content';
    const resolvedPath = resolve('/test/source', testPath);

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(mockExistsSync).toHaveBeenCalledWith(resolvedPath);
    expect(mockReadFileSync).toHaveBeenCalledWith(resolvedPath, 'utf8');
    expect(result.content).toBe(testContent);
  });

  it('should handle absolute paths with warning', () => {
    const testPath = '/absolute/path/test-file.md';
    const testContent = 'Absolute file content';

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(result.file).toBe(testPath);
    expect(result.content).toBe(testContent);
  });

  it('should handle non-relative paths (resolved from process.cwd)', () => {
    const testPath = 'test-file.md';
    const testContent = 'Non-relative file content';
    const resolvedPath = resolve(process.cwd(), testPath);

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(mockExistsSync).toHaveBeenCalledWith(resolvedPath);
    expect(result.content).toBe(testContent);
  });

  it('should handle file not found scenario', () => {
    const testPath = 'non-existent-file.md';
    const resolvedPath = resolve('/test/source', testPath);

    mockExistsSync.mockReturnValue(false);

    const result = file(testPath);

    expect(result.content).toBe('File not found');
    expect(result.file).toBe(testPath);
  });

  it('should set fixedPath correctly', () => {
    const testPath = 'test-file.md';
    const testContent = 'Test content';
    const resolvedPath = resolve('/test/source', testPath);

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(result.fixedPath).toBeDefined();
    expect(typeof result.fixedPath).toBe('string');
  });

  it('should work when intlayer_file_dir is undefined', () => {
    global.intlayer_file_dir = undefined as any;
    const testPath = 'test-file.md';
    const testContent = 'Test content';
    const resolvedPath = resolve(process.cwd(), testPath);

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(result.content).toBe(testContent);
  });

  it('should handle nested relative paths', () => {
    const testPath = '../parent/test-file.md';
    const testContent = 'Nested file content';
    const resolvedPath = resolve('/test/source', testPath);

    mockExistsSync.mockReturnValue(true);
    mockReadFileSync.mockReturnValue(testContent);

    const result = file(testPath);

    expect(mockExistsSync).toHaveBeenCalledWith(resolvedPath);
    expect(result.content).toBe(testContent);
  });
});
