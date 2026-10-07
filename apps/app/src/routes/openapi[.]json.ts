import { createFileRoute } from '@tanstack/react-router';
import { getMachinePaymentDiscoveryResponse } from '#utils/machinePaymentDiscovery';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

/** MPP discovery document; 404 on self-hosted instances. */
export const Route = createFileRoute('/openapi.json')({
  server: {
    handlers: {
      GET: () => getMachinePaymentDiscoveryResponse(IS_SELF_HOSTED),
    },
  },
});
