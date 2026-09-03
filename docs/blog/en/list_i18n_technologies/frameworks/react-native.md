---
createdAt: 2025-01-16
updatedAt: 2026-09-02
title: "React Native i18n: device locale, RTL and Intl gaps"
description: Mobile i18n is not web i18n. Device locale detection, persisting the user override, the Android RTL restart, Intl polyfills on Hermes, and the library options.
keywords:
  - react native i18n
  - expo localization
  - react native rtl
  - I18nManager
  - expo-localization
  - Intl polyfill
  - Hermes
slugs:
  - blog
  - i18n-technologies
  - frameworks
  - react-native
author: aymericzip
---

# React Native i18n: what changes once there is no URL

Most i18n advice is written for the web, and about half of it stops applying the moment you ship a mobile app. There is no URL to carry the locale, no crawler to satisfy, and no server render to get right. What you get instead is a device setting, a user override you have to persist yourself, and a layout direction that will not flip without a reload.

## Table of Contents

<TOC/>

## The four things that are actually different

| Web                                | React Native                                           |
| :--------------------------------- | :----------------------------------------------------- |
| Locale lives in the URL            | Locale lives in device settings plus a stored override |
| Crawlers need server-rendered copy | Nobody crawls your app                                 |
| Catalogs are fetched per route     | Everything ships inside the binary                     |
| `dir="rtl"` applies immediately    | Full RTL flip needs an app reload                      |

The third and fourth rows are where the time goes.

## Reading the device locale

`expo-localization` exposes the device's preferred locales, already sorted by user preference.

```tsx fileName="src/getDeviceLocale.ts"
import { getLocales } from "expo-localization";

export const getDeviceLocale = () => getLocales()[0]?.languageTag ?? "en";
```

Two mistakes are common here. The first is reading only `languageCode` and losing the region, so `pt-BR` and `pt-PT` collapse into one. The second is trusting the device locale as final. It is a starting value, not a decision: a user whose phone is in German may still want your app in English, and that choice has to survive a restart.

So the order of precedence is: stored user override, then device locale, then your default.

```tsx
const resolveLocale = async () => {
  const stored = await AsyncStorage.getItem("locale");
  return stored ?? getDeviceLocale();
};
```

Persist with `AsyncStorage` or MMKV. MMKV is synchronous, which matters here: an async read before first paint means the app renders once in the wrong language and then corrects itself.

## RTL is the part that surprises people

React Native does not flip layout direction reactively. `I18nManager.forceRTL(true)` sets a native flag that only takes effect after the app reloads. On Android there is no way around this.

```tsx
import { I18nManager } from "react-native";

const applyDirection = (isRTL: boolean) => {
  if (I18nManager.isRTL === isRTL) return;
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  // Layout will only flip after a reload.
};
```

The practical pattern is to prompt once: the user picks Arabic or Hebrew, you explain the app needs to restart, and you reload with `expo-updates`. Silently calling `forceRTL` and hoping is how you get a half-mirrored screen.

Two follow-ups worth budgeting for. Use `start` and `end` instead of `left` and `right` in styles, or nothing mirrors. And check your icons: chevrons, back arrows and progress indicators need mirroring, while logos and media controls do not.

## Intl is not guaranteed

Hermes ships `Intl` support now, but coverage depends on the Hermes version and the platform, and older Android builds are where it breaks. If you format plurals, dates, currencies or display names, verify on a real low-end Android device rather than on the simulator.

When coverage is missing, polyfill early, before anything reads `Intl`:

```ts fileName="index.js"
import "intl";
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-numberformat/polyfill";
```

Each polyfill carries locale data, and that data ships in your binary. Import only the ones you use, and only the locales you support.

## Bundle size counts differently

On the web an unused locale catalog is a chunk that never gets fetched. In an app, it is bytes in the download every user pays for, on every install and every update. App stores also surface the download size, and it affects install conversion on slow networks.

This is the strongest argument for a build-time approach on mobile: anything that lets the bundler drop unused keys and unused languages is worth more here than it is on the web. See [bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) for how that works in practice, and the [benchmark reports](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md) for the web equivalents.

## Do not forget the store listing

Translating the app and shipping an English App Store page is a common miss. Both stores support localized metadata: title, subtitle, description, keywords and screenshots, per locale. That listing is the only part of a mobile app that behaves like a web page for discovery, so it is worth the same care as the app itself.

## The options

| Library                         | Model                                    | Typed keys                     | Note                                                            |
| :------------------------------ | :--------------------------------------- | :----------------------------- | :-------------------------------------------------------------- |
| `react-i18next`                 | Runtime catalogs, context provider       | Opt-in via declaration merging | The default. Largest ecosystem, most examples, heaviest runtime |
| `i18n-js` + `expo-localization` | Plain message objects                    | None                           | The historical pairing. Minimal and untyped                     |
| `lingui`                        | Compiled catalogs via macro              | Yes                            | Good bundle profile, needs Babel config                         |
| `intlayer`                      | Per-component declarations, Metro plugin | Generated                      | Build step required, smaller ecosystem                          |

`react-i18next` remains the right default for most teams. If you already run it and it works, the reasons to move are bundle size and key typing, not correctness.

## Intlayer on Expo

Content is declared next to the component that renders it, and a Metro plugin compiles those declarations.

```js fileName="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const { configMetroIntlayer } = require("react-native-intlayer/metro");

module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  return await configMetroIntlayer(defaultConfig);
})();
```

Wrap the root with the provider, seeding it from the device locale:

```tsx fileName="App.tsx"
import { getLocales } from "expo-localization";
import { IntlayerProvider } from "react-native-intlayer";

export default function App() {
  return (
    <IntlayerProvider defaultLocale={getLocales()[0]?.languageTag}>
      <RootNavigator />
    </IntlayerProvider>
  );
}
```

Import from `react-native-intlayer`, not `react-intlayer`. It re-exports the same hooks and adds the web API polyfills Intlayer expects.

```tsx fileName="src/screens/HomeScreen.tsx"
import { useIntlayer, useLocale } from "react-native-intlayer";

export const HomeScreen = () => {
  const { title, steps } = useIntlayer("home-screen");
  const { setLocale, availableLocales } = useLocale();

  return <Text>{title}</Text>;
};
```

Switching locale through `setLocale` re-renders the components reading content, so the language changes without a restart. RTL is the exception: `getHTMLTextDir` tells you whether the active locale is right to left, and you still have to hand that to `I18nManager` and reload.

<Tabs defaultTab="code">
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-native-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

**What it costs you.** The Metro plugin is mandatory, so a bare `jest` or `tsc` run that bypasses Metro will not see the generated dictionaries without extra config. React Native tends to break on version drift more than the web does, so keep `intlayer` and `react-native-intlayer` aligned. The ecosystem is much smaller than i18next's, and ICU message format support is still incomplete. If your translators deliver ICU strings today, check [the i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) or stay where you are.

## Common mistakes

- **Reading the device locale once at module scope.** The user can change the system language while your app is backgrounded. Resolve on mount, and again on resume.
- **Calling `forceRTL` without reloading.** The flag is set, the layout is not. You get a mixed screen and a bug report you cannot reproduce.
- **Hardcoding `left` and `right` in styles.** Use `start` and `end` so RTL mirroring works at all.
- **Shipping every Intl polyfill.** Each one carries CLDR data into the binary. Import what you use.
- **Translating the app but not the store listing.** Discovery happens before install.
- **Assuming the simulator represents devices.** Intl gaps and RTL behaviour both differ on real low-end Android.

## Going further

- [Set up Intlayer in a React Native and Expo app](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react_native+expo.md)
- [Bundle optimization: what reaches the binary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md)
- [Benchmark reports across frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/benchmark/index.md)
- [Drop-in i18next compat adapter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/compat/i18next.md) and the [migration guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/migration_from_i18next_to_intlayer.md)
- [React i18n: how the provider model works](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/list_i18n_technologies/frameworks/react.md)
- [What internationalization actually covers](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/what_is_internationalization.md)
- [Per-component vs centralized i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/per-component_vs_centralized_i18n.md)
