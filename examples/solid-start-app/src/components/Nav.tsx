import { useIntlayer } from 'solid-intlayer';
import type { Component } from 'solid-js';
import { LocaleSwitcher } from './LocaleSwitcher';
import { LocalizedLink } from './LocalizedLink';

export const Nav: Component = () => {
  const content = useIntlayer('nav');

  return (
    <nav>
      <LocalizedLink href="/">{content.home}</LocalizedLink>
      <LocalizedLink href="/about">{content.about}</LocalizedLink>
      <LocaleSwitcher />
    </nav>
  );
};
