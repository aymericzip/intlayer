---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Revisar Documento
description: Aprenda como revisar arquivos de documentação para qualidade, consistência e completude em diferentes locais.
keywords:
  - Revisão
  - Documento
  - Documentação
  - IA
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - doc-review
---

# Revisar Documento

O comando `doc review` analisa arquivos de documentação para qualidade, consistência e completude em diferentes locais.

## Pontos-chave:

- Divide arquivos markdown grandes em partes para permanecer dentro dos limites da janela de contexto do modelo de IA.
- Otimiza as partes a revisar e omite as partes que já estão traduzidas e não foram alteradas.
- Processa arquivos, partes e locales em paralelo usando um sistema de fila para aumentar a velocidade.

```bash
npx intlayer doc review
```

Ele pode ser usado para revisar arquivos que já estão traduzidos e para verificar se a tradução está correta.

Para a maioria dos casos de uso,

- prefira usar o `doc translate` quando a versão traduzida deste arquivo não estiver disponível.
- prefira usar o `doc review` quando a versão traduzida deste arquivo já existir.

> Note que o processo de revisão consome mais tokens de entrada do que o processo de tradução para revisar o mesmo arquivo completamente. No entanto, o processo de revisão irá otimizar os chunks a serem revisados e pulará as partes que não foram alteradas.

## Argumentos:

O comando `doc review` aceita os mesmos argumentos que o `doc translate`, permitindo que você revise arquivos de documentação específicos e aplique verificações de qualidade.

Se você ativou uma das opções do git, o comando revisará apenas a parte dos arquivos que está sendo alterada. O script processará dividindo o arquivo em chunks e revisará cada chunk. Se não houver alterações no chunk, o script o pulará para acelerar o processo de revisão e limitar o custo da API do Provedor de IA.

Para uma lista completa de argumentos, consulte a documentação do comando [Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/cli/doc-translate.md).
