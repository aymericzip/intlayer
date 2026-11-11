import { describe, expect, test } from 'vitest';
import { getFrameErrorLogEntry } from './getFrameErrorLogEntry';

const applicationURL = 'http://localhost:5173';

describe('getFrameErrorLogEntry', () => {
  test('warns when no application URL is configured', () => {
    expect(
      getFrameErrorLogEntry({
        applicationURL: undefined,
        isConnectionFailed: false,
        isApplicationEditorEnabled: true,
      })
    ).toEqual(
      expect.objectContaining({
        level: 'warn',
        message: expect.stringContaining('editor.applicationURL'),
      })
    );
  });

  test('reports nothing while the frame is connected', () => {
    expect(
      getFrameErrorLogEntry({
        applicationURL,
        isConnectionFailed: false,
        isApplicationEditorEnabled: true,
      })
    ).toBeUndefined();
  });

  test('points to `editor.enabled` when the application disables the editor', () => {
    expect(
      getFrameErrorLogEntry({
        applicationURL,
        isConnectionFailed: true,
        isApplicationEditorEnabled: false,
      })?.message
    ).toContain('editor.enabled: true');
  });

  test('names the origins to allow in `frame-ancestors`', () => {
    const logEntry = getFrameErrorLogEntry({
      applicationURL,
      isConnectionFailed: true,
      isApplicationEditorEnabled: true,
    });

    expect(logEntry?.level).toBe('error');
    expect(logEntry?.message).toContain('frame-ancestors');
    expect(logEntry?.message).toContain(window.location.origin);
  });
});
