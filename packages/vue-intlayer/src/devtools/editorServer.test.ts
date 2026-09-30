import { getEditorAPI } from '@intlayer/api/editor';
import type { Dictionary } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

  afterEach(() => {
    vi.useRealTimers();
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

  it('shadows the fetched declaration with the written one until the server catches up', async () => {
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('Old note')],
    });

    const session = createEditorServerSession();
    const writtenDeclaration = buildDeclaration('New note');

    await session.writeDictionary(writtenDeclaration);

    expect(writeDictionaryMock).toHaveBeenCalledWith({
      dictionary: writtenDeclaration,
    });

    // The server still serves the pre-edit content: the written
    // declaration shadows it so the panel does not revert.
    const shadowed = await session.fetchUnmergedDictionaries();
    expect(shadowed?.['app-content']?.[0]?.content).toEqual({
      note: 'New note',
    });

    // Once the regenerated files serve the written content, the shadow is
    // dropped and the server content is returned as-is.
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('New note')],
    });

    const caughtUp = await session.fetchUnmergedDictionaries();
    expect(caughtUp?.['app-content']?.[0]?.content).toEqual({
      note: 'New note',
    });
  });

  it('lets the shadow expire so an external edit cannot stay hidden forever', async () => {
    vi.useFakeTimers();
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('Old note')],
    });

    const session = createEditorServerSession();

    await session.writeDictionary(buildDeclaration('New note'));

    // The user then edits the source file by hand: the server content
    // diverges from both the pre-edit and the written content.
    getDictionariesMock.mockResolvedValue({
      'app-content': [buildDeclaration('External edit')],
    });

    const shadowed = await session.fetchUnmergedDictionaries();
    expect(shadowed?.['app-content']?.[0]?.content).toEqual({
      note: 'New note',
    });

    vi.advanceTimersByTime(60_000);

    const expired = await session.fetchUnmergedDictionaries();
    expect(expired?.['app-content']?.[0]?.content).toEqual({
      note: 'External edit',
    });
  });
});
