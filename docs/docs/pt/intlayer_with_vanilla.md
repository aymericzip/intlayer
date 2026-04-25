---
createdAt: 2026-03-31
updatedAt: 2026-03-31
title: i18n Vanilla JS - Como traduzir uma aplicação Vanilla JS em 2026
description: Descubra como tornar o seu site Vanilla JS multilíngue. Siga a documentação para internacionalizar (i18n) e traduzi-lo.
keywords:
  - Internacionalização
  - Documentação
  - Intlayer
  - Vanilla JS
  - JavaScript
  - TypeScript
  - HTML
slugs:
  - doc
  - environment
  - vanilla
applicationTemplate: https://github.com/aymericzip/intlayer-vanilla-template
history:
  - version: 8.4.10
    date: 2026-03-31
    changes: "Início do histórico"
---

# Traduza o seu site Vanilla JS usando Intlayer | Internacionalização (i18n)

## Índice

<TOC/>

## O que é o Intlayer?

O **Intlayer** é uma biblioteca de internacionalização (i18n) inovadora e de código aberto, projetada para simplificar o suporte multilíngue em aplicações web modernas.

Com o Intlayer, você pode:

- **Gerir facilmente as traduções** utilizando dicionários declarativos ao nível dos componentes.
- **Localizar dinamicamente metadados**, rotas e conteúdo.
- **Garantir suporte TypeScript** com tipos autogerados, melhorando o preenchimento automático e a deteção de erros.
- **Beneficiar de funcionalidades avançadas**, como deteção e troca dinâmica de idioma.

Este guia demonstra como utilizar o Intlayer numa aplicação Vanilla JavaScript **sem utilizar um gestor de pacotes ou um bundler** (como Vite, Webpack, etc.).

Se a sua aplicação utiliza um bundler (como o Vite), recomendamos seguir o [Guia Vite + Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_with_vite+vanilla.md) em vez disso.

Utilizando o bundle standalone, pode importar o Intlayer diretamente nos seus ficheiros HTML através de um único ficheiro JavaScript, tornando-o perfeito para projetos legados ou sites estáticos simples.

---

## Guia Passo a Passo para Configurar o Intlayer numa Aplicação Vanilla JS

### Passo 1: Instalar Dependências

Instale os pacotes necessários utilizando o npm:

```bash packageManager="npm"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
npx intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
npx intlayer init --no-gitignore

# Construir os dicionários
npx intlayer build
```

```bash packageManager="pnpm"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
pnpm intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
pnpm intlayer init --no-gitignore

# Construir os dicionários
pnpm intlayer build
```

```bash packageManager="yarn"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
yarn intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o ficheiro de configuração intlayer, TypeScript se configurado, variáveis de ambiente
yarn intlayer init --no-gitignore

# Construir os dicionários
yarn intlayer build
```

```bash packageManager="bun"
# Gerar um bundle standalone do intlayer e vanilla-intlayer
# Este ficheiro será importado no seu ficheiro HTML
bun x intlayer standalone --packages intlayer vanilla-intlayer --outfile intlayer.js

# Inicializar o intlayer com o ficheiro de configuração
bun x intlayer init --no-gitignore

# Construir os dicionários
bun x intlayer build
```

- **intlayer**
  O pacote principal que fornece ferramentas de internacionalização para gestão de configuração, tradução, [declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md), transpilação e [comandos CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/index.md).

- **vanilla-intlayer**
  O pacote que integra o Intlayer com aplicações puras JavaScript / TypeScript. Fornece um singleton pub/sub (`IntlayerClient`) e auxiliares baseados em callbacks (`useIntlayer`, `useLocale`, etc.) para que qualquer parte da sua aplicação possa reagir a mudanças de idioma sem depender de uma framework de UI.

> A exportação de empacotamento (bundling) do CLI `intlayer standalone` produz uma build otimizada através do tree-shaking de pacotes não utilizados, idiomas e lógica não essencial (como redirecionamentos ou prefixos) específica para a sua configuração.

### Passo 2: Configuração do seu projeto

Crie um ficheiro de configuração para configurar os idiomas da sua aplicação:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Seus outros idiomas
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Através deste ficheiro de configuração, pode configurar URLs localizados, redirecionamento de middleware, nomes de cookies, a localização e extensão das suas declarações de conteúdo, desativar logs do Intlayer na consola e muito mais. Para uma lista completa de parâmetros disponíveis, consulte a [documentação de configuração](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/configuration.md).

### Passo 3: Importar o bundle no seu HTML

Depois de gerar o bundle `intlayer.js`, pode importá-lo no seu ficheiro HTML:

```html fileName="index.html"
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />

    <!-- Importar o bundle -->
    <script src="./intlayer.js" defer></script>
    <!-- Importar o seu script principal -->
    <script src="./src/main.js" defer></script>
  </head>
  <body>
    <h1 id="title"></h1>
    <p class="read-the-docs"></p>
  </body>
</html>
```

O bundle expõe o `Intlayer` e o `VanillaIntlayer` como objetos globais no `window`.

### Passo 4: Bootstrapper do Intlayer no seu ponto de entrada

No seu `src/main.js`, chame `installIntlayer()` **antes** de qualquer conteúdo ser renderizado, para que o singleton global de idioma esteja pronto.

```javascript fileName="src/main.js"
const { installIntlayer } = window.VanillaIntlayer;

// Deve ser chamado antes de renderizar qualquer conteúdo i18n.
installIntlayer();
```

Se também pretender utilizar o renderizador de markdown, chame `installIntlayerMarkdown()`:

```javascript fileName="src/main.js"
const { installIntlayer, installIntlayerMarkdown } = window.VanillaIntlayer;

installIntlayer();
installIntlayerMarkdown();
```

### Passo 5: Declarar o Seu Conteúdo

Crie e gira as suas declarações de conteúdo para armazenar traduções:

```typescript fileName="src/app.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { insert, t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: "Vite + Vanilla",

    viteLogoLabel: t({
      en: "Vite Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),

    count: insert(
      t({
        en: "count is {{count}}",
        fr: "le compte est {{count}}",
        es: "el recuento es {{count}}",
      })
    ),

    readTheDocs: t({
      en: "Click on the Vite logo to learn more",
      fr: "Cliquez sur le logo Vite pour en savoir plus",
      es: "Haga clic no logotipo do Vite para saber mais",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": "Vite + Vanilla",
    "viteLogoLabel": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite Logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "count": {
      "nodeType": "insertion",
      "insertion": {
        "nodeType": "translation",
        "translation": {
          "en": "count is {{count}}",
          "fr": "le compte est {{count}}",
          "es": "el recuento es {{count}}"
        }
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite logo to learn more",
        "fr": "Cliquez sur le logo Vite pour en savoir plus",
        "es": "Haga clic no logotipo do Vite para obter mais informações"
      }
    }
  }
}
```

> As suas declarações de conteúdo podem ser definidas em qualquer lugar na sua aplicação desde que estejam incluídas no diretório `contentDir` (por defeito, `./src`). E correspondam à extensão do ficheiro de declaração de conteúdo (por defeito, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).
>
> Para mais detalhes, consulte a [documentação de declaração de conteúdo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/dictionary/content_file.md).

### Passo 6: Utilizar o Intlayer no seu JavaScript

O objeto `window.VanillaIntlayer` fornece auxiliares de API: `useIntlayer(key, locale?)` devolve o conteúdo traduzido para uma determinada chave.

```javascript fileName="src/main.js"
const { installIntlayer, useIntlayer } = window.VanillaIntlayer;

installIntlayer();

// Obter o conteúdo inicial para o idioma atual.
// Encadeie .onChange() para ser notificado sempre que o idioma mudar.
const content = useIntlayer("app").onChange((newContent) => {
  // Re-renderizar ou atualizar apenas os nós DOM afetados
  document.querySelector("h1").textContent = String(newContent.title);
  document.querySelector(".read-the-docs").textContent = String(
    newContent.readTheDocs
  );
});

// Renderização inicial
document.querySelector("h1").textContent = String(content.title);
document.querySelector(".read-the-docs").textContent = String(
  content.readTheDocs
);
```

> Aceda aos valores finais como strings envolvendo-os em `String()`, que chama o método `toString()` do nó e devolve o texto traduzido.
>
> Quando precisar do valor para um atributo HTML nativo (ex: `alt`, `aria-label`), utilize `.value` diretamente:
>
> ```javascript
> img.alt = content.viteLogoLabel.value;
> ```

### (Opcional) Passo 7: Alterar o idioma do seu conteúdo

Para alterar o idioma do seu conteúdo, utilize a função `setLocale` exposta pelo `useLocale`.

```javascript fileName="src/locale-switcher.js"
const { getLocaleName } = window.Intlayer;
const { useLocale } = window.VanillaIntlayer;

export function setupLocaleSwitcher(container) {
  const { locale, availableLocales, setLocale, subscribe } = useLocale();

  const select = document.createElement("select");
  select.setAttribute("aria-label", "Idioma");

  const render = (currentLocale) => {
    select.innerHTML = availableLocales
      .map(
        (loc) =>
          `<option value="${loc}"${loc === currentLocale ? " selected" : ""}>
            ${getLocaleName(loc)}
          </option>`
      )
      .join("");
  };

  render(locale);
  container.appendChild(select);

  select.addEventListener("change", () => setLocale(select.value));

  // Manter o dropdown sincronizado quando o idioma mudar de outro local
  return subscribe((newLocale) => render(newLocale));
}
```

### (Opcional) Passo 8: Alternar os atributos HTML de Idioma e Direção

Atualize os atributos `lang` e `dir` da tag `<html>` para corresponderem ao idioma atual para acessibilidade e SEO.

```javascript fileName="src/main.js"
const { getHTMLTextDir } = window.Intlayer;
const { installIntlayer, useLocale } = window.VanillaIntlayer;

installIntlayer();

useLocale({
  onLocaleChange: (locale) => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  },
});
```

### (Opcional) Passo 9: Carregamento lento de dicionários por idioma

Se pretender carregar dicionários de forma lenta por idioma, pode utilizar `useDictionaryDynamic`. Isto é útil se não quiser incluir todas as traduções no ficheiro inicial `intlayer.js`.

```javascript fileName="src/app.js"
const { installIntlayer, useDictionaryDynamic } = window.VanillaIntlayer;

installIntlayer();

const unsubscribe = useDictionaryDynamic(
  {
    en: () => import("../.intlayer/dictionaries/en/app.mjs"),
    fr: () => import("../.intlayer/dictionaries/fr/app.mjs"),
    es: () => import("../.intlayer/dictionaries/es/app.mjs"),
  },
  "app"
).onChange((content) => {
  document.querySelector("h1").textContent = String(content.title);
});
```

> Nota: o `useDictionaryDynamic` requer que os dicionários estejam disponíveis como ficheiros ESM separados. Esta abordagem é tipicamente utilizada se tiver um servidor web a servir os dicionários.

### Configurar TypeScript

Certifique-se de que a sua configuração TypeScript inclui os tipos autogerados.

```json5 fileName="tsconfig.json"
{
  "compilerOptions": {
    // ...
  },
  "include": ["src", ".intlayer/**/*.ts"],
}
```

### Extensão VS Code

Para melhorar a sua experiência de desenvolvimento com o Intlayer, pode instalar a **Extensão oficial do Intlayer para VS Code**.

[Instalar a partir do VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Esta extensão fornece:

- **Preenchimento automático** para chaves de tradução.
- **Deteção de erros em tempo real** para traduções em falta.
- **Pré-visualizações inline** de conteúdo traduzido.
- **Ações rápidas** para criar e atualizar traduções facilmente.

Para mais detalhes sobre como utilizar a extensão, consulte a [documentação da extensão Intlayer para VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Ir Mais Longe

Para ir mais longe, pode implementar o [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_visual_editor.md) ou externalizar o seu conteúdo utilizando o [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_CMS.md).
