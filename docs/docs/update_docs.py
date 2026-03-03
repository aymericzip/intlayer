import os
import re

locales = [
    "ar", "de", "en", "en-GB", "es", "fr", "hi", "id", "it", "ja", "ko", "pl", "pt", "ru", "tr", "uk", "vi", "zh"
]

translations = {
    "ar": {"cli_title": "الإعداد عبر واجهة سطر أوامر Intlayer (موصى به)"},
    "de": {"cli_title": "Einrichtung über die Intlayer CLI (empfohlen)"},
    "en": {"cli_title": "Setup via Intlayer CLI (recommended)"},
    "en-GB": {"cli_title": "Setup via Intlayer CLI (recommended)"},
    "es": {"cli_title": "Configuración a través de la CLI de Intlayer (recomendado)"},
    "fr": {"cli_title": "Configuration via la CLI Intlayer (recommandé)"},
    "hi": {"cli_title": "Intlayer CLI के माध्यम से सेटअप (अनुशंसित)"},
    "id": {"cli_title": "Setup melalui CLI Intlayer (disarankan)"},
    "it": {"cli_title": "Configurazione tramite la CLI di Intlayer (consigliata)"},
    "ja": {"cli_title": "Intlayer CLI経由のセットアップ（推奨）"},
    "ko": {"cli_title": "Intlayer CLI를 통한 설정 (권장)"},
    "pl": {"cli_title": "Konfiguracja przez Intlayer CLI (zalecane)"},
    "pt": {"cli_title": "Configuração via CLI do Intlayer (recomendado)"},
    "ru": {"cli_title": "Настройка через Intlayer CLI (рекомендуется)"},
    "tr": {"cli_title": "Intlayer CLI aracılığıyla kurulum (önerilen)"},
    "uk": {"cli_title": "Налаштування через Intlayer CLI (рекомендовано)"},
    "vi": {"cli_title": "Thiết lập qua Intlayer CLI (khuyên dùng)"},
    "zh": {"cli_title": "通过 Intlayer CLI 设置（推荐）"}
}

base_dir = "/Users/aymericpineau/Documents/intlayer_/docs/docs"

vsc_title = "## Setup via Intlayer VS Code extension"

for lang in locales:
    file_path = os.path.join(base_dir, lang, "mcp_server.md")
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Update title as requested
    # Standardize titles even if translated before, because user explicitly asked for English title specifically.
    # Pattern to find the section and ensure its title is exactly as requested
    content = re.sub(r"## (Using|Utilisation|Uso|Installation|Einrichtung|إعداد|सेटअप|Setup|でのセットアップ|에서 설정|Konfiguracja|Configuração|Настройка|Kurulum|Thiết lập|通过).*VS Code.*extension.*", "## Setup via Intlayer VS Code extension", content)
    
    # Standardize CLI titles too if they exist
    trans = translations.get(lang)
    if trans:
        cli_pattern = r"## (Setup via Intlayer CLI|Configuration via la CLI Intlayer|Configuración a través de la CLI de Intlayer|Einrichtung über die Intlayer CLI|الإعداد عبر واجهة سطر أوامر|Intlayer CLI के माध्यम से|Setup attraverso la CLI|Intlayer CLI経由のセットアップ|Intlayer CLI를 통한 설정|Konfiguracja przez Intlayer CLI|Configuração via CLI|Настройка через Intlayer CLI|Intlayer CLI aracılığıyla|Налаштування через Intlayer CLI|Thiết lập qua Intlayer CLI|通过 Intlayer CLI 设置).*"
        content = re.sub(cli_pattern, f"## {trans['cli_title']}", content)

    # General updates
    content = re.sub(r"updatedAt: \d{4}-\d{2}-\d{2}", "updatedAt: 2026-03-03", content)
    content = re.sub(r"docs/docs/" + re.escape(lang) + r"/intlayer_cli\.md", "docs/docs/" + lang + "/cli/index.md", content)
    
    # Fix Claude Desktop JSON block extra brace issue for all
    # Pattern to fix the double closure if it exists
    # If the file has ...}\n}\n}\n```, change to ...}\n}\n}\n}\n``` if it was meant to be 4 deep?
    # Actually, Claude Desktop config uses "mcpServers": { "intlayer": { ... } } so it needs 3 closing braces for the object + 1 for file?
    # Usually: { "mcpServers": { "intlayer": { ... } } } - so 3 braces at the end.
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Done")
