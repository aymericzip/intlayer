'use client';

import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { useGetDictionary } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useNavigate } from '@tanstack/react-router';
import { type FC, Suspense } from 'react';
import { useTheme } from '#/providers/ThemeProvider';
import { EditorConfigurationProvider } from './ConfigurationProvider';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);

  const navigate = useNavigate();
  const dictionary = dictionaryResult?.data;

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isPending}>
        <EditorConfigurationProvider>
          <div className="flex h-full min-h-0 w-full flex-1 flex-col">
            {dictionary && (
              <DictionaryFieldEditor
                dictionary={dictionary}
                onClickDictionaryList={() =>
                  navigate({ to: App_Dashboard_Dictionaries_Path as any })
                }
                isDarkMode={resolvedTheme === 'dark'}
                mode={['remote']}
                onDelete={() => {
                  navigate({ to: App_Dashboard_Dictionaries_Path as any });
                }}
              />
            )}
          </div>
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
