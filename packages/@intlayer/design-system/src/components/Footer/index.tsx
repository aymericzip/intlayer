import type { FC, ReactNode } from 'react';
import tw from 'twin.macro';
import { Logo } from '../Logo';

export type Link = {
  href: string;
  text: ReactNode;
  onClick?: () => void;
  label: string;
};

export type LinkGroup = { title: ReactNode; links: Link[] };

type FooterProps = { links?: LinkGroup[] };

const StyledFooter = tw.footer`flex flex-auto flex-row justify-around p-6 items-center flex-wrap gap-10`;

const StyledAsideContent = tw.aside`flex flex-col justify-between items-center md:w-1/4`;
const StyledAsideDescription = tw.span`text-sm text-neutral text-center text-xs`;

const StyledFooterContent = tw.div`w-full flex flex-row justify-around m-auto flex-wrap gap-x-3 gap-y-6 md:w-2/3`;
const StyledColumn = tw.div`flex flex-col gap-2`;
const StyledColumnRow = tw.div`flex flex-col gap-3`;

export const Footer: FC<FooterProps> = ({ links }) => (
  <StyledFooter>
    <StyledAsideContent>
      <Logo type="logoWithTextBelow" width={80} height={80} />
      <StyledAsideDescription>© 2024 Intlayer, Inc.</StyledAsideDescription>
    </StyledAsideContent>
    <StyledFooterContent>
      {(links ?? []).map(({ title, links }, index) => (
        <StyledColumn key={index}>
          <strong>{title}</strong>
          <StyledColumnRow>
            {links.map((link) => (
              <a key={link.href} href={link.href} aria-label={link.label}>
                {link.text}
              </a>
            ))}
          </StyledColumnRow>
        </StyledColumn>
      ))}
    </StyledFooterContent>
  </StyledFooter>
);
