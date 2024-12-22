# Começando a internacionalização (i18n) com Intlayer e Express

`express-intlayer` é um poderoso middleware de internacionalização (i18n) para aplicações Express, projetado para tornar seus serviços backend globalmente acessíveis, fornecendo respostas localizadas com base nas preferências do cliente.

## Por que Internacionalizar seu Backend?

Internacionalizar seu backend é essencial para atender efetivamente a um público global. Permite que sua aplicação entregue conteúdo e mensagens no idioma preferido de cada usuário. Essa capacidade aprimora a experiência do usuário e amplia o alcance da sua aplicação, tornando-a mais acessível e relevante para pessoas de diferentes origens linguísticas.

### Casos de Uso Práticos

- **Exibindo Erros do Backend na Linguagem do Usuário**: Quando ocorre um erro, exibir mensagens no idioma nativo do usuário melhora a compreensão e reduz a frustração. Isso é especialmente útil para mensagens de erro dinâmicas que podem ser exibidas em componentes front-end, como toasts ou modais.

- **Recuperando Conteúdo Multilíngue**: Para aplicações que puxam conteúdo de um banco de dados, a internacionalização garante que você possa servir esse conteúdo em vários idiomas. Isso é crucial para plataformas como sites de e-commerce ou sistemas de gerenciamento de conteúdo que precisam exibir descrições de produtos, artigos e outros conteúdos na linguagem preferida pelo usuário.

- **Enviando E-mails Multilíngues**: Seja para e-mails transacionais, campanhas de marketing ou notificações, enviar e-mails na linguagem do destinatário pode aumentar significativamente o engajamento e a efetividade.

- **Notificações Push Multilíngues**: Para aplicações móveis, enviar notificações push na linguagem preferida do usuário pode aprimorar a interação e a retenção. Esse toque pessoal pode tornar as notificações mais relevantes e acionáveis.

- **Outras Comunicações**: Qualquer forma de comunicação do backend, como mensagens SMS, alertas do sistema ou atualizações da interface do usuário, se beneficia de estar na linguagem do usuário, garantindo clareza e aprimorando a experiência geral do usuário.

Ao internacionalizar o backend, sua aplicação não apenas respeita as diferenças culturais, mas também se alinha melhor às necessidades do mercado global, tornando-se um passo crucial na escalabilidade de seus serviços em todo o mundo.

## Começando

### Instalação

Para começar a usar `express-intlayer`, instale o pacote usando npm:

```bash
npm install intlayer express-intlayer
```

```bash
pnpm add intlayer express-intlayer
```

```bash
yarn add intlayer express-intlayer
```

### Configuração

Configure as definições de internacionalização criando um `intlayer.config.ts` na raiz do seu projeto:

```typescript
// intlayer.config.ts
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Configuração da Aplicação Express

Configure sua aplicação Express para usar `express-intlayer`:

```typescript
// src/index.ts
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Carregar manipulador de requisições de internacionalização
app.use(intlayer());

// Rotas
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Exemplo de conteúdo retornado em inglês",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "Exemplo de conteúdo de erro retornado em inglês",
      fr: "Exemple de contenu d'erreur renvoyé en français",
      "es-ES": "Ejemplo de contenido de error devuelto en español (España)",
      "es-MX": "Ejemplo de conteúdo de erro retornado em espanhol (México)",
    })
  );
});

// Iniciar servidor
app.listen(3000, () => console.log(`Escutando na porta 3000`));
```

### Compatibilidade

`express-intlayer` é totalmente compatível com:

- `react-intlayer` para aplicações React
- `next-intlayer` para aplicações Next.js

Também funciona perfeitamente com qualquer solução de internacionalização em diversos ambientes, incluindo navegadores e requisições de API. Você pode personalizar o middleware para detectar o idioma através de cabeçalhos ou cookies:

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // Outras opções de configuração
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};
```

Por padrão, `express-intlayer` interpretará o cabeçalho `Accept-Language` para determinar a linguagem preferida do cliente.

> Para mais informações sobre configuração e tópicos avançados, visite nossa [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/concept/configuration).

## Potencializado por TypeScript

`express-intlayer` aproveita as robustas capacidades do TypeScript para aprimorar o processo de internacionalização. A tipagem estática do TypeScript garante que cada chave de tradução seja contabilizada, reduzindo o risco de traduções ausentes e melhorando a manutenção.

> Certifique-se de que os tipos gerados (por padrão em ./types/intlayer.d.ts) estão incluídos no seu arquivo tsconfig.json.
