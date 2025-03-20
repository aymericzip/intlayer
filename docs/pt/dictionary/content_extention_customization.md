# Personalização de Extensões de Conteúdo

## Extensões de Arquivos de Conteúdo

O Intlayer permite que você personalize as extensões para os arquivos de declaração de conteúdo. Essa personalização oferece flexibilidade no gerenciamento de projetos em larga escala e ajuda a evitar conflitos com outros módulos.

### Extensões Padrão

Por padrão, o Intlayer monitora todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, quando você tem necessidades específicas, pode definir extensões personalizadas para otimizar o processo de construção e reduzir o risco de conflitos com outros componentes.

### Personalizando Extensões de Conteúdo

Para personalizar as extensões de arquivos que o Intlayer usa para identificar arquivos de declaração de conteúdo, você pode especificá-las no arquivo de configuração do Intlayer. Essa abordagem é benéfica para projetos em larga escala, onde limitar o escopo do processo de monitoramento melhora o desempenho da construção.

Aqui está um exemplo de como definir extensões de conteúdo personalizadas na sua configuração:

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

Neste exemplo, a configuração especifica duas extensões personalizadas: `.my_content.ts` e `.my_content.tsx`. O Intlayer monitorará apenas arquivos com essas extensões para construir dicionários.

### Benefícios das Extensões Personalizadas

- **Desempenho de Construção**: Reduzir o escopo dos arquivos monitorados pode melhorar significativamente o desempenho da construção em projetos grandes.
- **Evitar Conflitos**: Extensões personalizadas ajudam a evitar conflitos com outros arquivos JavaScript ou TypeScript no seu projeto.
- **Organização**: Extensões personalizadas permitem organizar seus arquivos de declaração de conteúdo de acordo com as necessidades do seu projeto.

### Diretrizes para Extensões Personalizadas

Ao personalizar extensões de arquivos de conteúdo, mantenha as seguintes diretrizes em mente:

- **Unicidade**: Escolha extensões que sejam únicas dentro do seu projeto para evitar conflitos.
- **Nomenclatura Consistente**: Use convenções de nomenclatura consistentes para melhor legibilidade e manutenção do código.
- **Evitar Extensões Comuns**: Evite usar extensões comuns como `.ts` ou `.js` para prevenir conflitos com outros módulos ou bibliotecas.

## Conclusão

Personalizar extensões de arquivos de conteúdo no Intlayer é um recurso valioso para otimizar o desempenho e evitar conflitos em aplicações de grande escala. Seguindo as diretrizes descritas nesta documentação, você pode gerenciar efetivamente suas declarações de conteúdo e garantir uma integração tranquila com outras partes do seu projeto.
