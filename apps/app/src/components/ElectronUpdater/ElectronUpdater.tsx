'use client';

import { Button } from '@intlayer/design-system/button';
import { useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

type UpdateState =
  | { status: 'idle' }
  | { status: 'available'; version: string }
  | { status: 'downloading'; percent: number }
  | { status: 'ready' }
  | { status: 'error'; message: string };

export const ElectronUpdater = () => {
  const [update, setUpdate] = useState<UpdateState>({ status: 'idle' });
  const {
    updateAvailableVersion,
    aNewVersionOfIntlayer,
    downloadUpdate,
    download,
    dismiss,
    later,
    downloadingPercent,
    updateReadyToInstall,
    restartIntlayerToApplyThe,
    restartAndInstall,
    restartInstall,
    updateErrorMessage,
  } = useIntlayer('electron-updater');

  useEffect(() => {
    const el = window.electron;
    if (!el) return;

    const offAvailable = el.onUpdateAvailable((info) => {
      const version = (info as { version?: string }).version ?? '';
      setUpdate({ status: 'available', version });
    });

    const offDownloaded = el.onUpdateDownloaded(() => {
      setUpdate({ status: 'ready' });
    });

    const offProgress = el.onDownloadProgress(({ percent }) => {
      setUpdate({ status: 'downloading', percent: Math.round(percent) });
    });

    const offError = el.onUpdateError((message) => {
      setUpdate({ status: 'error', message });
      setTimeout(() => setUpdate({ status: 'idle' }), 5000);
    });

    return () => {
      offAvailable();
      offDownloaded();
      offProgress();
      offError();
    };
  }, []);

  if (update.status === 'idle') return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 flex max-w-sm flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
      {update.status === 'available' && (
        <>
          <p className="font-medium text-sm">
            {updateAvailableVersion.insert({
              version: update.version,
            })}
          </p>
          <p className="text-neutral-500 text-xs dark:text-neutral-400">
            {aNewVersionOfIntlayer}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => window.electron?.downloadUpdate()}
              label={downloadUpdate.value}
            >
              {download}
            </Button>
            <Button
              size="sm"
              variant="hoverable"
              onClick={() => setUpdate({ status: 'idle' })}
              label={dismiss.value}
            >
              {later}
            </Button>
          </div>
        </>
      )}

      {update.status === 'downloading' && (
        <>
          <p className="font-medium text-sm">
            {downloadingPercent.insert({
              percent: update.percent,
            })}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${update.percent}%` }}
            />
          </div>
        </>
      )}

      {update.status === 'ready' && (
        <>
          <p className="font-medium text-sm">{updateReadyToInstall}</p>
          <p className="text-neutral-500 text-xs dark:text-neutral-400">
            {restartIntlayerToApplyThe}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => window.electron?.installUpdate()}
              label={restartAndInstall.value}
            >
              {restartInstall}
            </Button>
            <Button
              size="sm"
              variant="hoverable"
              onClick={() => setUpdate({ status: 'idle' })}
              label={dismiss.value}
            >
              {later}
            </Button>
          </div>
        </>
      )}

      {update.status === 'error' && (
        <p className="text-error text-sm">
          {updateErrorMessage.insert({
            message: update.message,
          })}
        </p>
      )}
    </div>
  );
};
