import { lazy, Suspense, type ComponentType } from 'react';

type DynamicOptions = {
  loading?: () => JSX.Element;
  ssr?: boolean;
};

export default function dynamic<T extends ComponentType<any>>(
  importFunc: () => Promise<any>,
  options?: DynamicOptions
) {
  const LazyComponent = lazy(() =>
    importFunc().then((mod) => {
      if (mod && mod.default) {
        return { default: mod.default };
      }
      if (typeof mod === 'function') {
        return { default: mod };
      }
      const keys = Object.keys(mod);
      if (keys.length > 0) {
        return { default: mod[keys[0]] };
      }
      return { default: () => null };
    })
  );

  return function DynamicComponent(props: any) {
    if (options?.loading) {
      const Fallback = options.loading;
      return (
        <Suspense fallback={<Fallback />}>
          <LazyComponent {...props} />
        </Suspense>
      );
    }
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
