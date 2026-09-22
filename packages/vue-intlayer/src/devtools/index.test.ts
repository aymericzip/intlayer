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

vi.mock('../client/installIntlayer', () => ({
  createIntlayerClient: vi.fn(),
}));

vi.mock('../client/useLocaleStorage', () => ({
  setLocaleInStorage: vi.fn(),
}));

const setupDevtoolsPluginMock = vi.mocked(setupDevtoolsPlugin);
const getDictionariesMock = vi.mocked(getDictionaries);
const createIntlayerClientMock = vi.mocked(createIntlayerClient);
const setLocaleInStorageMock = vi.mocked(setLocaleInStorage);
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

  let treeHandler: (payload: TreePayload) => void = () => {};
  let stateHandler: (payload: StatePayload) => void = () => {};
  const addInspector = vi.fn();
  const sendInspectorTree = vi.fn();
  const sendInspectorState = vi.fn();

  setupCallback({
    addInspector,
    sendInspectorTree,
    sendInspectorState,
    on: {
      getInspectorTree: vi.fn((handler: (payload: TreePayload) => void) => {
        treeHandler = handler;
      }),
      getInspectorState: vi.fn((handler: (payload: StatePayload) => void) => {
        stateHandler = handler;
      }),
    },
  } as never);

  const inspectorOptions = addInspector.mock.calls[0]?.[0] as InspectorOptions;

  return {
    descriptor,
    addInspector,
    inspectorOptions,
    treeHandler,
    stateHandler,
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

describe('enableIntlayerDevtools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('lists one root node per loaded dictionary', () => {
    getDictionariesMock.mockReturnValue({
      'app-content': fakeDictionary,
      'other-dictionary': { ...fakeDictionary, key: 'other-dictionary' },
    });

    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    treeHandler(payload);

    expect(payload.rootNodes).toEqual([
      { id: 'app-content', label: 'app-content' },
      { id: 'other-dictionary', label: 'other-dictionary' },
      buildLocalesInspectorNode('en' as Locale),
    ]);
  });

  it('shows a hint node when no dictionary is loaded', () => {
    getDictionariesMock.mockReturnValue({});

    const { treeHandler } = setupDevtools();
    const payload = buildTreePayload();

    treeHandler(payload);

    expect(payload.rootNodes).toHaveLength(2);
    expect(payload.rootNodes[0]?.label).toContain('No dictionaries loaded');
    expect(payload.rootNodes[1]?.id).toBe(LOCALES_GROUP_NODE_ID);
  });

  it('ignores tree requests from other inspectors', () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { treeHandler } = setupDevtools();
    const payload: TreePayload = {
      inspectorId: 'other-inspector',
      rootNodes: [{ id: 'existing', label: 'existing' }],
    };

    treeHandler(payload);

    expect(payload.rootNodes).toEqual([{ id: 'existing', label: 'existing' }]);
  });

  it('exposes flattened translations and metadata as read-only state', () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload('app-content');

    stateHandler(payload);

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

  it('returns an empty state for an unknown dictionary node', () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { stateHandler } = setupDevtools();
    const payload = buildStatePayload('unknown');

    stateHandler(payload);

    expect(payload.state).toEqual({});
  });

  it('lists a child node per available locale under the Locales group', () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { treeHandler } = setupDevtools('fr');
    const payload = buildTreePayload();

    treeHandler(payload);

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

  it('exposes the locale availability as state of the Locales group', () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(LOCALES_GROUP_NODE_ID);

    stateHandler(payload);

    expect(payload.state).toEqual({
      Locales: [
        { key: 'en', value: '', editable: false },
        { key: 'fr', value: 'current', editable: false },
        { key: 'es', value: '', editable: false },
      ],
    });
  });

  it('exposes the locale details as state of a locale node', () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(`${LOCALE_NODE_ID_PREFIX}fr`);

    stateHandler(payload);

    expect(payload.state).toEqual({
      Locale: [
        { key: 'locale', value: 'fr', editable: false },
        { key: 'current', value: true, editable: false },
      ],
    });
  });

  it('parses the locale from a node id carrying the current suffix', () => {
    const { stateHandler } = setupDevtools('fr');
    const payload = buildStatePayload(
      `${LOCALE_NODE_ID_PREFIX}fr${CURRENT_LOCALE_NODE_ID_SUFFIX}`
    );

    stateHandler(payload);

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

  it('moves the current tag when the tree is refetched after a switch', () => {
    getDictionariesMock.mockReturnValue({ 'app-content': fakeDictionary });

    const { inspectorOptions, treeHandler } = setupDevtools();

    const initialPayload = buildTreePayload();
    treeHandler(initialPayload);

    const initialLocalesNode = initialPayload.rootNodes.find(
      (node) => node.id === LOCALES_GROUP_NODE_ID
    );
    expect(initialLocalesNode?.children?.[0]?.id).toBe(
      `${LOCALE_NODE_ID_PREFIX}en${CURRENT_LOCALE_NODE_ID_SUFFIX}`
    );

    inspectorOptions.nodeActions?.[0]?.action(`${LOCALE_NODE_ID_PREFIX}fr`);

    // Simulate the devtools backend refetching the tree on sendInspectorTree
    const refreshedPayload = buildTreePayload();
    treeHandler(refreshedPayload);

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
