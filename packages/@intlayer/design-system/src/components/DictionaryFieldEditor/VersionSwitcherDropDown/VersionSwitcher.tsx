'use client';

import { MoveVertical } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { Button } from '../../Button';
import { Container } from '../../Container';
import { DropDown, type PanelProps } from '../../DropDown';
import { useVersionSwitcher } from './VersionSwitcherContext';
import versionSwitcherContent from './versionSwitcherDropDown.content';

export type VersionSwitcherProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
};

const DROPDOWN_IDENTIFIER = 'version-switcher';

export const VersionSwitcher: FC<VersionSwitcherProps> = ({ panelProps }) => {
  const { switchTo, versionSwitcherLabel, versionListLabel } = useDictionary(
    versionSwitcherContent
  );
  const { selectedVersion, availableVersions, setSelectedVersion } =
    useVersionSwitcher();

  if (availableVersions.length === 0) {
    return <></>;
  }

  return (
    <div
      className="border-text text-text dark:border-text-dark dark:text-text-dark rounded-xl border transition-colors"
      aria-label={versionListLabel.value}
    >
      <DropDown identifier={DROPDOWN_IDENTIFIER}>
        <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER}>
          <div className="flex w-full items-center justify-between">
            <div className="px-2">{selectedVersion ?? 'LTS'}</div>
            <MoveVertical className="w-5 self-center" />
          </div>
        </DropDown.Trigger>

        <DropDown.Panel
          identifier={DROPDOWN_IDENTIFIER}
          isOverable
          isFocusable
          className="left-auto right-0"
          {...panelProps}
        >
          <Container
            className="max-h-[80vh] min-w-28"
            separator="y"
            role="listbox"
            transparency="sm"
            border
            roundedSize="2xl"
            borderColor="text"
            aria-label={versionSwitcherLabel.value}
          >
            <ol className="divide-text/20 dark:divide-text-dark/20 divide-y divide-dashed overflow-y-auto p-1">
              {availableVersions.reverse().map((version) => (
                <li className="px-1.5 py-1" key={version}>
                  <Button
                    onClick={() => setSelectedVersion(version)}
                    label={`${switchTo} v${version}`}
                    isActive={selectedVersion === version}
                    variant="hoverable"
                    color="text"
                    isFullWidth
                    textAlign="left"
                    size="sm"
                  >
                    <div className="text-neutral dark:text-neutral-dark flex flex-1 flex-row items-center justify-between gap-3 px-2 py-1 text-sm">
                      {version}
                    </div>
                  </Button>
                </li>
              ))}
            </ol>
          </Container>
        </DropDown.Panel>
      </DropDown>
    </div>
  );
};
