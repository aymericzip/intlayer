---
createdAt: 2026-04-20
updatedAt: 2026-04-20
title: Benchmark das bibliotecas de i18n
description: Saiba como o Intlayer se compara a outras bibliotecas de i18n em termos de desempenho e tamanho do bundle.
keywords:
  - benchmark
  - i18n
  - intl
  - nextjs
  - tanstack
  - intlayer
slugs:
  - doc
  - benchmark
history:
  - version: 8.7.5
    date: 2026-01-06
    changes: "Início do benchmark"
---

# Benchmark Bloom — Relatório

O Benchmark Bloom é uma suíte de testes de desempenho que mede o impacto real das bibliotecas de i18n (internacionalização) em múltiplos frameworks React e estratégias de carregamento.

Encontre os relatórios detalhados e a documentação técnica para cada framework abaixo:

- [**Relatório de Benchmark do Next.js**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/nextjs.md)
- [**Relatório de Benchmark do TanStack Start**](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/benchmark/tanstack.md)

---

## Resultados Atuais

Consulte o [**painel interativo do benchmark**](https://intlayer.org/benchmark) para ver comparações ao vivo e dados resumidos.
| `scoped-dynamic` | Alta (vazamento quase nulo) | Alta |

Mudar de `static` para `scoped-dynamic` geralmente reduz o conteúdo não utilizado em 60–90%, mas requer significativamente mais configuração. Bibliotecas como o Intlayer automatizam o padrão scoped-dynamic para que os desenvolvedores obtenham eficiência sem o código repetitivo (boilerplate).

### Lendo os números de vazamento (leakage)

Um vazamento de página de **35%** significa que 35% do JavaScript baixado para aquela página contém textos de outras páginas — conteúdo que o usuário não consegue ver nesta página. Em uma página de 400 KB, isso representa ~140 KB de dados evitáveis.

Um vazamento de localidade (locale leakage) de **10%** significa que 10% do bundle contém traduções em idiomas que o usuário atual não está usando.

### Reatividade vs tempo de renderização

- **Reatividade E2E**: mede a experiência completa do usuário: rede, sobrecarga do framework, atualização do DOM.
- **Tempo do React Profiler**: isola o custo de re-renderização da árvore React.

Uma biblioteca pode ter um tempo de Profiler baixo, mas um tempo E2E alto se a troca de idioma envolver uma requisição de rede (busca do novo arquivo de idioma). Por outro lado, uma biblioteca pode ter um tempo de Profiler alto, mas ainda assim parecer rápida se agrupar as atualizações de forma eficiente.
