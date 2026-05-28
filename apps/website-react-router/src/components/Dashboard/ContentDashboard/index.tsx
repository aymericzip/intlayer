'use client';

import { useGetDictionary } from '@intlayer/design-system/api';
import { DictionaryFieldEditor } from '@intlayer/design-system/dictionary-field-editor';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_Dictionaries_Path } from '@intlayer/design-system/routes';
import { useNavigate as useRouter } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { type FC, Suspense } from 'react';
import { EditorConfigurationProvider } from './ConfigurationProvider';

type ContentDashboardContentProps = {
  dictionaryKey: string;
};

export const ContentDashboard: FC<ContentDashboardContentProps> = ({
  dictionaryKey,
}) => {
  const { resolvedTheme } = useTheme();
  const { data: dictionaryResult, isPending } = useGetDictionary(dictionaryKey);

  const router = useRouter();
  const dictionary = dictionaryResult?.data;

  return (
    <Suspense fallback={<Loader />}>
      <Loader isLoading={!dictionary || isPending}>
        <EditorConfigurationProvider>
          {dictionary && (
            <DictionaryFieldEditor
              dictionary={dictionary}
              onClickDictionaryList={() =>
                router(App_Dashboard_Dictionaries_Path)
              }
              isDarkMode={resolvedTheme === 'dark'}
              mode={['remote']}
              onDelete={() => {
                router(App_Dashboard_Dictionaries_Path);
              }}
            />
          )}
        </EditorConfigurationProvider>
      </Loader>
    </Suspense>
  );
};
