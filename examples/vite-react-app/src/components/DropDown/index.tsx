import type { FC } from 'react';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import type { UnrollablePanelTriggerProps, UnrollablePanelType } from './types';

const DropDownTrigger: FC<UnrollablePanelTriggerProps> = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <button
    className={`group/unrollable-panel relative cursor-pointer${className}`}
    aria-label={`Open panel ${identifier}`}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </button>
);

export const DropDown: UnrollablePanelType = ({
  children,
  isHidden = undefined,
  isOverable = true,
  isFocusable = true,
  className,
  identifier,
  ...props
}) => (
  <div
    aria-hidden={isHidden}
    aria-description="Hidden panel controlled by trigger button"
    aria-labelledby={`unrollable-panel-button-${identifier}`}
    className="absolute right-0 translate-y-2"
    id={`unrollable-panel-${identifier}`}
  >
    <MaxHeightSmoother
      className={
        `overflow-x-hidden${isOverable}`
          ? `group-hover/unrollable-panel:grid-rows-[1fr] group-hover/unrollable-panel:overflow-x-auto`
          : `${isFocusable}`
            ? `group-focus/unrollable-panel:grid-rows-[1fr] group-focus/unrollable-panel:overflow-x-auto`
            : `${className}`
      }
      tabIndex={isHidden !== false ? undefined : -1}
      {...props}
    >
      {children}
    </MaxHeightSmoother>
  </div>
);

DropDown.Trigger = DropDownTrigger;
