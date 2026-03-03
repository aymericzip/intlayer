---
createdAt: 2026-02-09
updatedAt: 2026-02-12
title: Habilidades del Agente
description: Aprenda a usar las habilidades del agente Intlayer para mejorar la comprensión de su proyecto por parte de su agente de IA, incluyendo guías de configuración completas para metadatos, mapas del sitio y acciones del servidor.
keywords:
  - Intlayer
  - Habilidades del Agente
  - Agente de IA
  - Internacionalización
  - Documentación
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: Inicializar historial
---

# Habilidades del Agente

## El comando `intlayer init skills`

El comando `intlayer init skills` es la forma más fácil de configurar las habilidades del agente en tu proyecto. Detecta tu entorno e instala los archivos de configuración necesarios para tus plataformas preferidas.

```bash
npx intlayer init skills
```

O usando el SDK de Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

Cuando ejecutas este comando, este:

1.  Detectará el framework que estás usando (por ejemplo, Next.js, React, Vite).
2.  Te preguntará para qué plataformas quieres instalar las habilidades (Cursor, Windsurf, VS Code, OpenCode, Claude Code, GitHub Copilot Workspace, etc.).
3.  Generará los archivos de configuración necesarios (p. ej., `.cursor/skills/intlayer-next-js/SKILL.md`, `.windsurf/skills/intlayer-next-js/SKILL.md`, `.opencode/skills/intlayer-next-js/SKILL.md`, `.vscode/mcp.json`, etc.).

## Plataformas Soportadas

Intlayer proporciona documentación específica para el framework (Configuración, Uso, Metadatos, Mapa del sitio, Acciones del servidor, etc.) para ayudar al agente de IA a entender cómo trabajar con Intlayer en su proyecto específico. Estas habilidades están diseñadas para guiar al agente a través de las complejidades de la internacionalización, asegurando que siga los patrones y las mejores prácticas correctas.
