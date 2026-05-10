import { Container } from '@intlayer/design-system/container';
import { lazy, Suspense } from 'react';
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

type EditorLayoutProps = PropsWithChildren;

export const EditorLayout: FC<EditorLayoutProps> = ({ children }) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Container
        background="none"
        border
        roundedSize="2xl"
        className="size-full flex-1 flex-col items-center justify-center overflow-hidden"
      >
        {children}
        <div className="absolute right-2 bottom-2">
          <LongPressMessage />
        </div>
      </Container>
      <Suspense fallback={null}>
        <DictionaryEditionDrawerController
          isDarkMode={resolvedTheme === 'dark'}
        />
        <DictionaryListDrawer />
      </Suspense>
    </>
  );
};
