---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: i18n por componente vs. centralizado: Uma nova abordagem com Intlayer
description: Uma análise aprofundada das estratégias de internacionalização no React, comparando abordagens centralizadas, por chave e por componente, e apresentando o Intlayer.
keywords:
  - i18n
  - React
  - Internationalization
  - Intlayer
  - Optimization
  - Bundle Size
slugs:
  - blog
  - per-component-vs-centralized-i18n
---

# i18n por componente vs. centralizado

A abordagem por componente não é um conceito novo. Por exemplo, no ecossistema Vue, o `vue-i18n` suporta [i18n SFC (Single File Component)](https://vue-i18n.intlify.dev/guide/advanced/sfc.html). O Nuxt também oferece [traduções por componente](https://i18n.nuxtjs.org/docs/guide/per-component-translations), e o Angular emprega um padrão similar através dos seus [Feature Modules](https://v17.angular.io/guide/feature-modules).

Mesmo em um app Flutter, muitas vezes encontramos este padrão:

```bash
lib/
└── features/
    └── login/
        ├── login_screen.dart
        └── login_screen.i18n.dart  # <- As traduções ficam aqui
```

```dart fileName='lib/features/login/login_screen.i18n.dart'
import 'package:i18n_extension/i18n_extension.dart';

extension Localization on String {
  static var _t = Translations.byText("en") +
      {
        "Hello": {
          "en": "Hello",
          "fr": "Bonjour",
        },
      };

  String get i18n => localize(this, _t);
}
```

No entanto, no mundo React, vemos principalmente abordagens diferentes, que agruparei em três categorias:

<Columns>
  <Column>

**Abordagem centralizada** (i18next, next-intl, react-intl, lingui)

- (sem namespaces) considera uma única fonte para recuperar conteúdo. Por padrão, você carrega o conteúdo de todas as páginas quando seu app é carregado.

  </Column>
  <Column>

**Abordagem granular** (intlayer, inlang)

- refina a recuperação de conteúdo por chave ou por componente.

  </Column>
</Columns>

> Neste blog, não vou focar em soluções baseadas em compilador, que já abordei aqui: [Compiler vs Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/compiler_vs_declarative_i18n.md).
> Note que i18n baseado em compilador (por exemplo, Lingui) simplesmente automatiza a extração e o carregamento do conteúdo. Por baixo do capô, eles frequentemente compartilham as mesmas limitações que outras abordagens.

> Note que quanto mais você refina a forma como recupera seu conteúdo, maior o risco de inserir estado e lógica adicionais nos seus componentes.

As abordagens granulares são mais flexíveis do que as centralizadas, mas frequentemente implicam um compromisso. Mesmo que o "tree shaking" seja divulgado por essas bibliotecas, na prática acaba por carregar uma página em todas as línguas.

Portanto, de forma geral, a decisão resume-se assim:

- Se a sua aplicação tem mais páginas do que línguas, deve favorecer uma abordagem granular.
- Se tiver mais línguas do que páginas, deve optar por uma abordagem centralizada.

Obviamente, os autores das bibliotecas estão cientes dessas limitações e oferecem soluções alternativas. Entre elas: dividir em namespaces, carregar ficheiros JSON dinamicamente (`await import()`), ou purgar conteúdo em build time.

Ao mesmo tempo, deve saber que quando carrega dinamicamente o seu conteúdo, introduz pedidos adicionais ao seu servidor. Cada `useState` extra ou hook significa um pedido extra ao servidor.

> Para resolver este ponto, o Intlayer sugere agrupar múltiplas definições de conteúdo sob a mesma chave; o Intlayer irá então mesclar esse conteúdo.

Mas, de todas essas soluções, fica claro que a abordagem mais popular é a centralizada.

### Então por que a abordagem centralizada é tão popular?

- Primeiro, o i18next foi a primeira solução a tornar-se amplamente utilizada, seguindo uma filosofia inspirada nas arquiteturas PHP e Java (MVC), que se baseiam numa separação estrita de responsabilidades (mantendo o conteúdo separado do código). Chegou em 2011, estabelecendo os seus padrões mesmo antes da grande mudança para arquiteturas baseadas em Componentes (como o React).
- Depois, uma vez que uma biblioteca é amplamente adotada, torna-se difícil migrar o ecossistema para outros padrões.
- Usar uma abordagem centralizada também facilita as coisas em sistemas de gestão de traduções (Translation Management Systems) como Crowdin, Phrase ou Localized.
- A lógica da abordagem por componente é mais complexa do que a centralizada e requer tempo extra de desenvolvimento, especialmente quando é necessário resolver problemas como identificar onde o conteúdo está localizado.

### Ok, mas por que não ficar apenas com uma abordagem Centralizada?

Deixe-me explicar por que isso pode ser problemático para a sua app:

- **Dados não utilizados:**
  Quando uma página carrega, costuma-se carregar o conteúdo de todas as outras páginas. (Numa app de 10 páginas, isso significa 90% de conteúdo carregado que não é utilizado). Você faz lazy load de um modal? A biblioteca i18n não se importa — ela carrega as strings primeiro de qualquer forma.
- **Desempenho:**
  A cada re-render, todos os seus componentes são hidratados com um payload JSON massivo, o que impacta a reatividade da sua app à medida que ela cresce.
- **Manutenção:**
  Manter ficheiros JSON grandes é doloroso. Você tem de saltar entre ficheiros para inserir uma tradução, garantindo que não faltam traduções e que não restam **chaves órfãs**.
- **Sistema de design:**
  Isto cria incompatibilidade com design systems (por exemplo, um componente `LoginForm`) e restringe a duplicação de componentes entre diferentes apps.

**"Mas inventámos Namespaces!"**

Claro, e isso é um enorme avanço. Vamos ver a comparação do tamanho do bundle principal de uma stack Vite + React + React Router v7 + Intlayer. Simulámos uma aplicação com 20 páginas.

O primeiro exemplo não inclui traduções lazy-loaded por locale nem divisão por namespaces. O segundo inclui purga de conteúdo + carregamento dinâmico das traduções.

| Bundle otimizado                                                                                                          | Bundle não otimizado                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| ![bundle não otimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) | ![bundle otimizado](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) |

Portanto, graças aos namespaces, mudámos desta estrutura:

```bash
locale/
├── en.json
├── fr.json
└── es.json
```

To this one:

```bash
locale/
├── en/
│   ├── common.json
│   ├── navbar.json
│   ├── footer.json
│   ├── home.json
│   └── about.json
├── fr/
│   └── ...
└── es/
    └── ...

```

Agora tem de gerir com precisão que parte do conteúdo da sua app deve ser carregada e onde. Em conclusão, a grande maioria dos projetos simplesmente ignora esta etapa devido à complexidade (veja o [guia do next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/i18n_using_next-i18next.md), por exemplo, para ver os desafios que isso representa (apenas) ao seguir as boas práticas). Consequentemente, esses projetos acabam com o problema do carregamento massivo de JSON explicado anteriormente.

> Note que este problema não é específico do i18next, mas de todas as abordagens centralizadas listadas acima.

No entanto, quero relembrar que nem todas as abordagens granulares resolvem isto. Por exemplo, as abordagens `vue-i18n SFC` ou `inlang` não fazem, por si só, lazy load das traduções por locale, pelo que você está simplesmente a trocar o problema do tamanho do bundle por outro.

Além disso, sem uma separação de responsabilidades adequada, torna-se muito mais difícil extrair e fornecer as suas traduções aos tradutores para revisão.

### Como a abordagem por componente do Intlayer resolve isto

O Intlayer procede em vários passos:

1. **Declaração:** Declare o seu conteúdo em qualquer parte da sua codebase usando ficheiros `*.content.{ts|jsx|cjs|json|json5|...}`. Isto assegura separação de responsabilidades enquanto mantém o conteúdo co-localizado com o código. Um ficheiro de conteúdo pode ser por locale ou multilíngue.
2. **Processamento:** Intlayer executa uma etapa de build para processar a lógica JS, tratar fallbacks de traduções ausentes, gerar tipos TypeScript, gerenciar conteúdo duplicado, buscar conteúdo do seu CMS e mais.
3. **Purgamento:** Quando sua aplicação é construída, o Intlayer purga o conteúdo não utilizado (um pouco como o Tailwind gerencia suas classes) substituindo o conteúdo da seguinte forma:

**Declaração:**

```tsx
// src/MyComponent.tsx
export const MyComponent = () => {
  const content = useIntlayer("my-key");
  return <h1>{content.title}</h1>;
};
```

```tsx
// src/myComponent.content.ts
export const {
  key: "my-key",
  content: t({
    en: { title: "My title" },
    fr: { title: "Mon titre" }
  })
}

```

**Processamento:** Intlayer constrói o dicionário com base no arquivo `.content` e gera:

```json5
// .intlayer/dynamic_dictionary/en/my-key.json
{
  "key": "my-key",
  "content": { "title": "My title" },
}
```

**Substituição:** Intlayer transforma seu componente durante o build da aplicação.

**- Modo de Importação Estática:**

```tsx
// Representação do componente em sintaxe semelhante a JSX
export const MyComponent = () => {
  const content = useDictionary({
    key: "my-key",
    content: {
      nodeType: "translation",
      translation: {
        pt: { title: "Meu título" },
        en: { title: "My title" },
        fr: { title: "Mon titre" },
      },
    },
  });

  return <h1>{content.title}</h1>;
};
```

**- Modo de Importação Dinâmica:**

```tsx
// Representação do componente em sintaxe semelhante a JSX
export const MyComponent = () => {
  const content = useDictionaryAsync({
    en: () =>
      import(".intlayer/dynamic_dictionary/en/my-key.json", {
        with: { type: "json" },
      }).then((mod) => mod.default),
    // O mesmo para outras línguas
  });

  return <h1>{content.title}</h1>;
};
```

> `useDictionaryAsync` usa um mecanismo semelhante ao Suspense para carregar o JSON localizado apenas quando necessário.

**Principais vantagens desta abordagem por componente:**

- Manter a declaração do conteúdo próxima dos seus componentes permite uma melhor facilidade de manutenção (por exemplo, mover um componente para outra app ou design system. Eliminar a pasta do componente remove também o conteúdo relacionado, como provavelmente já faz com os seus `.test`, `.stories`)

/// Uma abordagem por componente impede que agentes de IA precisem saltar entre todos os seus diferentes ficheiros. Trata todas as traduções num só lugar, limitando a complexidade da tarefa e a quantidade de tokens utilizados.

### Limitações

Claro, esta abordagem implica compensações:

- É mais difícil ligar a outros sistemas de l10n e a ferramentas adicionais.
- Fica-se preso (o que basicamente já acontece com qualquer solução i18n devido à sua sintaxe específica).

É por isso que o Intlayer tenta fornecer um conjunto completo de ferramentas para i18n (100% free and OSS), incluindo tradução por IA usando o seu próprio AI Provider e as suas chaves de API. O Intlayer também fornece ferramentas para sincronizar os seus ficheiros JSON, funcionando como formatadores de mensagens do ICU / vue-i18n / i18next para mapear o conteúdo para os seus formatos específicos.
