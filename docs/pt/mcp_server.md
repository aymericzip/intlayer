# Documentação do Servidor Intlayer MCP

**Servidor Intlayer MCP (Model Context Protocol)** fornece assistência IDE com tecnologia de IA, personalizada para o ecossistema [Intlayer](https://github.com/aymericzip/intlayer). Projetado para ambientes modernos de desenvolvimento como **Cursor**, **GitHub Copilot workspace** e qualquer IDE que suporte o protocolo MCP, este servidor oferece suporte contextual e em tempo real com base na configuração do seu projeto.

## Por que usar o Servidor Intlayer MCP?

Ao habilitar o Servidor Intlayer MCP no seu IDE, você desbloqueia:

- **Integração Inteligente com CLI**  
  Acesse e execute comandos do Intlayer CLI diretamente da interface do seu IDE. Veja a lista completa de comandos e opções na [documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md).

- **Documentação Contextual**  
  O servidor MCP carrega e expõe a documentação correspondente à versão do Intlayer que você está utilizando no seu projeto. Isso garante que sugestões de código, opções de comando e explicações estejam sempre atualizadas e relevantes.

- **Desenvolvimento Assistido por IA**  
  Com sugestões e autocompletar baseados no projeto, o assistente de IA pode explicar seu código, recomendar o uso do CLI ou sugerir como usar recursos específicos do Intlayer com base nos seus arquivos atuais.

- **Configuração Leve e Instantânea**  
  Sem necessidade de manutenção de servidor ou instalação pesada. Basta configurar seu `.cursor/mcp.json` ou equivalente de configuração MCP e você estará pronto para começar.

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

Isso informa ao seu IDE para iniciar o servidor Intlayer MCP usando `npx`, garantindo que ele sempre utilize a versão mais recente disponível, a menos que você fixe uma versão específica.

---

## 🛠 Visão Geral dos Recursos

| Recurso                    | Descrição                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| 🧠 Suporte CLI             | Execute comandos `intlayer`, obtenha dicas de uso e argumentos diretamente                     |
| 📘 Documentação Versionada | Detecta automaticamente e carrega a documentação correspondente à sua versão atual do Intlayer |
| 🛎 Autocompletar           | Sugestões inteligentes de comandos e configurações enquanto você digita                        |
| 🧩 Pronto para Plugins     | Compatível com IDEs e ferramentas que suportam o padrão MCP                                    |

---

## 📎 Links Úteis

- [Documentação do Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/pt/intlayer_cli.md)
- [Repositório GitHub do Intlayer](https://github.com/aymericzip/intlayer)

---
