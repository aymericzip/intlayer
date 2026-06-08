---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Depurar comando Intlayer
description: Aprenda como depurar e solucionar problemas da CLI do Intlayer.
keywords:
  - Depurar
  - Solucionar problemas
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Depurar comando intlayer

## 1. **Garanta que está usando a versão mais recente**

Execute:

```bash packageManager="npm"
npx intlayer --version                  # versão atual do intlayer no locale
npx intlayer@latest --version           # versão mais recente atual do intlayer
```

```bash packageManager="yarn"
yarn intlayer --version                  # versão atual do intlayer no locale
yarn intlayer@latest --version           # versão mais recente atual do intlayer
```

```bash packageManager="pnpm"
pnpm intlayer --version                  # versão atual do intlayer no locale
pnpm intlayer@latest --version           # versão mais recente atual do intlayer
```

```bash packageManager="bun"
bun x intlayer --version                  # versão atual do intlayer no locale
bun x intlayer@latest --version           # versão mais recente atual do intlayer
```

## 2. **Verifique se o comando está registrado**

Você pode verificar com:

```bash packageManager="npm"
npx intlayer --help                     # Mostra a lista de comandos disponíveis e informações de uso
npx intlayer dictionary build --help    # Mostra a lista de opções disponíveis para um comando
```

```bash packageManager="yarn"
yarn intlayer --help                     # Mostra a lista de comandos disponíveis e informações de uso
yarn intlayer dictionary build --help    # Mostra a lista de opções disponíveis para um comando
```

```bash packageManager="pnpm"
pnpm intlayer --help                     # Mostra a lista de comandos disponíveis e informações de uso
pnpm intlayer dictionary build --help    # Mostra a lista de opções disponíveis para um comando
```

```bash packageManager="bun"
bun x intlayer --help                     # Mostra a lista de comandos disponíveis e informações de uso
bun x intlayer dictionary build --help    # Mostra a lista de opções disponíveis para um comando
```

## 3. **Reinicie o seu terminal**

Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

## 4. **Limpe o cache do npx (se estiver preso a uma versão antiga)**

```bash
npx clear-npx-cache
```
