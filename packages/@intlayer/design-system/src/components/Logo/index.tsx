import type { FC, HTMLAttributes } from 'react';

type LogoProps = HTMLAttributes<HTMLDivElement>;

export const Logo: FC<LogoProps> = (props) => <div {...props}>Logo</div>;
