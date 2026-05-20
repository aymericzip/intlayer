import { Container } from '@intlayer/design-system/container';
import { type FC, lazy, type PropsWithChildren, Suspense } from 'react';
import { useTheme } from '#/providers/ThemeProvider';
import { LongPressMessage } from './LongPressMessage';

const DictionaryEditionDrawerController = lazy(() =>
  import('./DictionaryEditionDrawer').then((m) => ({
    default: m.DictionaryEditionDrawerController,
  }))
);

const DictionaryListDrawer = lazy(() =>
  import('./DictionaryListDrawer').then((m) => ({
    default: m.DictionaryListDrawer,
  }))
);

type EditorLayoutProps = PropsWithChildren<{ suppressEditionDrawer?: boolean }>;

export const EditorLayout: FC<EditorLayoutProps> = ({
  children,
  suppressEditionDrawer = false,
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="size-full flex-1 flex-col items-center justify-center overflow-hidden border-text/10"
      >
        {children}
        <div className="absolute right-2 bottom-2">
          <LongPressMessage />
        </div>
      </Container>
      <Suspense fallback={null}>
        {!suppressEditionDrawer && (
          <DictionaryEditionDrawerController
            isDarkMode={resolvedTheme === 'dark'}
          />
        )}
        <DictionaryListDrawer />
      </Suspense>
    </>
  );
};
