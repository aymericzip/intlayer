---
docName: mcp_server
url: https://intlayer.org/doc/mcp-server
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/mcp_server.md
createdAt: 2025-06-07
updatedAt: 2025-06-07
title: Documentação do Servidor MCP
description: Explore os recursos e a configuração do Servidor MCP para otimizar a gestão e operações do seu servidor.
keywords:
  - Servidor MCP
  - Gestão de Servidor
  - Otimização
  - Intlayer
  - Documentação
  - Configuração
  - Recursos
---

# Servidor MCP Intlayer

O **Servidor Intlayer MCP (Model Context Protocol)** oferece assistência para IDE com inteligência artificial, adaptada ao ecossistema Intlayer. Projetado para ambientes modernos de desenvolvimento como **Cursor**, **GitHub Copilot workspace** e qualquer IDE que suporte o protocolo MCP, este servidor fornece suporte contextual e em tempo real baseado na configuração do seu projeto.

## Por que usar o Servidor Intlayer MCP?

Ao ativar o Servidor Intlayer MCP na sua IDE, você desbloqueia:

- **Integração Inteligente com CLI**
  Acesse e execute comandos da CLI do Intlayer diretamente da interface da sua IDE. Veja a lista completa de comandos e opções na [documentação da CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md).

- **Documentação Contextualizada**
  O servidor MCP carrega e expõe a documentação que corresponde à versão do Intlayer que você está usando no seu projeto. Isso garante que as sugestões de código, opções de comando e explicações estejam sempre atualizadas e relevantes.

- **Desenvolvimento Assistido por IA**
  Com sugestões e autocompletar conscientes do projeto, o assistente de IA pode explicar seu código, recomendar o uso da CLI ou sugerir como usar recursos específicos do Intlayer com base nos seus arquivos atuais.

- **Configuração Leve e Instantânea**
  Nenhuma manutenção de servidor ou instalação pesada é necessária. Basta configurar seu arquivo `.cursor/mcp.json` ou configuração MCP equivalente e você estará pronto para começar.

---

## Configurar Cursor

Na raiz do seu projeto, adicione o seguinte arquivo de configuração `.cursor/mcp.json`:

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

Isso instrui seu IDE a iniciar o servidor MCP do Intlayer usando `npx`, garantindo que ele sempre use a versão mais recente disponível, a menos que você fixe uma versão específica.

---

## Configurar o VS Code

Para usar o Servidor MCP do Intlayer com o VS Code, você precisa configurá-lo nas configurações do seu workspace ou usuário.

### Configuração do Workspace

Crie um arquivo `.vscode/mcp.json` na raiz do seu projeto:

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

1. **Ativar o Modo Agente**: Abra a visualização de Chat (⌃⌘I no Mac, Ctrl+Alt+I no Windows/Linux) e selecione o modo **Agente** no menu suspenso.

2. **Acessar Ferramentas**: Clique no botão **Ferramentas** para visualizar as ferramentas Intlayer disponíveis. Você pode selecionar/deselecionar ferramentas específicas conforme necessário.

3. **Referência Direta de Ferramentas**: Faça referência às ferramentas diretamente em seus prompts digitando `#` seguido do nome da ferramenta.

4. **Confirmação de Ferramentas**: Por padrão, o VS Code solicitará confirmação antes de executar as ferramentas. Use as opções do botão **Continuar** para confirmar automaticamente as ferramentas para a sessão atual, workspace ou todas as invocações futuras.

### Gerenciando o Servidor

- Execute **MCP: Listar Servidores** no Command Palette para visualizar os servidores configurados
- Inicie, pare ou reinicie o servidor MCP do Intlayer conforme necessário
- Visualize os logs do servidor para solução de problemas selecionando o servidor e escolhendo **Mostrar Saída**

Para obter informações mais detalhadas sobre a integração do VS Code MCP, consulte a [documentação oficial do VS Code MCP](https://code.visualstudio.com/docs/copilot/chat/mcp-servers).

---

## Usando o Servidor MCP via CLI

Você também pode executar o servidor Intlayer MCP diretamente a partir da linha de comando para testes, depuração ou integração com outras ferramentas.

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

### Uso em Desenvolvimento

Para fins de desenvolvimento e teste, você pode executar o servidor em vários modos:

```bash
# Construir e iniciar em modo de desenvolvimento
npm run dev

# Executar com configuração personalizada
node dist/cjs/index.cjs

# Testar a funcionalidade do servidor
npm test
```

O servidor exporá ferramentas e recursos específicos do Intlayer que podem ser consumidos por qualquer cliente compatível com MCP, não apenas pelo Cursor ou outros IDEs.

---

## Visão Geral das Funcionalidades

| Feature                 | Description                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| Suporte CLI             | Execute comandos `intlayer`, obtenha dicas de uso e argumentos inline                          |
| Documentação Versionada | Detecta automaticamente e carrega a documentação correspondente à sua versão atual do Intlayer |
| Autocompletar           | Sugestões inteligentes de comandos e configurações enquanto você digita                        |
| Pronto para Plugin      | Compatível com IDEs e ferramentas que suportam o padrão MCP                                    |

---

## Links Úteis

- [Documentação CLI do Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pt/intlayer_cli.md)
- [Repositório GitHub do Intlayer](https://github.com/aymericzip/intlayer)

---

## Histórico da Documentação

- 5.5.10 - 2025-06-29: Histórico inicial
