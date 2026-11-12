import { act, createElement, type FC } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  type FrameConnectionStatus,
  useFrameConnectionStatus,
} from './useFrameConnectionStatus';

const editorEnabledState = vi.hoisted(() => ({ enabled: false }));

vi.mock('./EditorEnabledContext', () => ({
  useEditorEnabled: () => ({ enabled: editorEnabledState.enabled }),
}));

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const TIMEOUT_MS = 1_000;

let root: Root;
let status: FrameConnectionStatus;

const Probe: FC = () => {
  status = useFrameConnectionStatus(TIMEOUT_MS);

  return null;
};

const render = () => act(() => root.render(createElement(Probe)));

beforeEach(() => {
  vi.useFakeTimers();
  editorEnabledState.enabled = false;
  root = createRoot(document.createElement('div'));
});

afterEach(() => {
  act(() => root.unmount());
  vi.useRealTimers();
});

describe('useFrameConnectionStatus', () => {
  it('does not fail before the frame loads', () => {
    render();

    act(() => vi.advanceTimersByTime(TIMEOUT_MS * 2));

    expect(status.isConnectionFailed).toBe(false);
  });

  it('fails when the loaded frame never connects', () => {
    render();

    act(() => status.handleFrameLoad());
    act(() => vi.advanceTimersByTime(TIMEOUT_MS - 1));

    expect(status.isConnectionFailed).toBe(false);

    act(() => vi.advanceTimersByTime(1));

    expect(status.isConnectionFailed).toBe(true);
  });

  it('does not fail when the client connects in time', () => {
    render();

    act(() => status.handleFrameLoad());

    editorEnabledState.enabled = true;
    render();

    act(() => vi.advanceTimersByTime(TIMEOUT_MS * 2));

    expect(status.isConnectionFailed).toBe(false);
  });

  it('hides the failure once dismissed or reloaded', () => {
    render();

    act(() => status.handleFrameLoad());
    act(() => vi.advanceTimersByTime(TIMEOUT_MS));
    act(() => status.dismiss());

    expect(status.isConnectionFailed).toBe(false);

    act(() => status.handleFrameLoad());

    expect(status.isConnectionFailed).toBe(false);
  });
});
