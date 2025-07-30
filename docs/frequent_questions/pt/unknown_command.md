---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando desconhecido
description: Saiba como corrigir o erro de comando desconhecido.
keywords:
  - desconhecido
  - comando
  - erro
  - intlayer
  - fill
  - build
  - verbose
  - terminal
  - reiniciar
  - local
slugs:
  - doc
  - faq
  - unknown-command
---

# erro: comando desconhecido fill / build / etc

Se `npx intlayer fill --verbose` retornar:

```
error: unknown command 'fill'
```

mas você tem certeza que o comando `fill` _deveria_ existir, aqui estão os passos para resolver:

## 1. **Garanta que você está usando a versão mais recente**

Execute:

```bash
npx intlayer --version                  # versão atual do intlayer local
npx intlayer@latest --version           # versão mais recente do intlayer
```

Isso força o `npx` a buscar a versão mais recente. Depois tente novamente:

```bash
npx intlayer@latest build --verbose
```

## 2. **Verifique se o comando está registrado**

Você pode verificar com:

```bash
npx intlayer --help                     # fornece informações relacionadas aos comandos
```

Veja se o comando aparece na lista de comandos.

Vá ao repositório e confirme que seu comando está exportado e registrado no ponto de entrada da CLI. O Intlayer usa o `commander` como framework.

Código relacionado à CLI:
https://github.com/aymericzip/intlayer/blob/main/packages/%40intlayer/cli/src/cli.ts

## 4. **Reinicie seu terminal**

Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

## 5. **Se você está desenvolvendo o `intlayer`, reconstrua e vincule-o**

Se você está desenvolvendo o `intlayer` localmente:

```bash
# No diretório do intlayer
npm install
npm run build
npm link
```

Então, em outro terminal:

```bash
intlayer fill --verbose
```

Isso usa a versão local na qual você está trabalhando.

## 6. **Limpe o cache do npx (se estiver preso a uma versão antiga)**

```bash
npx clear-npx-cache
```

Ou exclua manualmente os pacotes intlayer em cache:

```bash
rm -rf ~/.npm/_npx
```

Verifique o equivalente se você usar pnpm, yarn, bun ou outro gerenciador de pacotes
