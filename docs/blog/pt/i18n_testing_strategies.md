---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Como testar traduções sem criar testes frágeis"
description: O que vale a pena testar em uma aplicação i18n e o que não vale. Testes de renderização baseados em provider, pseudolocalização, cobertura de RTL e plurais, e a armadilha dos snapshots.
keywords:
  - testar traduções
  - testes i18n
  - testing library i18n
  - pseudolocalização
  - teste provider locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Como testar traduções sem criar testes frágeis

A maioria das suítes de testes de i18n falha por um de dois motivos. Ou fazem asserções sobre textos literais, fazendo com que qualquer alteração de redação quebre cinquenta testes e a equipe termine por deletá-los. Ou renderizam tudo no locale padrão, não provando nada sobre os outros dezessete. Ambos chegam ao mesmo destino, uma suíte na qual ninguém confia.

## Sumário

<TOC/>

## Os padrões são independentes de biblioteca

Cada padrão a seguir funciona em qualquer stack de i18n. Troque o provider por `I18nextProvider`, `NextIntlClientProvider` ou `IntlProvider` e os testes permanecerão idênticos, pois verificam a saída renderizada e não uma API de biblioteca específica.

As ferramentas de cobertura também se adaptam: com o [plugin Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/plugins/sync-json.md) apontado para seus catálogos existentes, ou um [adaptador de compatibilidade](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/index.md) criando aliases para seus imports atuais, a asserção de cobertura é executada diretamente contra o JSON que você já possui.

## Decida o que você realmente está testando

Qualidade de tradução não se valida com teste de código. Nenhuma asserção é capaz de informar se o alemão soa natural, e fingir o contrário apenas enche sua suíte de strings hardcoded.

O que vale a pena testar é mecânico:

| Vale a pena testar                         | Não vale a pena testar           |
| :----------------------------------------- | :------------------------------- |
| Cada locale obrigatório possui valor       | Se a redação é elegante          |
| O locale correto alcança o componente      | O texto exato de cada label      |
| Plurais resolvem para cada categoria       | Se o tradutor fez bem o trabalho |
| Locales RTL definem direção e espelhamento | Toda string em cada idioma       |
| Datas e números formatados usam o locale   | A precisão interna de `Intl`     |

A cobertura pertence a um teste orientado a dados, não aos seus testes de componentes. Isso é abordado em [detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md); este artigo trata do restante.

## Renderize com um provider e consulte por papel (role)

O padrão central consiste em montar o componente dentro de um provider de locale e consultar por role ou test id em vez de pelo texto.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renderiza o cabeçalho do resumo em francês", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Consultar `getByRole("heading")` sobrevive a mudanças de texto. `getByText("Récapitulatif")` falha com qualquer alteração. Use o texto literal somente quando a própria string for o objeto do teste, o que é raro.

Para atributos como `aria-label`, você precisa da string bruta e não de um nó renderizável. No React, as entradas de `useIntlayer` expõem um campo `.value` para essa finalidade.

## Parametrize os testes entre os locales

Um único corpo de teste executado para cada locale vale muito mais do que testes separados por idioma.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renderiza sem recorrer à chave não traduzida", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Uma chave renderizada indica falha na resolução.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("define a direção de texto correta", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

A primeira asserção traz um benefício genérico valioso: se uma chave falhar e a biblioteca renderizar a chave bruta, o DOM exibirá algo no formato `cart.summary.title`. Isso captura uma classe inteira de erros sem inspecionar uma única frase.

## A pseudolocalização encontra o que os catálogos não veem

Adicione um locale fictício que transforme cada texto, por exemplo alterando `Checkout` para `[!!! Çĥéçķöũţ !!!]`. Em seguida, renderize a página nessa linguagem.

Qualquer texto que ainda apareça em inglês padrão está hardcoded no código, e nenhuma auditoria em catálogos consegue detectar isso, pois para as ferramentas essa string simplesmente não existe. Os colchetes cumprem uma segunda função: expandem o texto em cerca de 30 por cento, expondo quebras de layout antes mesmo de testar em alemão.

Convém rodar isso em uma passagem visual ou end-to-end em vez de testes unitários, já que a falha é identificada visualmente.

## Plurais exigem um teste por categoria, não por idioma

Erros em plurais passam despercebidos porque o inglês possui apenas duas formas e a maioria dos desenvolvedores só testa essas. O polonês possui quatro, o árabe seis.

```ts fileName="plural.test.ts"
// O árabe cobre zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("quantidade %i", (count) => {
  it("produz uma string não vazia em árabe", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Escolha quantidades que atinjam cada categoria CLDR para o idioma mais exigente em vez de testar apenas 1 e 2 em todos os lugares. O `Intl.PluralRules` informa em qual categoria um número se encaixa, permitindo deduzir os casos de teste com exatidão. Mais detalhes no [artigo sobre o formato de mensagens ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md).

## A armadilha dos snapshots

Snapshots e i18n formam uma combinação perigosa. O snapshot de um componente localizado fixa todas as strings contidas nele: quando um tradutor corrige um erro no português, uma suíte verde fica vermelha, em um arquivo que nenhum revisor consegue avaliar adequadamente. Após a terceira ocorrência, alguém executa `-u` sem verificar o diff, e os snapshots perdem todo o sentido.

Se quiser usar snapshots, capture-os apenas em um único locale e trate-os como verificação puramente estrutural. Tudo que for específico de um locale deve estar em asserções explícitas.

## Teste a negociação do locale, não apenas a renderização

O bug de i18n mais frequente em produção não é uma string ausente. É a escolha do locale incorreto: a URL indica `/fr/`, o cliente lê `navigator.language`, e ambos entram em conflito.

Teste a ordem de resolução diretamente como uma função pura, separada de qualquer componente:

```ts fileName="locale-resolution.test.ts"
it("prioriza a URL em relação à preferência salva", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("usa o cabeçalho quando a URL não possui prefixo", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

Este é o teste de i18n de maior valor ausente na maioria dos projetos, e não requer nenhum DOM.

## O que rodar e onde

- **Unitários**: negociação de locale, formatadores, categorias de plural. Rápido, sem DOM.
- **Componentes**: uma renderização com provider por locale, validando roles e a ausência de chaves brutas.
- **Cobertura**: um teste orientado a dados que garanta a ausência de locales obrigatórios faltantes.
- **Visual ou end-to-end**: verificação com pseudolocalização e uma página RTL, pois são falhas visuais.

Mantenha os três primeiros na pipeline a cada commit. O último pode rodar em builds noturnos, poupando tempo em cada push.

## Erros comuns

- **Asserções em textos literais em toda parte.** Faz com que a suíte seja apagada em poucos meses.
- **Tirar snapshots de componentes localizados.** Tradutores quebram o build e revisores aprovam no piloto automático.
- **Testar somente o locale padrão.** O único locale que não tem como faltar.
- **Testar apenas 1 e 2 para plurais.** Ignora todas as categorias que o inglês não contempla.
- **Criar mocks da biblioteca de i18n.** Você passa a testar apenas se o seu mock retorna strings.
- **Nunca testar a negociação.** A falha mais comum em produção e a mais simples de testar.

## Para se aprofundar

- [Testar seu conteúdo: auditoria CLI, API programática e asserções de UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/testing.md)
- [Plugin ESLint: detecção de strings hardcoded e conteúdo não utilizado](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/eslint.md)
- [Formatadores e utilitários de locale, incluindo `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/formatters.md)
- [Relatórios de benchmark entre frameworks](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/index.md)
- [Adaptador de compatibilidade react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/compat/react-i18next.md)
- [Como detectar traduções ausentes](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/detecting_missing_translations.md)
- [Formato de mensagem ICU: plurais, select e skeletons](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pt/icu_message_format.md)
