import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary } from '@intlayer/types/dictionary';
import { setupDevtoolsPlugin } from '@vue/devtools-api';
import { describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';
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

const setupDevtoolsPluginMock = vi.mocked(setupDevtoolsPlugin);
const getDictionariesMock = vi.mocked(getDictionaries);

type TreeNode = { id: string; label: string };
type TreePayload = { inspectorId: string; rootNodes: TreeNode[] };
type StateEntry = { key: string; value: unknown; editable: boolean };
type StatePayload = {
  inspectorId: string;
  nodeId: string;
  state: Record<string, StateEntry[]>;
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
const setupDevtools = () => {
  enableIntlayerDevtools(createApp({}));

  const [descriptor, setupCallback] = setupDevtoolsPluginMock.mock.calls[0];

  let treeHandler: (payload: TreePayload) => void = () => {};
  let stateHandler: (payload: StatePayload) => void = () => {};
  const addInspector = vi.fn();

  setupCallback({
    addInspector,
    on: {
      getInspectorTree: vi.fn((handler: (payload: TreePayload) => void) => {
        treeHandler = handler;
      }),
      getInspectorState: vi.fn((handler: (payload: StatePayload) => void) => {
        stateHandler = handler;
      }),
    },
  } as never);

  return { descriptor, addInspector, treeHandler, stateHandler };
};

describe('enableIntlayerDevtools', () => {
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
    const payload: TreePayload = {
      inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
      rootNodes: [],
    };

    treeHandler(payload);

    expect(payload.rootNodes).toEqual([
      { id: 'app-content', label: 'app-content' },
      { id: 'other-dictionary', label: 'other-dictionary' },
    ]);
  });

  it('shows a hint node when no dictionary is loaded', () => {
    getDictionariesMock.mockReturnValue({});

    const { treeHandler } = setupDevtools();
    const payload: TreePayload = {
      inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
      rootNodes: [],
    };

    treeHandler(payload);

    expect(payload.rootNodes).toHaveLength(1);
    expect(payload.rootNodes[0].label).toContain('No dictionaries loaded');
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
    const payload: StatePayload = {
      inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
      nodeId: 'app-content',
      state: {},
    };

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
    const payload: StatePayload = {
      inspectorId: INTLAYER_DICTIONARIES_INSPECTOR_ID,
      nodeId: 'unknown',
      state: {},
    };

    stateHandler(payload);

    expect(payload.state).toEqual({});
  });
});
