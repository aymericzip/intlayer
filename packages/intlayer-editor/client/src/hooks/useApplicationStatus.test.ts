import { afterEach, describe, expect, test, vi } from 'vitest';
import { probeApplication } from './useApplicationStatus';

const applicationURL = 'http://localhost:5173';

describe('probeApplication', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('reports a running application on any HTTP answer', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null));
    vi.stubGlobal('fetch', fetchMock);

    expect(await probeApplication(applicationURL)).toEqual({
      isRunning: true,
    });
    expect(fetchMock).toHaveBeenCalledWith(
      applicationURL,
      expect.objectContaining({ mode: 'no-cors' })
    );
  });

  test('reports the network error when the application is down', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    );

    expect(await probeApplication(applicationURL)).toEqual({
      isRunning: false,
      errorMessage: 'Failed to fetch',
    });
  });
});
