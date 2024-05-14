import type { FC, SVGProps } from 'react';
import { LogoCircle } from './LogoCircle';
import { LogoNoFrame } from './LogoNoFrame';
import { LogoSquare } from './LogoSquare';
import { LogoSquircle } from './LogoSquircle';
import { LogoTextOnly } from './LogoTextOnly';
import { LogoWithTextCircle } from './LogoWithTextCircle';
import { LogoWithTextNoFrame } from './LogoWithTextNoFrame';
import { LogoWithTextSquircle } from './LogoWithTextSquircle';

export type LogoBaseProps = SVGProps<SVGSVGElement> & {
  bgColor?: string;
};

type LogoWithTextProps = {
  type?: 'logoWithText';
  frame?: 'squicle' | 'none' | 'circle';
};
type LogoOnlyProps = {
  type?: 'logoOnly';
  frame?: 'squicle' | 'none' | 'circle' | 'square';
};

type LogoTextOnlyProps = {
  type?: 'textOnly';
  frame?: null;
};

type LogoProps = LogoBaseProps &
  (LogoWithTextProps | LogoOnlyProps | LogoTextOnlyProps);

export const Logo: FC<LogoProps> = ({
  type = 'logoWithText',
  frame,
  height = 30,
  width = undefined,
  ...props
}) => {
  const isClickable: boolean = props.onClick !== undefined;

  const logoProps: LogoBaseProps = {
    width,
    height,
    role: isClickable ? 'button' : undefined,
    'aria-label': isClickable ? 'Intlayer logo button' : 'Intlayer logo',
    ...props,
  };

  if (type === 'logoWithText') {
    switch (frame) {
      case 'circle':
        return <LogoWithTextCircle {...logoProps} />;
      case 'squicle':
        return <LogoWithTextSquircle {...logoProps} />;
      case 'none':
      default:
        return <LogoWithTextNoFrame {...logoProps} />;
    }
  } else if (type === 'logoOnly') {
    switch (frame) {
      case 'circle':
        return <LogoCircle {...logoProps} />;
      case 'square':
        return <LogoSquare {...logoProps} />;
      case 'squicle':
        return <LogoSquircle {...logoProps} />;
      case 'none':
      default:
        return <LogoNoFrame {...logoProps} />;
    }
  } else {
    return <LogoTextOnly {...logoProps} />;
  }
};
