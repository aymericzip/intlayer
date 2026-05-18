'use client';

import { Button } from '@intlayer/design-system/button';
import { Logo } from '@intlayer/design-system/logo';
import {
  PopoverStatic,
  PopoverXAlign,
  PopoverYAlign,
} from '@intlayer/design-system/popover';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

const RELEASES_API =
  'https://api.github.com/repos/aymericzip/intlayer/releases/latest';
const RELEASES_PAGE = 'https://github.com/aymericzip/intlayer/releases/latest';

type OS = 'mac' | 'windows' | 'linux' | 'unknown';
type ReleaseAsset = { name: string; browser_download_url: string };

const detectOS = (): OS => {
  const ua = navigator.userAgent;
  if (ua.includes('Mac')) return 'mac';
  if (ua.includes('Win')) return 'windows';
  if (ua.includes('Linux')) return 'linux';
  return 'unknown';
};

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

export const AppDownloadButton = () => {
  const {
    title,
    description,
    downloadMac,
    downloadWindows,
    downloadLinux,
    allReleases,
  } = useIntlayer('app-install-modal');

  const [os] = useState<OS>(detectOS);
  const [downloadUrl, setDownloadUrl] = useState(RELEASES_PAGE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.electron) return;
    setVisible(true);

    fetch(RELEASES_API)
      .then((r) => r.json())
      .then((data) => {
        const assets: ReleaseAsset[] = data.assets ?? [];
        setDownloadUrl(findAsset(assets, os));
      })
      .catch(() => setDownloadUrl(RELEASES_PAGE));
  }, [os]);

  if (!visible) return null;

  const downloadLabel =
    os === 'mac'
      ? downloadMac
      : os === 'windows'
        ? downloadWindows
        : downloadLinux;

  return (
    <PopoverStatic identifier="app-download">
      <Button
        Icon={Download}
        variant="hoverable"
        size="icon-lg"
        label={String(allReleases)}
      />

      <PopoverStatic.Detail
        identifier="app-download"
        yAlign={PopoverYAlign.ABOVE}
        xAlign={PopoverXAlign.START}
        isFocusable
        roundedSize="2xl"
        className="w-80 p-3"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Logo className="size-12 p-2" />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-neutral-500 text-xs dark:text-neutral-400">
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <a href={RELEASES_PAGE} target="_blank" rel="noreferrer">
              <Button
                variant="outline"
                size="sm"
                color="text"
                className="w-full"
                label={String(allReleases)}
              >
                {allReleases}
              </Button>
            </a>
            {os !== 'unknown' && (
              <a href={downloadUrl} target="_blank" rel="noreferrer">
                <Button
                  size="sm"
                  className="w-full"
                  color="text"
                  label={String(downloadLabel)}
                >
                  {downloadLabel}
                </Button>
              </a>
            )}
          </div>
        </div>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
