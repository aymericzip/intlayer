# Intlayer Documentation

Bem-vindo à Documentação do Intlayer. Este guia fornece uma visão geral do Intlayer, suas principais funcionalidades e como utilizar efetivamente estes documentos para aprimorar sua experiência de desenvolvimento.

## Introdução

### O que é Intlayer?

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Permite a declaração do seu conteúdo em qualquer lugar do seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para integrar facilmente no seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais sólido e eficiente.

Intlayer também fornece um editor visual opcional que permite editar e gerenciar seu conteúdo com facilidade. Este editor é particularmente útil para desenvolvedores que preferem uma interface visual para gerenciamento de conteúdo ou para equipes que geram conteúdo sem precisar se preocupar com o código.

## Exemplo de uso

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Principais Funcionalidades

Intlayer oferece uma variedade de funcionalidades adaptadas para atender às necessidades do desenvolvimento web moderno. Abaixo estão as principais características, com links para documentação detalhada para cada uma:

- **Suporte à Internacionalização**: Amplie o alcance global de sua aplicação com suporte embutido para internacionalização.
- **Editor Visual**: Melhore seu fluxo de trabalho de desenvolvimento com plugins de editor projetados para o Intlayer. Confira o [Guia do Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).
- **Flexibilidade de Configuração**: Personalize sua configuração com opções extensas detalhadas no [Guia de Configuração](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
- **Ferramentas CLI Avançadas**: Gerencie seus projetos de forma eficiente usando a interface de linha de comando do Intlayer. Explore as capacidades na [Documentação das Ferramentas CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).
- **Compatibilidade com i18n**: O Intlayer funciona perfeitamente com outras bibliotecas de internacionalização. Confira o [Guia do i18n](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_i18next.md) para mais informações.

### Plataformas Suportadas

O Intlayer foi projetado para funcionar perfeitamente com aplicações Next.js e React. Também há suporte para Vite e Create React App.

- **Integração com Next.js**: Aproveite o poder do Next.js dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Guia de Integração com Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_nextjs_15.md).
- **Integração com Vite e React**: Aproveite o Vite dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Guia de Integração com Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_vite+react.md).
- **Integração com Create React App**: Aproveite o poder do Create React App dentro do Intlayer para renderização do lado do servidor e geração de sites estáticos. Detalhes estão disponíveis em nosso [Guia de Integração com Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_with_create_react_app.md).

### Como Usar Esta Documentação

Para aproveitar ao máximo esta documentação:

1. **Navegue para Seções Relevantes**: Utilize os links fornecidos acima para ir diretamente para as seções que atendem às suas necessidades.
2. **Exemplos Interativos**: Onde disponíveis, utilize exemplos interativos para ver como as funcionalidades funcionam em tempo real.
3. **Feedback e Contribuições**: Seu feedback é valioso. Se você tiver sugestões ou correções, considere contribuir com a documentação.
