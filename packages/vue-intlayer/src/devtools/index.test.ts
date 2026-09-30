import { getEditorAPI } from '@intlayer/api/editor';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Locale } from '@intlayer/types/allLocales';
import type { Dictionary } from '@intlayer/types/dictionary';
import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp, nextTick, ref } from 'vue';
import { createIntlayerClient } from '../client/installIntlayer';
import { setLocaleInStorage } from '../client/useLocaleStorage';
import {
  buildLocalesInspectorNode,
  CURRENT_LOCALE_NODE_ID_SUFFIX,
  LOCALE_NODE_ID_PREFIX,
  LOCALES_GROUP_NODE_ID,
} from './buildLocalesInspectorNode';
import {
  EDITOR_OFFLINE_NODE_ID,
  enableIntlayerDevtools,
  INTLAYER_DEVTOOLS_PLUGIN_ID,
  INTLAYER_DICTIONARIES_INSPECTOR_ID,
} from './index';

vi.mock('@vue/devtools-api', () => ({
  setupDevtoolsPlugin: vi.fn(),
}));

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: vi.fn(),
}));

vi.mock('@intlayer/config/built', () => ({
  internationalization: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
}));

vi.mock('@intlayer/api/editor', () => ({
  getEditorAPI: vi.fn(),
}));

vi.mock('../client/installIntlayer', () => ({
  createIntlayerClient: vi.fn(),
}));

vi.mock('../client/useLocaleStorage', () => ({
  setLocaleInStorage: vi.fn(),
}));

const setupDevtoolsPluginMock = vi.mocked(setupDevtoolsPlugin);
const getDictionariesMock = vi.mocked(getDictionaries);
const getEditorAPIMock = vi.mocked(getEditorAPI);
const createIntlayerClientMock = vi.mocked(createIntlayerClient);
const setLocaleInStorageMock = vi.mocked(setLocaleInStorage);
const getEditorDictionariesMock = vi.fn();
const writeDictionaryMock = vi.fn();
const clientLocale = ref('en');
const setLocaleMock = vi.fn((locale: string) => {
  clientLocale.value = locale;
});

type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  tags?: { label: string; textColor: number; backgroundColor: number }[];
};
type TreePayload = { inspectorId: string; rootNodes: TreeNode[] };
type StateEntry = { key: string; value: unknown; editable: boolean };
type StatePayload = {
  inspectorId: string;
  nodeId: string;
  state: Record<string, StateEntry[]>;
};
type EditPayload = {
  inspectorId: string;
  nodeId: string;
  path: string[];
  state: { value?: unknown; newKey?: string | null; remove?: boolean };
};
type InspectorOptions = {
  id: string;
  label: string;
  nodeActions?: {
    icon: string;
    tooltip?: string;
    action: (nodeId: string) => void;
  }[];
};

const fakeDictionary = {
  key: 'app-content',
  title: 'App content',
  description: 'Content of the app',
  content: {
    title: {
      nodeType: 'translation',
      translation: { en: 'Hello', fr: 'Bonjour' },
    },
  },
} as unknown as Dictionary;

const fakeDeclaration = {
  key: 'app-content',
  title: 'App content',
  description: 'Content of the app',
  localId: 'app-content::local::src/app.content.ts',
  filePath: 'src/app.content.ts',
  content: {
    title: {
      nodeType: 'translation',
      translation: { en: 'Hello', fr: 'Bonjour' },
    },
    note: 'Plain note',
    intro: { nodeType: 'markdown', markdown: 'Hello **World**!' },
  },
} as unknown as Dictionary;

const editableTag = {
  label: 'editable',
  textColor: 0xffffff,
  backgroundColor: 0x42b883,
};

const offlineNode = {
  id: EDITOR_OFFLINE_NODE_ID,
  label: 'Enable live editing (editor server)',
};

/**
 * Run `enableIntlayerDevtools` and capture the handlers registered on the
 * mocked devtools API.
 */
const setupDevtools = (currentLocale = 'en') => {
  clientLocale.value = currentLocale;
  createIntlayerClientMock.mockReturnValue({
    locale: clientLocale,
    setLocale: setLocaleMock,
    isCookieEnabled: true,
  } as never);

  enableIntlayerDevtools(createApp({}));

  const registrationCall = setupDevtoolsPluginMock.mock.calls[0];

  if (!registrationCall) {
    throw new Error('setupDevtoolsPlugin was not called');
  }

  const [descriptor, setupCallback] = registrationCall;

  let treeHandler: (payload: TreePayload) => Promise<void> = async () => {};
  let stateHandler: (payload: StatePayload) => Promise<void> = async () => {};
  let editHandler: (payload: EditPayload) => Promise<void> = async () => {};
  const addInspector = vi.fn();
  const sendInspectorTree = vi.fn();
  const sendInspectorState = vi.fn();

  setupCallback({
    addInspector,
    sendInspectorTree,
    sendInspectorState,
    on: {
      getInspectorTree: vi.fn(
        (handler: (payload: TreePayload) => Promise<void>) => {
          treeHandler = handler;
        }
      ),
      getInspectorState: vi.fn(
        (handler: (payload: StatePayload) => Promise<void>) => {
          stateHandler = handler;
        }
      ),
      editInspectorState: vi.fn(
        (handler: (payload: EditPayload) => Promise<void>) => {
          editHandler = handler;
        }
      ),
    },
  } as never);

  const inspectorOptions = addInspector.mock.calls[0]?.[0] as InspectorOptions;

  return {
    descriptor,
    addInspector,
    inspectorOptions,
    treeHandler,
    stateHandler,
    editHandler,
    sendInspectorTree,
    sendInspectorState,
  };
};

const buildTreePayload = (): TreePayload => ({
  inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
  rootNodes: [],
});

const buildStatePayload = (nodeId: string): StatePayload => ({
  inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
  nodeId,
  state: {},
});

const buildEditPayload = (
  nodeId: string,
  path: string[],
  value: unknown
): EditPayload => ({
  inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
  nodeId,
  path,
  state: { value, newKey: null },
});

describe('enableIntlayerDevtools', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Editor server unreachable by default: the inspector stays read-only
    getEditorDictionariesMock.mockRejectedValue(
      new Error('connect ECONNREFUSED')
    );
    getEditorAPIMock.mockReturnValue({
      getDictionaries: getEditorDictionariesMock,
      writeDictionary: writeDictionaryMock,
    } as never);
  });

  it('registers the plugin and the dictionaries inspector', () => {
    const { descriptor, addInspector } = setupDevtools();

    expect(descriptor.id).toBe(INTLAYER_DEVTOOLS_PLUGIN_ID);
    expect(descriptor.label).toBe('Intlayer');
    expect(addInspector).toHaveBeenCalledWith(
      expect.objectContaining({
        id: INTLAYER_DICTIONARIES_INSPECTOR_ID,
        label: 'Intlayer',
      })
    );
  });

  it('lists one root node per loaded dictionary', async () => {
    getDictionariesMock.mockReturnValue({
      'app-content': fakeDictionary,
      'other-dictionary': { ...fakeDictionary, key: 'other-dictionary' },
    });

    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    await treeHandler(payload);

    expect(payload.rootNodes).toEqual([
      { id: 'app-content', label: 'app-content' },
      { id: 'other-dictionary', label: 'other-dictionary' },
      offlineNode,
      buildLocalesInspectorNode('en' as Locale),
    ]);
  });

  it('shows a hint node when no dictionary is loaded', async () => {
    getDictionariesMock.mockReturnValue({});

    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    await treeHandler(payload);

    expect(payload.rootNodes).toHaveLength(3);
    expect(payload.rootNodes[0]?.label).toContain('No dictionaries loaded');
    expect(payload.rootNodes[1]?.id).toBe(EDITOR_OFFLINE_NODE_ID);
    expect(payload.rootNodes[2]?.id).toBe(LOCALES_GROUP_NODE_ID);
  });

  it('explains how to enable live editing on the offline node', async () => {
    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload(EDITOR_OFFLINE_NODE_ID);

    await stateHandler(payload);

    expect(payload.state['Live editing']?.map((entry) => entry.value)).toEqual([
      'Intlayer editor server not detected',
      'Set `editor.enabled: true` in intlayer.config, run ' +
        '`npx intlayer editor start`, then reopen this panel',
      'Edits are written back to your .content source files',
    ]);
  });

  it('ignores tree requests from other inspectors', async () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { treeHandler } = setupDevtools();
    const payload: TreePayload = {
      inspectorId: 'other-inspector',
      rootNodes: [{ id: 'existing', label: 'existing' }],
    };

    await treeHandler(payload);

    expect(payload.rootNodes).toEqual([{ id: 'existing', label: 'existing' }]);
  });

  it('exposes flattened translations and metadata as read-only state', async () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload('app-content');

    await stateHandler(payload);

    expect(payload.state.Translations).toEqual([
      {
        key: 'title',
        value: { en: 'Hello', fr: 'Bonjour' },
        editable: false,
      },
    ]);
    expect(payload.state.Metadata).toEqual([
      { key: 'key', value: 'app-content', editable: false },
      { key: 'title', value: 'App content', editable: false },
      { key: 'description', value: 'Content of the app', editable: false },
    ]);
  });

  it('returns an empty state for an unknown dictionary node', async () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload('unknown');

    await stateHandler(payload);

    expect(payload.state).toEqual({});
  });

  it('lists a child node per available locale under the Locales group', async () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { treeHandler } = setupDevtools('fr');
    const payload = buildTreePayload();

    await treeHandler(payload);

    const localesNode = payload.rootNodes.find(
      (node) => node.id === LOCALES_GROUP_NODE_ID
    );

    // The current locale is listed first so the moved tag forces a re-render,
    // and its node id carries the `:current` suffix so devtools frontends
    // caching the tree by node id invalidate the affected rows
    expect(localesNode?.label).toBe('Locales');
    expect(localesNode?.children).toEqual([
      {
        id: `${LOCALE_NODE_ID_PREFIX}fr${CURRENT_LOCALE_NODE_ID_SUFFIX}`,
        label: 'fr',
        tags: [
          { label: 'current', textColor: 0xffffff, backgroundColor: 0x42b883 },
        ],
      },
      { id: `${LOCALE_NODE_ID_PREFIX}en`, label: 'en', tags: [] },
      { id: `${LOCALE_NODE_ID_PREFIX}es`, label: 'es', tags: [] },
    ]);
  });

  it('exposes the locale availability as state of the Locales group', async () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(LOCALES_GROUP_NODE_ID);

    await stateHandler(payload);

    expect(payload.state).toEqual({
      Locales: [
        { key: 'en', value: '', editable: false },
        { key: 'fr', value: 'current', editable: false },
        { key: 'es', value: '', editable: false },
      ],
    });
  });

  it('exposes the locale details as state of a locale node', async () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(`${LOCALE_NODE_ID_PREFIX}fr`);

    await stateHandler(payload);

    expect(payload.state).toEqual({
      Locale: [
        { key: 'locale', value: 'fr', editable: false },
        { key: 'current', value: true, editable: false },
      ],
    });
  });

  it('parses the locale from a node id carrying the current suffix', async () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(
      `${LOCALE_NODE_ID_PREFIX}fr${CURRENT_LOCALE_NODE_ID_SUFFIX}`
    );

    await stateHandler(payload);

    expect(payload.state).toEqual({
      Locale: [
        { key: 'locale', value: 'fr', editable: false },
        { key: 'current', value: true, editable: false },
      ],
    });
  });

  it('switches and persists the locale from the node action', () => {
    const { inspectorOptions, sendInspectorTree, sendInspectorState } =
      setupDevtools();

    const nodeAction = inspectorOptions.nodeActions?.[0];

    expect(nodeAction?.icon).toBe('check');
    expect(nodeAction?.tooltip).toBe('Set as current locale');

    nodeAction?.action(`${LOCALE_NODE_ID_PREFIX}fr`);

    expect(setLocaleMock).toHaveBeenCalledWith('fr');
    expect(setLocaleInStorageMock).toHaveBeenCalledWith('fr', true);
    expect(sendInspectorTree).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );
    expect(sendInspectorState).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );
  });

  it('switches the locale when the node id carries the current suffix', () => {
    const { inspectorOptions } = setupDevtools('fr');

    // The current row's id carries `:current`; clicking its action again must
    // still resolve to the right locale
    inspectorOptions.nodeActions?.[0]?.action(
      `${LOCALE_NODE_ID_PREFIX}fr${CURRENT_LOCALE_NODE_ID_SUFFIX}`
    );

    expect(setLocaleMock).toHaveBeenCalledWith('fr');
    expect(setLocaleInStorageMock).toHaveBeenCalledWith('fr', true);
  });

  it('ignores the node action on non-locale nodes', () => {
    const { inspectorOptions, sendInspectorTree, sendInspectorState } =
      setupDevtools();

    inspectorOptions.nodeActions?.[0]?.action('app-content');

    expect(setLocaleMock).not.toHaveBeenCalled();
    expect(setLocaleInStorageMock).not.toHaveBeenCalled();
    expect(sendInspectorTree).not.toHaveBeenCalled();
    expect(sendInspectorState).not.toHaveBeenCalled();
  });

  it('rejects the node action for an unavailable locale', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { inspectorOptions, sendInspectorTree, sendInspectorState } =
      setupDevtools();

    inspectorOptions.nodeActions?.[0]?.action(`${LOCALE_NODE_ID_PREFIX}de`);

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(setLocaleMock).not.toHaveBeenCalled();
    expect(setLocaleInStorageMock).not.toHaveBeenCalled();
    expect(sendInspectorTree).not.toHaveBeenCalled();
    expect(sendInspectorState).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('moves the current tag when the tree is refetched after a switch', async () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { inspectorOptions, treeHandler } = setupDevtools();

    const initialPayload = buildTreePayload();
    await treeHandler(initialPayload);

    const initialLocalesNode = initialPayload.rootNodes.find(
      (node) => node.id === LOCALES_GROUP_NODE_ID
    );
    expect(initialLocalesNode?.children?.[0]?.id).toBe(
      `${LOCALE_NODE_ID_PREFIX}en${CURRENT_LOCALE_NODE_ID_SUFFIX}`
    );

    inspectorOptions.nodeActions?.[0]?.action(`${LOCALE_NODE_ID_PREFIX}fr`);

    // Simulate the devtools backend refetching the tree on sendInspectorTree
    const refreshedPayload = buildTreePayload();
    await treeHandler(refreshedPayload);

    const refreshedLocalesNode = refreshedPayload.rootNodes.find(
      (node) => node.id === LOCALES_GROUP_NODE_ID
    );

    expect(refreshedLocalesNode?.children).toEqual([
      {
        id: `${LOCALE_NODE_ID_PREFIX}fr${CURRENT_LOCALE_NODE_ID_SUFFIX}`,
        label: 'fr',
        tags: [
          { label: 'current', textColor: 0xffffff, backgroundColor: 0x42b883 },
        ],
      },
      { id: `${LOCALE_NODE_ID_PREFIX}en`, label: 'en', tags: [] },
      { id: `${LOCALE_NODE_ID_PREFIX}es`, label: 'es', tags: [] },
    ]);
  });

  it('refreshes the inspector when the locale changes outside devtools', async () => {
    const { sendInspectorTree, sendInspectorState } = setupDevtools();

    sendInspectorTree.mockClear();
    sendInspectorState.mockClear();

    createIntlayerClientMock().setLocale('es');
    await nextTick();

    expect(sendInspectorTree).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );
    expect(sendInspectorState).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );
  });
});

describe('enableIntlayerDevtools with the editor server online', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getEditorDictionariesMock.mockResolvedValue({
      'app-content': [fakeDeclaration],
    });
    getEditorAPIMock.mockReturnValue({
      getDictionaries: getEditorDictionariesMock,
      writeDictionary: writeDictionaryMock,
    } as never);
  });

  it('lists one editable node per unmerged declaration', async () => {
    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    await treeHandler(payload);

    expect(payload.rootNodes).toEqual([
      {
        id: 'app-content::local::src/app.content.ts',
        label: 'app-content',
        tags: [editableTag],
      },
      buildLocalesInspectorNode('en' as Locale),
    ]);
  });

  it('labels the declarations of a same key with their locale', async () => {
    getEditorDictionariesMock.mockResolvedValue({
      'app-content': [
        {
          ...fakeDeclaration,
          localId: 'app-content::local::src/app.en.content.ts',
          filePath: 'src/app.en.content.ts',
          locale: 'en',
        },
        {
          ...fakeDeclaration,
          localId: 'app-content::local::src/app.fr.content.ts',
          filePath: 'src/app.fr.content.ts',
          locale: 'fr',
        },
      ],
    });

    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    await treeHandler(payload);

    expect(payload.rootNodes.map((node) => node.label)).toEqual([
      'app-content (en)',
      'app-content (fr)',
      'Locales',
    ]);
  });

  it('flags only plain-text rows as editable', async () => {
    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload('app-content::local::src/app.content.ts');

    await stateHandler(payload);

    expect(payload.state.Translations).toEqual([
      {
        key: 'title',
        value: { en: 'Hello', fr: 'Bonjour' },
        editable: true,
      },
      { key: 'note', value: 'Plain note', editable: true },
      { key: 'intro', value: 'Hello **World**!', editable: false },
    ]);
    expect(payload.state.Metadata).toEqual([
      { key: 'key', value: 'app-content', editable: false },
      { key: 'title', value: 'App content', editable: false },
      { key: 'description', value: 'Content of the app', editable: false },
      { key: 'file', value: 'src/app.content.ts', editable: false },
    ]);
  });

  it('writes a translation edit back through the editor server', async () => {
    writeDictionaryMock.mockResolvedValue({ data: { status: 'updated' } });

    const { editHandler, sendInspectorState } = setupDevtools();

    await editHandler(
      buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['title', 'fr'],
        'Salut'
      )
    );

    expect(writeDictionaryMock).toHaveBeenCalledTimes(1);

    const writtenDictionary = writeDictionaryMock.mock.calls[0]?.[0]
      .dictionary as Dictionary;
    const writtenContent = writtenDictionary.content as Record<string, any>;

    expect(writtenDictionary.localId).toBe(
      'app-content::local::src/app.content.ts'
    );
    expect(writtenDictionary.filePath).toBe('src/app.content.ts');
    expect(writtenContent.title.translation).toEqual({
      en: 'Hello',
      fr: 'Salut',
    });
    expect(sendInspectorState).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );
  });

  it('writes a plain string edit back through the editor server', async () => {
    writeDictionaryMock.mockResolvedValue({ data: { status: 'updated' } });

    const { editHandler } = setupDevtools();

    await editHandler(
      buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['note'],
        'Edited note'
      )
    );

    const writtenDictionary = writeDictionaryMock.mock.calls[0]?.[0]
      .dictionary as Dictionary;
    const writtenContent = writtenDictionary.content as Record<string, any>;

    expect(writtenContent.note).toBe('Edited note');
  });

  it('keeps showing the written value while the server regenerates', async () => {
    // The server keeps answering the pre-edit content until its file watcher
    // regenerates the unmerged dictionaries; the written declaration shadows
    // it in the meantime
    writeDictionaryMock.mockResolvedValue({ data: { status: 'updated' } });

    const { editHandler, stateHandler } = setupDevtools();

    await editHandler(
      buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['title', 'en'],
        'Hi there'
      )
    );

    const payload = buildStatePayload('app-content::local::src/app.content.ts');
    await stateHandler(payload);

    expect(payload.state.Translations?.[0]).toEqual({
      key: 'title',
      value: { en: 'Hi there', fr: 'Bonjour' },
      editable: true,
    });
  });

  it('ignores edits on non-editable rows', async () => {
    const { editHandler } = setupDevtools();

    await editHandler(
      buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['intro'],
        'nope'
      )
    );

    expect(writeDictionaryMock).not.toHaveBeenCalled();
  });

  it('ignores edits for unknown nodes and removals', async () => {
    const { editHandler } = setupDevtools();

    await editHandler(buildEditPayload('unknown-node', ['title', 'en'], 'x'));
    await editHandler({
      ...buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['title', 'en'],
        undefined
      ),
      state: { remove: true },
    });

    expect(writeDictionaryMock).not.toHaveBeenCalled();
  });

  it('still resends the state when the write fails', async () => {
    writeDictionaryMock.mockRejectedValue(new Error('write failed'));
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const { editHandler, sendInspectorState } = setupDevtools();

    await editHandler(
      buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['title', 'fr'],
        'Salut'
      )
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(sendInspectorState).toHaveBeenCalledWith(
      INTLAYER_DICTIONARIES_INSPECTOR_ID
    );

    consoleErrorSpy.mockRestore();
  });

  it('ignores edits targeting other inspectors', async () => {
    const { editHandler } = setupDevtools();

    await editHandler({
      ...buildEditPayload(
        'app-content::local::src/app.content.ts',
        ['title', 'fr'],
        'Salut'
      ),
      inspectorId: 'other-inspector',
    });

    expect(writeDictionaryMock).not.toHaveBeenCalled();
  });
});

describe('enableIntlayerDevtools editor server recovery', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getEditorAPIMock.mockReturnValue({
      getDictionaries: getEditorDictionariesMock,
      writeDictionary: writeDictionaryMock,
    } as never);
  });

  it('switches to editable declarations when the server comes online', async () => {
    getEditorDictionariesMock.mockRejectedValue(
      new Error('connect ECONNREFUSED')
    );
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { treeHandler } = setupDevtools();

    const offlinePayload = buildTreePayload();
    await treeHandler(offlinePayload);

    expect(offlinePayload.rootNodes.map((node) => node.id)).toEqual([
      'app-content',
      EDITOR_OFFLINE_NODE_ID,
      LOCALES_GROUP_NODE_ID,
    ]);

    // The server starts; the next tree fetch picks the declarations up
    getEditorDictionariesMock.mockResolvedValue({
      'app-content': [fakeDeclaration],
    });

    const onlinePayload = buildTreePayload();
    await treeHandler(onlinePayload);

    expect(onlinePayload.rootNodes.map((node) => node.id)).toEqual([
      'app-content::local::src/app.content.ts',
      LOCALES_GROUP_NODE_ID,
    ]);
  });
});
