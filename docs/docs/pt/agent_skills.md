---
createdAt: 2026-02-09
updatedAt: 2026-03-03
title: Competências do Agente
description: Aprenda a usar as Intlayer Agent Skills para melhorar a compreensão do seu projeto pelo seu agente de IA, incluindo guias de configuração abrangentes para Metadados, Sitemaps e Ações do Servidor.
keywords:
  - Intlayer
  - Competências do Agente
  - Agente de IA
  - Internacionalização
  - Documentação
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Init history
---

# Competências do Agente

## Inicialização

### Usando a CLI

O comando `intlayer init skills` é a maneira mais fácil de configurar as competências do agente em seu projeto. Ele detecta seu ambiente e instala os arquivos de configuração necessários para suas plataformas preferidas.

```bash
npx intlayer init skills
```

### Usando o SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Usando a extensão do VS Code

1. Abra a Paleta de Comandos (Ctrl+Shift+P ou Cmd+Shift+P).
2. Digite `Intlayer: Setup AI Agent Skills`.
3. Escolha a plataforma que você usa (ex: `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, etc.).
4. Escolha as competências que deseja instalar (ex: `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Pressione Enter.

## Lista de Competências

**intlayer-config**

- Capacita o agente a entender as configurações de i18n específicas do seu projeto, permitindo-lhe configurar com precisão os locais, os padrões de roteamento e as estratégias de fallback.

**intlayer-cli**

- Permite que o agente gerencie autonomamente o seu ciclo de vida de tradução, incluindo a auditoria de traduções em falta, a criação de dicionários e a sincronização de conteúdos através da linha de comandos.

**intlayer-angular**

- Equipar o agente com conhecimentos específicos da framework para implementar corretamente padrões i18n reativos e sinais de acordo com as melhores práticas Angular.

**intlayer-astro**

- Fornece ao agente os conhecimentos necessários para lidar com traduções do lado do servidor e padrões de roteamento localizados exclusivos do ecossistema Astro.

**intlayer-content**

- Ensina o agente a utilizar nós de conteúdo avançados – tais como pluralização, condições e markdown – para construir dicionários ricos, dinâmicos e localizados.

**intlayer-next-js**

- Dá ao agente a profundidade necessária para implementar i18n em componentes Server e Client de Next.js, assegurando a otimização SEO e um roteamento localizado suave.

**intlayer-react**

- Fornece conhecimentos especializados para o agente implementar componentes e hooks i18n declarativos de forma eficiente em qualquer ambiente baseado em React.

**intlayer-preact**

- Otimiza a capacidade do agente para implementar i18n para Preact, permitindo-lhe escrever componentes leves e localizados usando sinais e padrões reativos eficientes.

**intlayer-solid**

- Permite ao agente tirar partido da reatividade de grão fino do SolidJS para uma gestão de conteúdos localizados de alto desempenho.

**intlayer-svelte**

- Ensina o agente a utilizar stores Svelte e uma sintaxe idiomática para conteúdos localizados reativos e com tipagem segura nas aplicações Svelte e SvelteKit.

**intlayer-cms**

- Permite ao agente integrar e gerir conteúdos remotos, permitindo-lhe lidar com fluxos de trabalho de sincronização em tempo real e tradição remota através do CMS Intlayer.

**intlayer-usage**

- Normaliza a abordagem do agente quanto à estrutura do projeto e à declaração de conteúdos, assegurando que este segue os fluxos de trabalho mais eficazes para o seu projeto i18n.

**intlayer-vue**

- Equipar o agente com padrões específicos de Vue – incluindo Composables e suporte Nuxt – para criar aplicações web modernas e localizadas.

**intlayer-compiler**

- Simplifica o fluxo de trabalho do agente ao permitir a extração automática de conteúdos, permitindo-lhe escrever strings traduzíveis diretamente no código sem ficheiros de dicionários manuais.
