# Documentação: Função `getConfiguration` em `intlayer`

## Descrição:

A função `getConfiguration` recupera toda a configuração para o aplicativo `intlayer` extraindo variáveis de ambiente. Essa função oferece flexibilidade para utilizar a mesma configuração tanto no lado do cliente quanto no lado do servidor, garantindo consistência em toda a aplicação.

---

## Parâmetros:

A função não aceita parâmetros. Em vez disso, utiliza variáveis de ambiente para configuração.

### Retornos:

- **Tipo**: `IntlayerConfig`
- **Descrição**: Um objeto contendo a configuração completa para `intlayer`. A configuração inclui as seguintes seções:

  - `internationalization`: Configurações relacionadas a locais e modo estrito.
  - `middleware`: Configurações relacionadas a gerenciamento de URL e cookies.
  - `content`: Configurações relacionadas a arquivos de conteúdo, diretórios e padrões.
  - `editor`: Configurações específicas do editor.

Veja [documentação de configuração do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md) para mais detalhes.

---

## Exemplo de Uso:

### Recuperando a Configuração Completa:

```typescript
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Saída:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Extraindo `availableLocales` e `defaultLocale`:

A seção `internationalization` da configuração fornece configurações relacionadas a locais, como `locales` (locais disponíveis) e `defaultLocale` (idioma de fallback).

```typescript
const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Exemplo de saída: ["en", "fr", "es"]
console.log(defaultLocale); // Exemplo de saída: "en"
console.log(cookieName); // Saída: "INTLAYER_LOCALE"
```

## Notas:

- Certifique-se de que todas as variáveis de ambiente necessárias estejam corretamente definidas antes de chamar esta função. Variáveis ausentes causarão erros durante a inicialização.
- Esta função pode ser usada tanto no lado do cliente quanto no lado do servidor, tornando-se uma ferramenta versátil para gerenciar configurações de maneira unificada.

## Uso em Aplicações:

A função `getConfiguration` é uma ferramenta fundamental para inicializar e gerenciar a configuração de um aplicativo `intlayer`. Ao fornecer acesso a configurações como locais, middleware e diretórios de conteúdo, garante consistência e escalabilidade em aplicações multilíngues e orientadas a conteúdo.
