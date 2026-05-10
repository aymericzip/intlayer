'use client';

import { Button } from '@intlayer/design-system/button';
import { Modal } from '@intlayer/design-system/modal';
import { useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

const DISMISSED_KEY = 'app-install-modal-dismissed';
const RELEASES_API =
  'https://api.github.com/repos/aymericzip/intlayer/releases/latest';
const RELEASES_PAGE = 'https://github.com/aymericzip/intlayer/releases/latest';

type OS = 'mac' | 'windows' | 'linux' | 'unknown';

const detectOS = (): OS => {
  const ua = navigator.userAgent;
  if (ua.includes('Mac')) return 'mac';
  if (ua.includes('Win')) return 'windows';
  if (ua.includes('Linux')) return 'linux';
  return 'unknown';
};

type ReleaseAsset = { name: string; browser_download_url: string };

const findAsset = (assets: ReleaseAsset[], os: OS): string => {
  if (os === 'mac') {
    const arm = assets.find((a) => a.name.endsWith('-arm64.dmg'));
    const x64 = assets.find(
      (a) => a.name.endsWith('.dmg') && !a.name.includes('arm64')
    );
    return (
      arm?.browser_download_url ?? x64?.browser_download_url ?? RELEASES_PAGE
    );
  }
  if (os === 'windows') {
    const exe = assets.find((a) => a.name.endsWith('-setup.exe'));
    return exe?.browser_download_url ?? RELEASES_PAGE;
  }
  if (os === 'linux') {
    const appimage = assets.find((a) => a.name.endsWith('.AppImage'));
    return appimage?.browser_download_url ?? RELEASES_PAGE;
  }
  return RELEASES_PAGE;
};

export const AppInstallModal = () => {
  const {
    title,
    description,
    downloadMac,
    downloadWindows,
    downloadLinux,
    allReleases,
    notNow,
  } = useIntlayer('app-install-modal');

  const [isOpen, setIsOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(RELEASES_PAGE);
  const [os] = useState<OS>(detectOS);

  useEffect(() => {
    // Don't show inside Electron or if already dismissed
    if (window.electron) return;
    if (sessionStorage.getItem(DISMISSED_KEY)) return;

    fetch(RELEASES_API)
      .then((r) => r.json())
      .then((data) => {
        const assets: ReleaseAsset[] = data.assets ?? [];
        setDownloadUrl(findAsset(assets, os));
        setIsOpen(true);
      })
      .catch(() => {
        setDownloadUrl(RELEASES_PAGE);
        setIsOpen(true);
      });
  }, [os]);

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, '1');
    setIsOpen(false);
  };

  const downloadLabel =
    os === 'mac'
      ? downloadMac
      : os === 'windows'
        ? downloadWindows
        : downloadLinux;

  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} size="sm" padding="md">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/favicon-32x32.png"
            alt="Intlayer"
            width={32}
            height={32}
            className="shrink-0"
          />
          <div>
            <p className="font-semibold text-base">{title}</p>
            <p className="text-neutral-500 text-sm dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {os !== 'unknown' && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleDismiss}
            >
              <Button className="w-full" label={String(downloadLabel)}>
                {downloadLabel}
              </Button>
            </a>
          )}
          <a
            href={RELEASES_PAGE}
            target="_blank"
            rel="noreferrer"
            onClick={handleDismiss}
          >
            <Button
              variant="outline"
              className="w-full"
              label={String(allReleases)}
            >
              {allReleases}
            </Button>
          </a>
          <Button
            variant="ghost"
            className="w-full"
            onClick={handleDismiss}
            label={String(notNow)}
          >
            {notNow}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
