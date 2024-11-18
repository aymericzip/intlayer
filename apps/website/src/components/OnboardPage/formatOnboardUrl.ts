import { PagesRoutes } from '@/Routes';
import { Period, Plans } from '../PricingPage/data.content';

export const formatOnboardUrl = (
  page: PagesRoutes,
  plan: Plans,
  period?: Period,
  origin?: string
) => {
  // Start building the URL manually
  let url = `${page}?plan=${encodeURIComponent(plan)}`;

  // Append optional parameters if they exist
  if (period) {
    url += `&period=${encodeURIComponent(period)}`;
  }

  if (origin) {
    url += `&origin=${encodeURIComponent(origin)}`;
  }

  return url.toString();
};
