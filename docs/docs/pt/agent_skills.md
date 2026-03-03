---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Habilidades do Agente
description: Aprenda como usar as Habilidades do Agente Intlayer para melhorar a compreensão do seu projeto pelo seu agente de IA, incluindo guias de configuração abrangentes para Metadados, Sitemaps e Server Actions.
keywords:
  - Intlayer
  - Habilidades do Agente
  - Agente de IA
  - Internacionalização
  - Documentação
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Inicializar histórico
---

# Habilidades do Agente

## O comando `intlayer init skills`

O comando `intlayer init skills` é a maneira mais fácil de configurar as habilidades do agente no seu projeto. Ele detecta seu ambiente e instala los arquivos de configuração necessários para suas plataformas preferidas.

```bash
npx intlayer init skills
```

Ou usando o SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

Quando você executa este comando, ele irá:

1.  Detectar o framework que você está usando (ex: Next.js, React, Vite).
2.  Perguntar para quais plataformas você deseja instalar habilidades (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, etc.).
3.  Gerar os arquivos de configuração necessários (como `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json`, etc.).

## Plataformas Suportadas

O Intlayer fornece documentação específica da estrutura (Configuração, Uso, Metadados, Sitemap, Server Actions, etc.) para ajudar o agente de IA a entender como trabalhar com o Intlayer em seu projeto específico. Essas habilidades são projetadas para guiar o agente através das complexidades da internacionalização, garantindo que ele siga os padrões e as melhores práticas corretas.
