---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: TanStack Start'ta Intlayer ile Başlarken (React)
description: Intlayer kullanarak TanStack Start uygulamanıza i18n ekleyin-bileşen düzeyinde sözlükler, yerelleştirilmiş URL'ler ve SEO dostu meta veriler.
keywords:
  - Uluslararasılaştırma
  - Dokümantasyon
  - Intlayer
  - TanStack Start
  - TanStack Router
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - tanstack-start
---

# Intlayer ve TanStack Start (React) ile uluslararasılaştırma (i18n) başlangıç kılavuzu

## Intlayer Nedir?

**Intlayer**, React uygulamaları için açık kaynaklı bir i18n araç takımıdır. Size şunları sağlar:

- **TypeScript güvenliği ile bileşen yerel sözlükleri**.
- **Dinamik meta veriler ve rotalar** (SEO hazır).
- **Çalışma zamanı yerel ayar anahtarlaması** (ve yerel ayarları algılamak/kalıcı hale getirmek için yardımcılar).
- **Yapı zamanı dönüşümleri + dev DX için Vite eklentisi**.

Bu kılavuz, **TanStack Start** projesine Intlayer'ı nasıl bağlayacağınızı gösterir (Vite'i altında kullanan ve yönlendirme/SSR için TanStack Router kullanan).

---

## Adım 1: Bağımlılıkları Kurma

```bash
# npm
npm i intlayer react-intlayer
npm i -D vite-intlayer

# pnpm
pnpm add intlayer react-intlayer
pnpm add -D vite-intlayer

# yarn
yarn add intlayer react-intlayer
yarn add -D vite-intlayer
```

- **intlayer**: çekirdek (yapılandırma, sözlükler, CLI/dönüşümler).
- **react-intlayer**: React için `<IntlayerProvider>` + kancalar.
- **vite-intlayer**: Vite eklentisi, ayrıca yerel ayar algılama/yönlendirmeler için isteğe bağlı middleware (dev & SSR/önizlemede çalışır; üretim SSR için `dependencies`'a taşıyın).

---

## Adım 2: Intlayer'ı Yapılandırma

Proje kökünüzde `intlayer.config.ts` oluşturun:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  // Ayrıca ayarlayabilirsiniz: contentDir, contentFileExtensions, middleware seçenekleri, vb.
};

export default config;
```

CommonJS/ESM varyantları, `cjs`/`mjs`'yi tercih ederseniz orijinal dokümanınızla aynıdır.

> Tam yapılandırma referansı: Intlayer'ın yapılandırma dokümantasyonuna bakın.

---

## Adım 3: Vite Eklentisini Ekleyin (ve isteğe bağlı middleware)

**TanStack Start Vite kullanır**, bu yüzden Intlayer'ın eklenti(leri)ni `vite.config.ts`'nize ekleyin:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerMiddlewarePlugin } from "vite-intlayer";

export default defineConfig({
  plugins: [
    react(),
    intlayer(),
    // Yerel ayar algılama, çerezler ve yönlendirmeler için isteğe bağlı ancak önerilen:
    intlayerMiddlewarePlugin(),
  ],
});
```

> SSR dağıtırsanız, middleware'in üretimde çalışması için `vite-intlayer`'ı `dependencies`'a taşıyın.

---

## Adım 4: İçeriğinizi Bildirin

Sözlüklerinizi `./src` altında herhangi bir yere yerleştirin (varsayılan `contentDir`). Örnek:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({ en: "Vite logo", fr: "Logo Vite", es: "Logo Vite" }),
    reactLogo: t({ en: "React logo", fr: "Logo React", es: "Logo React" }),
    title: t({
      en: "TanStack Start + React",
      fr: "TanStack Start + React",
      es: "TanStack Start + React",
    }),
    count: t({ en: "count is ", fr: "le compte est ", es: "el recuento es " }),
    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/routes/index.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/routes/index.tsx</code> et enregistrez pour tester
          HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/routes/index.tsx</code> y guarda para probar HMR
        </>
      ),
    }),
    readTheDocs: t({
      en: "Click the logos to learn more",
      fr: "Cliquez sur les logos pour en savoir plus",
      es: "Haz clic en los logotipos para saber más",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

JSON/ESM/CJS varyantları orijinal dokümanınızla aynı şekilde çalışır.

> TSX içeriği? Kurulumunuz gerektiriyorsa `import React from "react"`'ı unutmayın.

---

## Adım 5: TanStack Start'ı Intlayer ile Sarmalayın

TanStack Start ile, sağlayıcıları ayarlamak için **kök rota** doğru yerdir.

```tsx fileName="src/routes/__root.tsx"
import {
  Outlet,
  createRootRoute,
  Link as RouterLink,
} from "@tanstack/react-router";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

function AppShell() {
  // Üst düzeyde bir sözlük kullanma örneği:
  const content = useIntlayer("app");

  return (
    <div>
      <nav className="flex gap-3 p-3">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
      <main className="p-6">
        <h1>{content.title}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <IntlayerProvider>
      <AppShell />
    </IntlayerProvider>
  ),
});
```

Ardından içeriğinizi sayfalarda kullanın:

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import reactLogo from "../assets/react.svg";

export const Route = createFileRoute("/")({
  component: () => {
    const content = useIntlayer("app");
    return (
      <>
        <button>{content.count}0</button>
        <p>{content.edit}</p>
        <img
          src={reactLogo}
          alt={content.reactLogo.value}
          width={48}
          height={48}
        />
        <p className="opacity-70">{content.readTheDocs}</p>
      </>
    );
  },
});
```

> Dize nitelikleri (`alt`, `title`, `aria-label`, …) `.value` gerektirir:
>
> ```jsx
> <img alt={c.reactLogo.value} />
> ```

---

## (İsteğe Bağlı) Adım 6: Yerel Ayar Anahtarlaması (İstemci)

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcher() {
  const { setLocale } = useLocale();
  return (
    <div className="flex gap-2">
      <button onClick={() => setLocale(Locales.ENGLISH)}>English</button>
      <button onClick={() => setLocale(Locales.FRENCH)}>Français</button>
      <button onClick={() => setLocale(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (İsteğe Bağlı) Adım 7: Yerelleştirilmiş Yönlendirme (SEO dostu URL'ler)

TanStack Start ile **iki iyi kalıp** vardır. Birini seçin.

URL'lerinizin `/:locale/...` olması için dinamik segment klasörü `src/routes/$locale/` oluşturun. `$locale` düzeninde, `params.locale`'ı doğrulayın, `<IntlayerProvider locale=...>` ayarlayın ve `<Outlet />` işleyin. Bu yaklaşım basittir, ancak geri kalan rotalarınızı `$locale` altına monte edeceksiniz ve varsayılan yerel ayarı öneki istemiyorsanız ekstra öneksiz bir ağaca ihtiyacınız olacak.

---

## (İsteğe Bağlı) Adım 8: Yerel ayar değiştirirken URL'yi güncelleyin

A Kalıbı (basepath) ile, yerel ayarları değiştirmek **farklı bir basepath'e** gezinmek anlamına gelir:

```tsx fileName="src/components/LocaleSwitcherNavigate.tsx"
import { useRouter } from "@tanstack/react-router";
import { Locales, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";

export function LocaleSwitcherNavigate() {
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const change = async (next: Locales) => {
    if (next === locale) return;
    const nextPath = getLocalizedUrl(
      window.location.pathname + window.location.search,
      next
    );
    await router.navigate({ to: nextPath }); // geçmişi korur
    setLocale(next);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => change(Locales.ENGLISH)}>English</button>
      <button onClick={() => change(Locales.FRENCH)}>Français</button>
      <button onClick={() => change(Locales.SPANISH)}>Español</button>
    </div>
  );
}
```

---

## (İsteğe Bağlı) Adım 9: `<html lang>` ve `dir` (TanStack Start Document)

TanStack Start, özelleştirebileceğiniz bir **Document** (kök HTML kabuğu) sunar. Erişilebilirlik/SEO için `lang` ve `dir` ayarlayın:

```tsx fileName="src/routes/__root.tsx" {4,15}
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import { IntlayerProvider } from "react-intlayer";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <IntlayerProvider>
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          <Header />
          {children}
          <TanStackRouterDevtools />
          <Scripts />
        </body>
      </html>
    </IntlayerProvider>
  );
}
```

İstemci tarafı düzeltme için, küçük kancanızı da koruyabilirsiniz:

```tsx fileName="src/hooks/useI18nHTMLAttributes.ts"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

---

## (İsteğe Bağlı) Adım 10: Yerelleştirilmiş Bağlantı bileşeni

TanStack Router bir `<Link/>` sağlar, ancak dahili URL'leri otomatik olarak önekeleştiren düz bir `<a>`'ya ihtiyacınız olursa:

```tsx fileName="src/components/Link.tsx"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const isExternal = (href?: string) => /^https?:\/\//.test(href ?? "");

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const hrefI18n =
      href && !isExternal(href) ? getLocalizedUrl(href, locale) : href;
    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);
Link.displayName = "Link";
```

> A Kalıbını (basepath) kullanırsanız, TanStack'ın `<Link to="/about" />` zaten `basepath` aracılığıyla `/fr/about`'a çözümlenir, bu yüzden özel bir bağlantı isteğe bağlıdır.

---

## TypeScript

Intlayer'ın oluşturulan türlerini dahil edin:

```json5 fileName="tsconfig.json"
{
  "include": ["src", ".intlayer/**/*.ts"],
}
```

---

## Git

Intlayer'ın oluşturulan eserlerini yok sayın:

```gitignore
.intlayer
```

---

## VS Code Uzantısı

- **Intlayer VS Code Uzantısı** → otomatik tamamlama, hatalar, satır içi önizlemeler, hızlı eylemler.
  Marketplace: `intlayer.intlayer-vs-code-extension`

---

## Daha Fazla İlerleyin

- Görsel Düzenleyici
- CMS modu
- Kenarda yerel ayar algılama / adaptörler

---

## Dokümantasyon Geçmişi

| Sürüm | Tarih      | Değişiklikler                     |
| ----- | ---------- | --------------------------------- |
| 1.0.0 | 2025-08-11 | TanStack Start uyarlaması eklendi |
