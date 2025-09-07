---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: MCP Sunucu Dokümantasyonu
description: Sunucu yönetimini ve işlemlerinizi optimize etmek için MCP Sunucusu'nun özelliklerini ve kurulumunu keşfedin.
keywords:
  - MCP Sunucu
  - Sunucu Yönetimi
  - Optimizasyon
  - Intlayer
  - Dokümantasyon
  - Kurulum
  - Özellikler
slugs:
  - doc
  - mcp-server
---

# Intlayer MCP Sunucusu

**Intlayer MCP (Model Context Protocol) Sunucusu**, Intlayer ekosistemi için uyarlanmış AI destekli IDE yardımı sağlar.

## Nerede kullanabilirim?

- **Cursor**, **VS Code** ve MCP protokolünü destekleyen herhangi bir IDE gibi modern geliştirici ortamlarında.
- **Claude Desktop**, **Gemini**, **ChatGPT** vb. favori AI asistanınızda.

## Neden Intlayer MCP Sunucusunu Kullanmalıyım?

IDE'nizde Intlayer MCP Sunucusunu etkinleştirerek şunları açığa çıkarırsınız:

- **Bağlam Farkında Dokümantasyon**
  MCP sunucusu Intlayer'ın dokümantasyonunu yükler ve gösterir. Kurulumunuzu, geçişlerinizi vb. hızlandırmak için.
  Bu, kod önerilerinin, komut seçeneklerinin ve açıklamaların her zaman güncel ve ilgili olmasını sağlar.

- **Akıllı CLI Entegrasyonu**
  Intlayer CLI komutlarına IDE arayüzünüzden doğrudan erişin ve çalıştırın. MCP sunucusunu kullanarak, AI asistanınızın `intlayer dictionaries build` gibi komutları çalıştırarak sözlüklerinizi güncellemesine veya eksik çevirilerinizi doldurmak için `intlayer dictionaries fill` kullanmasına izin verebilirsiniz.

  > Komutların ve seçeneklerin tam listesini [Intlayer CLI dokümantasyonunda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_cli.md) görüntüleyin.

## Yerel sunucu (stdio) vs Uzak sunucu (SSE)

MCP sunucusu iki şekilde kullanılabilir:

- Yerel sunucu (stdio)
- Uzak sunucu (SSE)

### Yerel sunucu (stdio) (önerilen)

Intlayer, makinenizde yerel olarak yüklenebilen bir NPM paketi sağlar. VS Code, Cursor gibi favori IDE'nizde, ChatGPT, Claude Desktop vb. yerel asistan uygulamanızda yüklenebilir.

Bu sunucu, MCP sunucusunun tüm özelliklerini entegre ettiği için önerilen yol, CLI araçları dahil.

### Uzak sunucu (SSE)

MCP sunucusu ayrıca uzak olarak, SSE aktarım yöntemini kullanarak kullanılabilir. Bu sunucu Intlayer tarafından barındırılır ve https://mcp.intlayer.org adresinde kullanılabilir. Bu sunucuya herkese açık olarak, herhangi bir kimlik doğrulaması olmadan erişilebilir ve kullanımı ücretsizdir.

Uzak sunucunun CLI araçlarını, AI otomatik tamamlama vb. entegre etmediğini unutmayın. Uzak sunucu sadece AI asistanınızın Intlayer ekosistemiyle etkileşim kurması için dokümantasyon içindir.

> Sunucu barındırma maliyetleri nedeniyle, uzak sunucunun kullanılabilirliği garanti edilemez. Eşzamanlı bağlantı sayısını sınırlıyoruz. En güvenilir deneyim için yerel sunucu (stdio) aktarım yöntemini kullanmanızı öneririz.

---

## Cursor'da Kurulum

Cursor'da MCP sunucusunu yapılandırmak için [resmi dokümantasyonu](https://docs.cursor.com/context/mcp) takip edin.

Proje kökünüzde aşağıdaki `.cursor/mcp.json` yapılandırma dosyasını ekleyin:

### Yerel sunucu (stdio) (önerilen)

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

### Uzak sunucu (SSE)

Server-Sent Events (SSE) kullanarak uzak bir Intlayer MCP sunucusuna bağlanmak için, MCP istemcinizi barındırılan servise bağlanacak şekilde yapılandırabilirsiniz.

```json fileName=".cursor/mcp.json"
{
  "mcpServers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "transport": "sse"
    }
  }
}
```

Bu, IDE'nize Intlayer MCP sunucusunu `npx` kullanarak başlatmasını söyler, böylece sabitlemediğiniz sürece her zaman en son kullanılabilir sürümü kullanır.

---

## VS Code'da Kurulum

VS Code'da MCP sunucusunu yapılandırmak için [resmi dokümantasyonu](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) takip edin.

Intlayer MCP Sunucusunu VS Code ile kullanmak için, çalışma alanınızda veya kullanıcı ayarlarınızda yapılandırmanız gerekir.

### Yerel sunucu (stdio) (önerilen)

Proje kökünüzde bir `.vscode/mcp.json` dosyası oluşturun:

```json fileName=".vscode/mcp.json"
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

### Uzak sunucu (SSE)

Server-Sent Events (SSE) kullanarak uzak bir Intlayer MCP sunucusuna bağlanmak için, MCP istemcinizi barındırılan servise bağlanacak şekilde yapılandırabilirsiniz.

```json fileName=".vscode/mcp.json"
{
  "servers": {
    "intlayer": {
      "url": "https://mcp.intlayer.org",
      "type": "sse"
    }
  }
}
```

---

## ChatGPT'de Kurulum

### Uzak sunucu (SSE)

ChatGPT'de MCP sunucusunu yapılandırmak için [resmi dokümantasyonu](https://platform.openai.com/docs/mcp#test-and-connect-your-mcp-server) takip edin.

1. [Promt dashboard](https://platform.openai.com/prompts)'a gidin
2. `+ Create` üzerine tıklayın
3. `Tools (Create or +)` üzerine tıklayın
4. `MCP Server` seçin
5. `Add new` üzerine tıklayın
6. Aşağıdaki alanları doldurun:
   - URL: `https://mcp.intlayer.org`
   - Label: `Intlayer MCP Server`
   - Name: `intlayer-mcp-server`
   - Authentication: `None`

7. `Save` üzerine tıklayın

---

## Claude Desktop'ta Kurulum

Claude Desktop'ta MCP sunucusunu yapılandırmak için [resmi dokümantasyonu](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server) takip edin.

Yapılandırma dosyasının yolu:

- macOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Yerel sunucu (stdio) (önerilen)

```json fileName="claude_desktop_config.json"
{
  "mcpServers": {
    "intlayer": {
      "command": "npx",
      "args": ["-y", "@intlayer/mcp"]
    }
  }
}
```

---

## CLI aracılığıyla MCP Sunucusunu Kullanma

Intlayer MCP sunucusunu test, hata ayıklama veya diğer araçlarla entegrasyon için komut satırından doğrudan çalıştırabilirsiniz.

```bash
# Genel olarak yükleyin
npm install -g @intlayer/mcp

# Veya doğrudan npx ile kullanın (önerilen)
npx @intlayer/mcp
```

---

## Doküman Geçmişi

| Sürüm  | Tarih      | Değişiklikler                       |
| ------ | ---------- | ----------------------------------- |
| 5.5.12 | 2025-07-11 | ChatGPT kurulumu eklendi            |
| 5.5.12 | 2025-07-10 | Claude Desktop kurulumu eklendi     |
| 5.5.12 | 2025-07-10 | SSE aktarımı ve uzak sunucu eklendi |
| 5.5.10 | 2025-06-29 | Geçmiş başlatıldı                   |
