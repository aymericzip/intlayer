import { type ComponentType, lazy, Suspense } from 'react';

type DynamicOptions = {
  ssr?: boolean;
  loading?: () => JSX.Element | null;
};

function dynamic<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T } | T>,
  options?: DynamicOptions
): T {
  const LazyComponent = lazy(() =>
    loader().then((mod) => ({
      default: ((mod as any)?.default || mod) as T,
    }))
  );

  const WrappedComponent = ((props: any) => (
    <Suspense fallback={options?.loading ? options.loading() : null}>
      <LazyComponent {...props} />
    </Suspense>
  )) as unknown as T;

  return WrappedComponent;
}

export default dynamic;
