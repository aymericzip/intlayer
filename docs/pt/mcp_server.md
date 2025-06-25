---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: Documentação do servidor MCP
description: Explore os recursos e a configuração do servidor MCP para otimizar o gerenciamento e as operações do seu servidor.
keywords:
  - Servidor MCP
  - Gerenciamento de servidor
  - Otimização
  - Intlayer
  - Documentação
  - Configuração
  - Recursos
---

# Documentação do Servidor Intlayer MCP

O **Servidor Intlayer MCP (Model Context Protocol)** fornece assistência IDE com inteligência artificial personalizada para o ecossistema Intlayer. Projetado para ambientes de desenvolvimento modernos como **Cursor**, **GitHub Copilot workspace** e qualquer IDE que suporte o protocolo MCP, este servidor oferece suporte contextual e em tempo real com base na configuração do seu projeto.

## Por que usar o Servidor Intlayer MCP?

Ao habilitar o Servidor Intlayer MCP no seu IDE, você desbloqueia:

- **Integração Inteligente com CLI**
  Acesse e execute comandos CLI do Intlayer diretamente da interface do seu IDE. Veja a lista completa de comandos e opções na [documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **Documentação Contextual**
  O servidor MCP carrega e expõe a documentação correspondente à versão do Intlayer que você está usando no seu projeto. Isso garante que sugestões de código, opções de comando e explicações estejam sempre atualizadas e relevantes.

- **Desenvolvimento Assistido por IA**
  Com sugestões e autocompletar baseados no projeto, o assistente de IA pode explicar seu código, recomendar o uso do CLI ou sugerir como usar recursos específicos do Intlayer com base nos seus arquivos atuais.

- **Configuração Leve e Instantânea**
  Sem necessidade de manutenção de servidor ou instalação pesada. Basta configurar seu arquivo `.cursor/mcp.json` ou equivalente e você estará pronto para começar.

---

## Configurar Cursor

No diretório raiz do seu projeto, adicione o seguinte arquivo de configuração `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

Isso informa ao seu IDE para iniciar o servidor Intlayer MCP usando `npx`, garantindo que ele sempre use a versão mais recente disponível, a menos que você a fixe.

---

## Configurar VS Code

Para usar o Servidor Intlayer MCP com o VS Code, você precisa configurá-lo nas configurações do seu workspace ou do usuário.

### Configuração do Workspace

Crie um arquivo `.vscode/mcp.json` no diretório raiz do seu projeto:

```json
{
  "servers": {
    "intlayer": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Usando o Servidor MCP no VS Code

1. **Habilitar o Modo Agente**: Abra a visualização de Chat (⌃⌘I no Mac, Ctrl+Alt+I no Windows/Linux) e selecione o modo **Agente** no menu suspenso.

2. **Acessar Ferramentas**: Clique no botão **Ferramentas** para visualizar as ferramentas disponíveis do Intlayer. Você pode selecionar/deselecionar ferramentas específicas conforme necessário.

3. **Referência Direta de Ferramentas**: Faça referência às ferramentas diretamente nos seus prompts digitando `#` seguido do nome da ferramenta.

4. **Confirmação de Ferramentas**: Por padrão, o VS Code pedirá confirmação antes de executar ferramentas. Use as opções do botão **Continuar** para confirmar automaticamente ferramentas para a sessão atual, workspace ou todas as futuras invocações.

### Gerenciando o Servidor

- Execute **MCP: List Servers** no Command Palette para visualizar os servidores configurados
- Inicie, pare ou reinicie o servidor Intlayer MCP conforme necessário
- Visualize os logs do servidor para solução de problemas selecionando o servidor e escolhendo **Show Output**

Para mais informações detalhadas sobre a integração do MCP no VS Code, veja a [documentação oficial do VS Code MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Usando o Servidor MCP via CLI

Você também pode executar o servidor Intlayer MCP diretamente da linha de comando para testes, depuração ou integração com outras ferramentas.

### Instalar o Servidor MCP

Primeiro, instale o pacote do servidor MCP globalmente ou use-o via npx:

```bash
# Instalar globalmente
npm install -g @intlayer/mcp

# Ou usar diretamente com npx (recomendado)
npx @intlayer/mcp
```

### Iniciar o Servidor

Para iniciar o servidor MCP com o inspetor para depuração e testes:

```bash
# Usando o comando start embutido
npm run start

# Ou diretamente com npx
npx @modelcontextprotocol/inspector npx @intlayer/mcp
```

Isso iniciará o servidor MCP com uma interface de inspetor que permite:

- Testar comunicações do protocolo MCP
- Depurar respostas do servidor
- Validar implementações de ferramentas e recursos
- Monitorar o desempenho do servidor

### Uso para Desenvolvimento

Para fins de desenvolvimento e teste, você pode executar o servidor em vários modos:

```bash
# Construir e iniciar em modo de desenvolvimento
npm run dev

# Executar com configuração personalizada
node dist/cjs/index.cjs

# Testar a funcionalidade do servidor
npm test
```

O servidor exporá ferramentas e recursos específicos do Intlayer que podem ser consumidos por qualquer cliente compatível com MCP, não apenas Cursor ou outros IDEs.

---

## Visão Geral dos Recursos

| Recurso                 | Descrição                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| Suporte CLI             | Execute comandos `intlayer`, obtenha dicas de uso e argumentos inline                          |
| Documentação Versionada | Detecta automaticamente e carrega a documentação correspondente à sua versão atual do Intlayer |
| Autocompletar           | Sugestões inteligentes de comandos e configurações enquanto você digita                        |
| Pronto para Plugins     | Compatível com IDEs e ferramentas que suportam o padrão MCP                                    |

---

## Links Úteis

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Repositório do Intlayer no GitHub](https://github.com/aymericzip/intlayer)
