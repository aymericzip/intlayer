# Personalização de Extensões de Conteúdo

## Extensões de Arquivos de Conteúdo

Intlayer permite que você personalize as extensões dos seus arquivos de declaração de conteúdo. Esta personalização oferece flexibilidade na gestão de projetos de grande escala e ajuda a evitar conflitos com outros módulos.

### Extensões Padrão

Por padrão, Intlayer observa todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, quando você tem necessidades específicas, pode definir extensões personalizadas para agilizar o processo de build e reduzir o risco de conflitos com outros componentes.

### Personalizando Extensões de Conteúdo

Para personalizar as extensões de arquivo que o Intlayer usa para identificar arquivos de declaração de conteúdo, você pode especificá-las no arquivo de configuração do Intlayer. Esta abordagem é benéfica para projetos de grande escala, onde limitar o escopo do processo de observação melhora o desempenho da construção.

Aqui está um exemplo de como definir extensões de conteúdo personalizadas em sua configuração:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Suas extensões personalizadas
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Suas extensões personalizadas
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Suas extensões personalizadas
  },
};

module.exports = config;
```

Neste exemplo, a configuração especifica duas extensões personalizadas: `.my_content.ts` e `.my_content.tsx`. Intlayer irá observar apenas arquivos com essas extensões para construir dicionários.

### Benefícios de Extensões Personalizadas

- **Desempenho de Construção**: Reduzir o escopo dos arquivos observados pode melhorar significativamente o desempenho da construção em projetos grandes.
- **Evitação de Conflitos**: Extensões personalizadas ajudam a evitar conflitos com outros arquivos JavaScript ou TypeScript em seu projeto.
- **Organização**: Extensões personalizadas permitem que você organize seus arquivos de declaração de conteúdo de acordo com as necessidades do seu projeto.

### Diretrizes para Extensões Personalizadas

Ao personalizar extensões de arquivos de conteúdo, mantenha as seguintes diretrizes em mente:

- **Unicidade**: Escolha extensões que sejam únicas dentro do seu projeto para evitar conflitos.
- **Nomenclatura Consistente**: Use convenções de nomenclatura consistentes para melhor legibilidade e manutenção do código.
- **Evitando Extensões Comuns**: Evite usar extensões comuns como `.ts` ou `.js` para prevenir conflitos com outros módulos ou bibliotecas.

## Conclusão

Personalizar extensões de arquivos de conteúdo no Intlayer é um recurso valioso para otimizar o desempenho e evitar conflitos em aplicações de grande escala. Seguindo as diretrizes descritas nesta documentação, você pode gerenciar efetivamente suas declarações de conteúdo e garantir uma integração suave com outras partes do seu projeto.
