# Personalização de Extensões de Conteúdo

## Extensões de Arquivo de Conteúdo

Intlayer permite que você personalize as extensões para seus arquivos de declaração de conteúdo. Essa personalização oferece flexibilidade na gestão de projetos em larga escala e ajuda a evitar conflitos com outros módulos.

### Extensões Padrão

Por padrão, o Intlayer observa todos os arquivos com as seguintes extensões para declarações de conteúdo:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Essas extensões padrão são adequadas para a maioria das aplicações. No entanto, quando você tem necessidades específicas, pode definir extensões personalizadas para simplificar o processo de construção e reduzir o risco de conflitos com outros componentes.

### Personalizando Extensões de Conteúdo

Para personalizar as extensões de arquivo que o Intlayer usa para identificar arquivos de declaração de conteúdo, você pode especificá-las no arquivo de configuração do Intlayer. Essa abordagem é benéfica para projetos em larga escala onde limitar o escopo do processo de observação melhora o desempenho da construção.

Aqui está um exemplo de como definir extensões de conteúdo personalizadas em sua configuração:

```typescript
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Suas extensões personalizadas
  },
};

export default config;
```

Neste exemplo, a configuração especifica duas extensões personalizadas: `.my_content.ts` e `.my_content.tsx`. O Intlayer irá observar apenas arquivos com essas extensões para construir dicionários.

### Benefícios das Extensões Personalizadas

- **Desempenho da Construção**: Reduzir o escopo dos arquivos observados pode melhorar significativamente o desempenho da construção em projetos grandes.
- **Evitando Conflitos**: Extensões personalizadas ajudam a prevenir conflitos com outros arquivos JavaScript ou TypeScript em seu projeto.
- **Organização**: Extensões personalizadas permitem que você organize seus arquivos de declaração de conteúdo de acordo com as necessidades do seu projeto.

### Diretrizes para Extensões Personalizadas

Ao personalizar as extensões de arquivo de conteúdo, mantenha as seguintes diretrizes em mente:

- **Exclusividade**: Escolha extensões que sejam exclusivas dentro do seu projeto para evitar conflitos.
- **Nomenclatura Consistente**: Use convenções de nomenclatura consistentes para melhor legibilidade e manutenção do código.
- **Evitando Extensões Comuns**: Evite usar extensões comuns como `.ts` ou `.js` para prevenir conflitos com outros módulos ou bibliotecas.

## Conclusão

Personalizar as extensões de arquivos de conteúdo no Intlayer é um recurso valioso para otimizar o desempenho e evitar conflitos em aplicações em larga escala. Seguindo as diretrizes delineadas nesta documentação, você pode gerenciar efetivamente suas declarações de conteúdo e garantir uma integração suave com outras partes do seu projeto.
