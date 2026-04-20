import type { FrameworkKey } from './constants';

export const fetchBenchmarkData = async (
  framework: FrameworkKey,
  category: string
) => {
  if (framework === 'nextjs') {
    switch (category) {
      case 'static':
        return (await import('./summarize-nextjs-static.json')).default;
      case 'dynamic':
        return (await import('./summarize-nextjs-dynamic.json')).default;
      case 'scoped-static':
        return (await import('./summarize-nextjs-scoped-static.json')).default;
      case 'scoped-dynamic':
        return (await import('./summarize-nextjs-scoped-dynamic.json')).default;
    }
  } else if (framework === 'tanstack') {
    switch (category) {
      case 'static':
        return (await import('./summarize-tanstack-static.json')).default;
      case 'dynamic':
        return (await import('./summarize-tanstack-dynamic.json')).default;
      case 'scoped-static':
        return (await import('./summarize-tanstack-scoped-static.json'))
          .default;
      case 'scoped-dynamic':
        return (await import('./summarize-tanstack-scoped-dynamic.json'))
          .default;
    }
  }
  return null;
};
