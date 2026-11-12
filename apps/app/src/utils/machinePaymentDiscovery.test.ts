import { describe, expect, it, vi } from 'vitest';
import {
  type FetchDocument,
  getMachinePaymentDiscoveryResponse,
} from './machinePaymentDiscovery';

const DOCUMENT = '{"openapi":"3.1.0"}';

describe('getMachinePaymentDiscoveryResponse', () => {
  it('answers 404 on a self-hosted instance without calling the API', async () => {
    const fetchDocument = vi.fn<FetchDocument>();

    const response = await getMachinePaymentDiscoveryResponse(
      true,
      fetchDocument
    );

    expect(response.status).toBe(404);
    expect(fetchDocument).not.toHaveBeenCalled();
  });

  it('relays the API document on the cloud', async () => {
    const fetchDocument = vi.fn<FetchDocument>(
      async () => new Response(DOCUMENT)
    );

    const response = await getMachinePaymentDiscoveryResponse(
      false,
      fetchDocument
    );

    expect(fetchDocument.mock.calls[0]?.[0]).toMatch(/\/openapi\.json$/);
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    expect(await response.text()).toBe(DOCUMENT);
  });

  it('answers 404 when the API offers no agent payments', async () => {
    const response = await getMachinePaymentDiscoveryResponse(
      false,
      async () => new Response('Not found', { status: 404 })
    );

    expect(response.status).toBe(404);
  });

  it('answers 503 when the API is unreachable', async () => {
    const response = await getMachinePaymentDiscoveryResponse(
      false,
      async () => {
        throw new Error('offline');
      }
    );

    expect(response.status).toBe(503);
  });
});
