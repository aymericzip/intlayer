---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Comando Intlayer indefinido
description: Aprenda como corrigir o erro de comando intlayer indefinido.
keywords:
  - intlayer
  - comando
  - indefinido
  - erro
  - vscode
  - extensão
  - plugin
  - framework
  - next.js
  - vite
slugs:
  - doc
  - faq
  - intlayer-command-undefined
---

# Comando Intlayer indefinido

## Visão geral

A CLI do Intlayer oferece uma maneira conveniente de controlar seu conteúdo intlayer, incluindo a construção de dicionários, envio de traduções e mais. No entanto, ela não é essencial para o funcionamento do seu projeto. Se você estiver usando o plugin bundler (como `withIntlayer()` para Next.js ou `intlayerPlugin()` para Vite), o Intlayer construirá automaticamente os dicionários durante a compilação do app ou na inicialização do servidor de desenvolvimento. No modo de desenvolvimento, ele também observará as mudanças e reconstruirá automaticamente os arquivos de declaração de conteúdo.

Você pode acessar os comandos do intlayer de diferentes maneiras:

- Usando o comando CLI `intlayer` diretamente
- Usando a [extensão VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/vs_code_extension.md)
- Usando o SDK `@intlayer/cli`

## Problema

Ao tentar usar o comando `intlayer`, você pode encontrar este erro:

```bash
'intlayer' não é reconhecido como um comando interno ou externo,
programa operável ou arquivo em lote.
```

## Soluções

Tente estas soluções na ordem:

1. **Verifique se o comando está instalado**

```bash
npx intlayer -h
```

Saída esperada:

```bash
Usage: intlayer [options] [command]

Intlayer CLI

Options:
    -V, --version            output the version number
    -h, --help               display help for command

Commands:
    dictionary|dictionaries  Dictionaries operations
    configuration|config     Configuration operations
    help [command]           display help for command
```

2. **Instale o pacote intlayer-cli globalmente**

```bash
npm install intlayer-cli -g -g
```

> Não deve ser necessário se você já instalou o pacote `intlayer`

3. **Instale o pacote globalmente**

```bash
npm install intlayer -g
```

4. **Reinicie seu terminal**
   Às vezes, é necessário reiniciar o terminal para reconhecer novos comandos.

5. **Limpe e reinstale**
   Se as soluções acima não funcionarem:

```bash
rm -rf node_modules package-lock.json
npm install
```

6. **Verifique os arquivos de instalação**
   Se o problema persistir, verifique se estes arquivos existem:

   - `node_modules/intlayer/dist/cjs/cli.cjs`
   - `node_modules/intlayer/package.json` (deve conter um campo `bin` referenciando `./dist/cjs/cli.cjs`)

7. **Verifique a variável de ambiente PATH**
   Certifique-se de que o diretório global bin do npm está no seu PATH:

```bash
# Para sistemas baseados em Unix (macOS/Linux)
echo $PATH
# Deve incluir algo como /usr/local/bin ou ~/.npm-global/bin

# Para Windows
echo %PATH%
# Deve incluir o diretório bin global do npm
```

8. **Use npx com o caminho completo**
   Se o comando ainda não for encontrado, tente usar o npx com o caminho completo:

```bash
npx ./node_modules/intlayer/ dictionaries build
```

9. **Verifique instalações conflitantes**

```bash
# Liste todos os pacotes instalados globalmente
npm list -g --depth=0

# Remova quaisquer instalações globais conflitantes
npm uninstall -g intlayer
npm uninstall -g intlayer-cli
# Depois reinstale
npm install -g intlayer
```

10. **Verifique as versões do Node.js e npm**
    Certifique-se de que está usando versões compatíveis:

```bash
node --version
npm --version
```

    Se estiver usando uma versão desatualizada, considere atualizar o Node.js e o npm.

11. **Verifique problemas de permissão**
    Se você estiver recebendo erros de permissão:

    ```bash
    # Para sistemas baseados em Unix
    sudo npm install -g intlayer

    # Ou altere o diretório padrão do npm
    mkdir ~/.npm-global
    npm config set prefix '~/.npm-global'
    # Adicione ao seu ~/.profile ou ~/.bashrc:
    export PATH=~/.npm-global/bin:$PATH
    ```
