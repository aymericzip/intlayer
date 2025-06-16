# Arquivos de Declaração de Conteúdo Preenchidos Automaticamente

Os **arquivos de declaração de conteúdo preenchidos automaticamente** são uma maneira de acelerar seu fluxo de trabalho de desenvolvimento.

O mecanismo de preenchimento automático funciona através de uma relação _mestre-escravo_ entre os arquivos de declaração de conteúdo. Quando o arquivo principal (mestre) é atualizado, o Intlayer aplicará automaticamente essas alterações aos arquivos de declaração derivados (preenchidos automaticamente).

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  autoFill: "./example.content.json",
  content: {
    contentExample: "This is an example of content",
  },
} satisfies Dictionary;

export default exampleContent;
```

Aqui está um [arquivo de declaração de conteúdo por idioma](https://github.com/aymericzip/intlayer/blob/main/docs/pt/per_locale_file.md) usando a instrução `autoFill`.

Então, quando você executa o seguinte comando:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

O Intlayer gerará automaticamente o arquivo de declaração derivado em `src/components/example/example.content.json`, preenchendo todos os idiomas ainda não declarados no arquivo principal.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Posteriormente, ambos os arquivos de declaração serão mesclados em um único dicionário, acessível usando o hook padrão `useIntlayer("example")` (react) / composable (vue).

## Formato de Arquivos Preenchidos Automaticamente

O formato recomendado para arquivos de declaração preenchidos automaticamente é **JSON**, o que ajuda a evitar restrições de formatação. No entanto, o Intlayer também suporta formatos `.ts`, `.js`, `.mjs`, `.cjs` e outros.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "./example.filled.content.ts",
  content: {
    // Seu conteúdo
  },
};
```

Isso gerará o arquivo em:

```
src/components/example/example.filled.content.ts
```

> A geração de arquivos `.js`, `.ts` e similares funciona da seguinte maneira:
>
> - Se o arquivo já existir, o Intlayer o analisará usando o AST (Árvore de Sintaxe Abstrata) para localizar cada campo e inserir as traduções faltantes.
> - Se o arquivo não existir, o Intlayer o gerará usando o modelo padrão para arquivos de declaração de conteúdo.

## Caminhos Absolutos

O campo `autoFill` também suporta caminhos absolutos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/example.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso gerará o arquivo em:

```
/messages/example.content.json
```

## Geração Automática de Arquivos de Declaração de Conteúdo por Idioma

O campo `autoFill` também suporta a geração de arquivos de declaração de conteúdo **por idioma**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Seu conteúdo
  },
};
```

Isso gerará dois arquivos separados:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

## Filtrar Preenchimento Automático por Idioma Específico

O uso de um objeto para o campo `autoFill` permite que você aplique filtros e gere apenas arquivos de idioma específicos.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Seu conteúdo
  },
};
```

Isso gerará apenas o arquivo de tradução francês.

## Variáveis de Caminho

Você pode usar variáveis dentro do caminho `autoFill` para resolver dinamicamente os caminhos de destino para os arquivos gerados.

**Variáveis disponíveis:**

- `{{locale}}` – Código do idioma (ex. `fr`, `es`)
- `{{key}}` – Chave do dicionário (ex. `example`)

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  autoFill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Seu conteúdo
  },
};
```

Isso gerará:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`
