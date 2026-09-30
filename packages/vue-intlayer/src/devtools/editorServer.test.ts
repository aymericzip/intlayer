import { getEditorAPI } from '@intlayer/api/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createEditorServerSession } from './editorServer';

vi.mock('@intlayer/api/editor', () => ({
  getEditorAPI: vi.fn(),
}));

const getEditorAPIMock = vi.mocked(getEditorAPI);
const getDictionariesMock = vi.fn();
const writeDictionaryMock = vi.fn();

const buildDeclaration = (note: string): Dictionary =>
  ({
    key: 'app-content',
    localId: 'app-content::local::src/app.content.ts',
    filePath: 'src/app.content.ts',
    content: { note },
  }) as unknown as Dictionary;

describe('createEditorServerSession', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getEditorAPIMock.mockReturnValue({
      getDictionaries: getDictionariesMock,
      writeDictionary: writeDictionaryMock,
    } as unknown as ReturnType<typeof getEditorAPI>);
  });

  it('returns null and reports offline when the server is unreachable', async () => {
    getDictionariesMock.mockRejectedValue(new Error('fetch failed'));

    const session = createEditorServerSession();

    expect(await session.fetchUnmergedDictionaries()).toBeNull();
    expect(session.isOnline()).toBe(false);
  });

  it('reports online once the server answers', async () => {
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('Note')],
    });

    const session = createEditorServerSession();
    const result = await session.fetchUnmergedDictionaries();

    expect(session.isOnline()).toBe(true);
    expect(result?.['app-content']?.[0]?.content).toEqual({ note: 'Note' });
  });

  it('requests the editor API without credentials (CORS `*` server)', () => {
    createEditorServerSession();

    expect(getEditorAPIMock).toHaveBeenCalledWith({ credentials: 'omit' });
  });

  it('writes the declaration through the editor API', async () => {
    const session = createEditorServerSession();
    const writtenDeclaration = buildDeclaration('New note');

    await session.writeDictionary(writtenDeclaration);

    expect(writeDictionaryMock).toHaveBeenCalledWith({
      dictionary: writtenDeclaration,
    });
  });

  it('returns the server content as-is after a write', async () => {
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('External edit')],
    });

    const session = createEditorServerSession();

    await session.writeDictionary(buildDeclaration('New note'));

    const result = await session.fetchUnmergedDictionaries();
    expect(result?.['app-content']?.[0]?.content).toEqual({
      note: 'External edit',
    });
  });
});
