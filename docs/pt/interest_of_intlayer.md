# Intlayer: Uma maneira mais próxima de traduzir sua aplicação

**Intlayer** é uma biblioteca de internacionalização projetada especificamente para desenvolvedores JavaScript. Ela permite a declaração do seu conteúdo em todo o seu código. Converte a declaração de conteúdo multilíngue em dicionários estruturados para integração fácil em seu código. Usando TypeScript, **Intlayer** torna seu desenvolvimento mais robusto e eficiente.

## Exemplo de uso

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## Por que escolher o Intlayer?

- **Gerenciamento de Conteúdo Alimentado por JavaScript**: Aproveite a flexibilidade do JavaScript para definir e gerenciar seu conteúdo de maneira eficiente.
- **Ambiente Seguro em Tipo**: Aproveite o TypeScript para garantir que todas as suas definições de conteúdo sejam precisas e sem erros.
- **Arquivos de Conteúdo Integrados**: Mantenha suas traduções próximas de seus respectivos componentes, aprimorando a manutenção e a clareza.
- **Configuração Simplificada**: Comece rapidamente com configuração mínima, especialmente otimizada para projetos Next.js.
- **Suporte a Componentes de Servidor**: Perfeitamente adequado para componentes de servidor Next.js, garantindo uma renderização suave do lado do servidor.
- **Roteamento Aprimorado**: Suporte total ao roteamento de aplicativo Next.js, adaptando-se perfeitamente a estruturas de aplicativos complexas.
- **Interoperabilidade**: Permite interoperabilidade com i18next. (beta)
