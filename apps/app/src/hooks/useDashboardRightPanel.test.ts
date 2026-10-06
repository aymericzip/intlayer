import { describe, expect, it } from 'vitest';
import {
  DashboardRightPanelId,
  type DashboardRightPanelSelection,
  resolveActivePanel,
  selectPanel,
} from './useDashboardRightPanel';

const available = (...panelIds: DashboardRightPanelId[]) => new Set(panelIds);

describe('resolveActivePanel', () => {
  it('prefers the visual editor, then the node editor, then the chat on first visit', () => {
    expect(
      resolveActivePanel(
        undefined,
        available(
          DashboardRightPanelId.Chat,
          DashboardRightPanelId.DictionaryEdition,
          DashboardRightPanelId.VisualEditor
        )
      )
    ).toBe(DashboardRightPanelId.VisualEditor);

    expect(
      resolveActivePanel(
        undefined,
        available(
          DashboardRightPanelId.Chat,
          DashboardRightPanelId.DictionaryEdition
        )
      )
    ).toBe(DashboardRightPanelId.DictionaryEdition);

    expect(
      resolveActivePanel(undefined, available(DashboardRightPanelId.Chat))
    ).toBe(DashboardRightPanelId.Chat);
  });

  it('keeps the selected chat on pages offering an editor', () => {
    const selection = selectPanel(undefined, DashboardRightPanelId.Chat);

    expect(
      resolveActivePanel(
        selection,
        available(
          DashboardRightPanelId.Chat,
          DashboardRightPanelId.DictionaryEdition,
          DashboardRightPanelId.VisualEditor
        )
      )
    ).toBe(DashboardRightPanelId.Chat);
  });

  it('closes when no selected panel has content on the page', () => {
    const selection = selectPanel(
      undefined,
      DashboardRightPanelId.DictionaryEdition
    );

    expect(
      resolveActivePanel(
        selection,
        available(
          DashboardRightPanelId.Chat,
          DashboardRightPanelId.VisualEditor
        )
      )
    ).toBeNull();
  });

  it('restores the visual editor after visiting the editor page', () => {
    const visualEditorSelected = selectPanel(
      undefined,
      DashboardRightPanelId.VisualEditor
    );
    const nodeEditorSelected = selectPanel(
      visualEditorSelected,
      DashboardRightPanelId.DictionaryEdition
    );

    expect(
      resolveActivePanel(
        nodeEditorSelected,
        available(
          DashboardRightPanelId.Chat,
          DashboardRightPanelId.VisualEditor
        )
      )
    ).toBe(DashboardRightPanelId.VisualEditor);
  });

  it('stays closed after the user closed the sidebar', () => {
    const selection: DashboardRightPanelSelection = {
      history: [DashboardRightPanelId.Chat],
      isClosed: true,
    };

    expect(
      resolveActivePanel(selection, available(DashboardRightPanelId.Chat))
    ).toBeNull();
  });
});

describe('selectPanel', () => {
  it('moves the panel to the front without duplicates and reopens the sidebar', () => {
    const selection: DashboardRightPanelSelection = {
      history: [DashboardRightPanelId.Chat, DashboardRightPanelId.VisualEditor],
      isClosed: true,
    };

    expect(selectPanel(selection, DashboardRightPanelId.VisualEditor)).toEqual({
      history: [DashboardRightPanelId.VisualEditor, DashboardRightPanelId.Chat],
      isClosed: false,
    });
  });
});
