import type { FC } from 'react';
import tw from 'twin.macro';
import { Button } from '../Button';

type Link = {
  href: string;
  text: string;
  onClick?: () => void;
  label: string;
};

export type LinkGroup = { title: string; links: Link[] };

type FooterProps = { links?: LinkGroup[] };

const StyledFooter = tw.footer`flex-0`;
const StyledFooterContent = tw.div`m-auto flex w-full flex-row justify-evenly p-6 md:w-1/2`;
const StyledColumn = tw.div`flex flex-col gap-2`;
const StyledColumnRow = tw.div`mx-auto flex flex-col gap-4`;

export const Footer: FC<FooterProps> = ({ links }) => (
  <StyledFooter>
    <StyledFooterContent>
      {(links ?? []).map(({ title, links }) => (
        <StyledColumn key={title}>
          <h3>{title}</h3>
          <StyledColumnRow>
            {links.map((link) => (
              <Button
                variant="link"
                color="text"
                size="sm"
                key={link.href}
                onClick={link.onClick}
                label={link.label}
              >
                {link.text}
              </Button>
            ))}
          </StyledColumnRow>
        </StyledColumn>
      ))}
    </StyledFooterContent>
  </StyledFooter>
);
