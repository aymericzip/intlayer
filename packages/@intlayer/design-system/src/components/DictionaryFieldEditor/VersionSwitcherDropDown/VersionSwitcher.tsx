'use client';

import { MoveVertical } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from '../../Button';
import { Container } from '../../Container';
import { DropDown, type PanelProps } from '../../DropDown';
import { useVersionSwitcher } from './VersionSwitcherContext';

export type VersionSwitcherProps = {
  panelProps?: Omit<PanelProps, 'identifier'>;
};

const DROPDOWN_IDENTIFIER = 'version-switcher';

export const VersionSwitcher: FC<VersionSwitcherProps> = ({ panelProps }) => {
  const { switchTo, versionSwitcherLabel, versionListLabel } =
    useIntlayer('version-switcher');
  const { selectedVersion, versions, setSelectedVersion } =
    useVersionSwitcher();

  if (versions.length === 0) {
    return <></>;
  }

  return (
    <div
      className="border-text text-text rounded-xl border transition-colors"
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
            <ol className="divide-text/20 divide-y divide-dashed overflow-y-auto p-1">
              {versions.reverse().map((version) => (
                <li className="px-1.5 py-1" key={version}>
                  <Button
                    onClick={() => setSelectedVersion(version)}
                    label={`${switchTo} v${version}`}
                    isActive={selectedVersion === version}
                    variant={ButtonVariant.HOVERABLE}
                    color={ButtonColor.TEXT}
                    isFullWidth
                    textAlign={ButtonTextAlign.LEFT}
                    size={ButtonSize.SM}
                  >
                    <div className="text-neutral flex flex-1 flex-row items-center justify-between gap-3 px-2 py-1 text-sm">
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
