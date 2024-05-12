/* eslint-disable */
import { Locales } from 'intlayer'
import type { ThemeSwitcherContent as _dLioemSqDAn6h5rxkXEm } from '../.intlayer/types/theme-switcher.d.ts';
import type { ServicesContent as _uvG1STY6VS3oyxa4kWbh } from '../.intlayer/types/services.d.ts';
import type { ProjectsContent as _rlQZwZc6CAgIk7Wjbx9S } from '../.intlayer/types/projects.d.ts';
import type { NavbarContent as _eSaundIdvDAYYWPGeUFm } from '../.intlayer/types/navbar.d.ts';
import type { LogoutContent as _9ImtPLJvlkj2GVDkyF2r } from '../.intlayer/types/logout.d.ts';
import type { LoginContent as _G4zFsoAOYx5bVzwKfCzO } from '../.intlayer/types/login.d.ts';
import type { HomeContent as _RJpFHKCAA7kClQnpGLrC } from '../.intlayer/types/home.d.ts';
import type { FooterContent as _tBu3wcC3fX7PIel1y04O } from '../.intlayer/types/footer.d.ts';
import type { DemoContent as _OaEHP1XbcfrRRIHZlWf0 } from '../.intlayer/types/demo.d.ts';
import type { ContactContent as _KXvvH081FInLvbETqyGZ } from '../.intlayer/types/contact.d.ts';
import type { AboutContent as _Ib8xnzZzvMU501JlLGTk } from '../.intlayer/types/about.d.ts';

declare module 'intlayer' {
  interface IntlayerDictionaryTypesConnector {
    "theme-switcher": _dLioemSqDAn6h5rxkXEm;
    "services": _uvG1STY6VS3oyxa4kWbh;
    "projects": _rlQZwZc6CAgIk7Wjbx9S;
    "navbar": _eSaundIdvDAYYWPGeUFm;
    "logout": _9ImtPLJvlkj2GVDkyF2r;
    "login": _G4zFsoAOYx5bVzwKfCzO;
    "home": _RJpFHKCAA7kClQnpGLrC;
    "footer": _tBu3wcC3fX7PIel1y04O;
    "demo": _OaEHP1XbcfrRRIHZlWf0;
    "contact": _KXvvH081FInLvbETqyGZ;
    "about": _Ib8xnzZzvMU501JlLGTk;
  }

  type ConfigLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
  type ExtractedLocales = Extract<Locales, ConfigLocales>;
  type ExcludedLocales = Exclude<Locales, ConfigLocales>;

  interface IConfigLocales<Content> extends Record<ExtractedLocales, Content> {}
}