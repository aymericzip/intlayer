# Documentação: Função `t` em `express-intlayer`

A função `t` no pacote `express-intlayer` é a utilidade central para fornecer respostas localizadas em sua aplicação Express. Ela simplifica a internacionalização (i18n) ao selecionar dinamicamente o conteúdo com base na língua preferida do usuário.

---

## Visão Geral

A função `t` é usada para definir e recuperar traduções para um determinado conjunto de línguas. Ela determina automaticamente a língua apropriada a ser retornada com base nas configurações da solicitação do cliente, como o cabeçalho `Accept-Language`. Se a língua preferida não estiver disponível, ela recai graciosamente para o locale padrão especificado em sua configuração.

---

## Principais Recursos

- **Localização Dinâmica**: Seleciona automaticamente a tradução mais apropriada para o cliente.
- **Recuperação para Locale Padrão**: Retorna para um locale padrão se a língua preferida do cliente não estiver disponível, garantindo continuidade na experiência do usuário.
- **Leve e Rápido**: Projetado para aplicações de alto desempenho, garantindo sobrecarga mínima.
- **Suporte a Modo Estrito**: Impõe estrita aderência aos locales declarados para um comportamento confiável.

---

## Assinatura da Função

```typescript
t(traductions: Record<string, string>): string;
```

### Parâmetros

- `traductions`: Um objeto onde as chaves são códigos de locale (por exemplo, `en`, `fr`, `es-MX`) e os valores são as cadeias traduzidas correspondentes.

### Retornos

- Uma string representando o conteúdo na língua preferida do cliente.

---

## Carregando o Manipulador de Solicitação de Internacionalização

Para garantir que a funcionalidade de internacionalização fornecida pelo `express-intlayer` funcione corretamente, você **deve** carregar o middleware de internacionalização no início de sua aplicação Express. Isso habilita a função `t` e assegura o tratamento adequado da detecção de locale e tradução.

### Configuração de Middleware Necessária

```typescript
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Carregar manipulador de solicitação de internacionalização
app.use(intlayer());
```

### Posicionamento na Aplicação

Coloque o middleware `app.use(intlayer())` **antes de quaisquer rotas** em sua aplicação para garantir que todas as rotas se beneficiem da internacionalização:

```typescript
app.use(intlayer());

// Defina suas rotas após carregar o middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Por que Isso é Necessário

- **Detecção de Locale**: O middleware `intlayer` processa solicitações recebidas para detectar o locale preferido do usuário com base nos cabeçalhos, cookies ou outros métodos configurados.
- **Contexto de Tradução**: Configura o contexto necessário para a função `t` operar corretamente, garantindo que as traduções sejam retornadas no idioma correto.
- **Prevenção de Erros**: Sem esse middleware, usar a função `t` resultará em erros em tempo de execução, pois as informações de locale necessárias não estarão disponíveis.

---

## Exemplos de Uso

### Exemplo Básico

Sirva conteúdo localizado em diferentes idiomas:

```typescript
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Solicitações do Cliente:**

- Um cliente com `Accept-Language: fr` receberá `Bienvenue!`.
- Um cliente com `Accept-Language: es` receberá `¡Bienvenido!`.
- Um cliente com `Accept-Language: de` receberá `Welcome!` (locale padrão).

### Tratamento de Erros

Forneça mensagens de erro em várias línguas:

```typescript
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Usando Variantes de Locale

Especifique traduções para variantes de locale específicas:

```typescript
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Tópicos Avançados

### Mecanismo de Recuperação

Se um locale preferido não estiver disponível, a função `t` recairá para o locale padrão definido na configuração:

```typescript
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};
```

Por exemplo:

- Se `defaultLocale` for `Locales.CHINESE` e um cliente solicitar `Locales.DUTCH`, a tradução retornada será o valor de `Locales.CHINESE`.
- Se `defaultLocale` não estiver definido, a função `t` recairá para o valor de `Locales.ENGLISH`.

---

### Imposto de Modo Estrito

Configure a função `t` para impor estrita aderência aos locales declarados:

| Modo            | Comportamento                                                                              |
| --------------- | ------------------------------------------------------------------------------------------ |
| `strict`        | Todos os locales declarados devem ter traduções fornecidas. Locais ausentes gerarão erros. |
| `required_only` | Os locales declarados devem ter traduções. Locais ausentes geram avisos, mas são aceitos.  |
| `loose`         | Qualquer locale existente é aceito, mesmo que não declarado.                               |

Exemplo de Configuração:

```typescript
const config = {
  internationalization: {
    strictMode: "strict", // Impor modo estrito
  },
};
```

---

### Integração com TypeScript

A função `t` é segura em tipo quando usada com TypeScript. Defina um objeto de traduções seguro em tipo:

```typescript
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Erros Comuns e Soluções

| Problema                   | Causa                                        | Solução                                                                  |
| -------------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| Função `t` não funciona    | Middleware não carregado                     | Certifique-se de que `app.use(intlayer())` é adicionado antes das rotas. |
| Erro de traduções ausentes | Modo estrito habilitado sem todos os locales | Forneça todas as traduções necessárias.                                  |

---

## Dicas para Uso Eficaz

1. **Centralize Traduções**: Use um módulo centralizado ou arquivos JSON para gerenciar traduções para melhorar a manutenção.
2. **Valide Traduções**: Certifique-se de que cada variante de língua tem uma tradução correspondente para evitar retornos desnecessários.
3. **Combine com i18n Frontend**: Sincronize com a internacionalização do frontend para uma experiência de usuário contínua em todo o aplicativo.
4. **Avalie Desempenho**: Teste os tempos de resposta do seu aplicativo ao adicionar traduções para garantir impacto mínimo.

---

## Conclusão

A função `t` é uma ferramenta poderosa para internacionalização no backend. Ao usá-la de forma eficaz, você pode criar uma aplicação mais inclusiva e amigável para um público global. Para uso avançado e opções de configuração detalhadas, consulte a [documentação](https://github.com/aymericzip/intlayer/blob/main/docs/pt/configuration.md).
