# Documentação: Função `t` em `next-intlayer`

A função `t` no pacote `next-intlayer` é uma ferramenta fundamental para internacionalização inline dentro da sua aplicação Next.js. Ela permite que você defina traduções diretamente dentro de seus componentes, facilitando a exibição de conteúdo localizado com base na localidade atual.

---

## Visão Geral

A função `t` é usada para fornecer traduções para diferentes localidades diretamente em seus componentes. Ao passar um objeto contendo traduções para cada localidade suportada, `t` retorna a tradução apropriada com base no contexto de localidade atual em sua aplicação Next.js.

---

## Principais Características

- **Traduções Inline**: Ideal para texto rápido e inline que não requer uma declaração de conteúdo separada.
- **Seleção Automática de Localidade**: Retorna a tradução correspondente à localidade atual automaticamente.
- **Suporte a TypeScript**: Oferece segurança de tipo e autocompletar quando usado com TypeScript.
- **Fácil Integração**: Funciona perfeitamente tanto em componentes de cliente quanto de servidor no Next.js.

---

## Assinatura da Função

```typescript
t<T extends string>(content: Record<LocalesValues, T>, locale?: Locales): string
```

### Parâmetros

- `translations`: Um objeto onde as chaves são códigos de localidade (por exemplo, `en`, `fr`, `es`) e os valores são as strings traduzidas correspondentes.

### Retornos

- Uma string representando o conteúdo traduzido para a localidade atual.

---

## Exemplos de Uso

### Usando `t` em um Componente de Cliente

Certifique-se de incluir a diretiva `'use client';` no topo do arquivo do seu componente ao usar `t` em um componente do lado do cliente.

```tsx
"use client";

import { t } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a client component example",
          fr: "Ceci est le contenu d'un exemple de composant client",
          es: "Este es el contenido d un ejemplo de componente cliente",
        })}
      </p>
    </div>
  );
};
```

### Usando `t` em um Componente de Servidor

```tsx
import { t } from "next-intlayer/server";

export const ServerComponentExample = () => {
  return (
    <div>
      <p>
        {t({
          en: "This is the content of a server component example",
          fr: "Ceci est le contenu d'un exemple de composant serveur",
          es: "Este es el contenido de un ejemplo de componente servidor",
        })}
      </p>
    </div>
  );
};
```

### Traduções Inline em Atributos

A função `t` é particularmente útil para traduções inline em atributos JSX.
Ao localizar atributos como `alt`, `title`, `href` ou `aria-label`, você pode usar `t` diretamente dentro do atributo.

```tsx
<button
  aria-label={t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
>
  {t({
    en: "Submit",
    fr: "Soumettre",
    es: "Enviar",
  })}
  <img
    src="/path/to/image"
    alt={t({
      en: "A beautiful scenery",
      fr: "Un beau paysage",
      es: "Un hermoso paisaje",
    })}
  />
</button>
```

---

## Tópicos Avançados

### Integração com TypeScript

A função `t` é segura em termos de tipo quando usada com TypeScript, garantindo que todas as localidades obrigatórias sejam fornecidas.

```typescript
import { t, type IConfigLocales } from "next-intlayer";

const translations: IConfigLocales<string> = {
  en: "Welcome",
  fr: "Bienvenue",
  es: "Bienvenido",
};

const greeting = t(translations);
```

### Detecção de Localidade e Contexto

No `next-intlayer`, a localidade atual é gerenciada através de provedores de contexto: `IntlayerClientProvider` e `IntlayerServerProvider`. Certifique-se de que esses provedores envolvam seus componentes e que a propriedade `locale` seja passada corretamente.

#### Exemplo:

```tsx
import { IntlayerClientProvider } from "next-intlayer";

const Page = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <IntlayerClientProvider locale={locale}>
      {/* Seus componentes aqui */}
    </IntlayerClientProvider>
  </IntlayerServerProvider>
);
```

---

## Erros Comuns e Solução de Problemas

### `t` Retorna Indefinido ou Tradução Incorreta

- **Causa**: A localidade atual não está configurada corretamente ou a tradução para a localidade atual está ausente.
- **Solução**:
  - Verifique se o `IntlayerClientProvider` ou `IntlayerServerProvider` está configurado corretamente com a `locale` apropriada.
  - Certifique-se de que seu objeto de traduções inclui todas as localidades necessárias.

### Traduções Ausentes em TypeScript

- **Causa**: O objeto de traduções não atende às localidades exigidas, resultando em erros do TypeScript.
- **Solução**: Use o tipo `IConfigLocales` para garantir a completude de suas traduções.

```typescript
const translations: IConfigLocales<string> = {
  en: "Text",
  fr: "Texte",
  // es: 'Texto', // Faltando 'es' causará um erro de TypeScript
};

const text = t(translations);
```

---

## Dicas para Uso Eficaz

1. **Use `t` para Traduções Simples Inline**: Ideal para traduzir pequenas partes de texto diretamente dentro de seus componentes.
2. **Prefira `useIntlayer` para Conteúdo Estruturado**: Para traduções mais complexas e reutilização de conteúdo, defina o conteúdo em arquivos de declaração e use `useIntlayer`.
3. **Provisão Consistente da Localidade**: Certifique-se de que sua localidade seja consistentemente fornecida em toda a sua aplicação através dos provedores apropriados.
4. **Aproveite o TypeScript**: Use tipos do TypeScript para identificar traduções ausentes e garantir segurança de tipo.

---

## Conclusão

A função `t` no `next-intlayer` é uma ferramenta poderosa e conveniente para gerenciar traduções inline em suas aplicações Next.js. Ao integrá-la de forma eficaz, você aprimora as capacidades de internacionalização de seu aplicativo, proporcionando uma melhor experiência para os usuários em todo o mundo.

Para um uso mais detalhado e recursos avançados, consulte a [documentação do next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_editor.md).

---

**Nota**: Lembre-se de configurar corretamente seus `IntlayerClientProvider` e `IntlayerServerProvider` para garantir que a localidade atual seja passada corretamente para seus componentes. Isso é crucial para que a função `t` retorne as traduções corretas.
