---
createdAt: 2025-12-16
updatedAt: 2025-12-16
title: CLI - Anmeldung
description: Erfahren Sie, wie Sie den Intlayer-CLI-Befehl login verwenden, um sich beim Intlayer CMS zu authentifizieren und Zugangsdaten zu erhalten.
keywords:
  - CLI
  - Login
  - Authentication
  - CMS
  - Intlayer
  - Credentials
slugs:
  - doc
  - concept
  - cli
  - login
---

# Intlayer CLI Login-Befehl

---

## Beschreibung

Der `login`-Befehl der Intlayer-CLI ermöglicht es Ihnen, sich beim Intlayer CMS zu authentifizieren. Dieser Befehl öffnet automatisch Ihren Standardbrowser, um den Authentifizierungsprozess abzuschließen und die notwendigen Zugangsdaten (Client ID und Client Secret) zu erhalten, um die Intlayer-Dienste zu nutzen.

## Verwendung

```bash
npx intlayer login [options]
```

oder

```bash
intlayer login [options]
```

## Optionen

### `--cms-url <url>`

Geben Sie die URL des Intlayer CMS an, zu dem die Verbindung zur Authentifizierung hergestellt werden soll.

- **Typ**: `string`
- **Standardwert**: Der in `intlayer.config.*` konfigurierte Wert oder `https://intlayer.org`
- **Beispiel**:

```bash
npx intlayer login --cms-url https://intlayer.org
```

### Konfigurationsoptionen

Sie können auch gängige Konfigurationsoptionen verwenden:

- `--env-file <path>`: Pfad zur Umgebungsdatei
- `-e, --env <env>`: Ausführungsumgebung
- `--base-dir <dir>`: Basisverzeichnis des Projekts
- `--verbose`: Detaillierte Ausgabe aktivieren (Standard: true)
- `--prefix <prefix>`: Präfix für Logs

## Wie es funktioniert

1. **Lokaler Serverstart**: Der Befehl startet einen lokalen HTTP-Server auf einem zufälligen Port, um Zugangsdaten vom CMS zu empfangen
2. **Browser öffnen**: Der Befehl öffnet automatisch Ihren Standardbrowser zur CMS-Anmelde-URL
3. **Authentifizierung**: Schließen Sie die Authentifizierung im Browser mit Ihrem Intlayer-Konto ab
4. **Empfang der Anmeldedaten**: Der lokale Server empfängt die Client ID und das Client Secret vom CMS
5. **Anleitungen**: Der Befehl zeigt Anweisungen an, wie Sie die Anmeldedaten in Ihrem Projekt konfigurieren

## Ausgabe

Nach erfolgreichem Login zeigt der Befehl Folgendes an:

1. **Die empfangenen Anmeldedaten** (Client ID und Client Secret)
2. **Anleitungen für die `.env`-Datei**:

```bash
INTLAYER_CLIENT_ID=your_client_id
INTLAYER_CLIENT_SECRET=your_client_secret
```

3. **Anleitungen für die Intlayer-Konfigurationsdatei**:

```typescript
{
  editor: {
    cmsURL: 'https://intlayer.org',
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
  },
}
```

## Manuelle Konfiguration

Wenn der Browser nicht automatisch geöffnet wird, können Sie die im Terminal angezeigte URL manuell aufrufen.

## Beispiele

### Login mit benutzerdefinierter CMS-URL

```bash
npx intlayer login --cms-url https://custom-cms.example.com
```

### Anmeldung mit spezifischer Umgebungsdatei

```bash
npx intlayer login --env-file .env.production
```

### Anmeldung im verbose-Modus

```bash
npx intlayer login --verbose
```

## Fehlerbehebung

### Browser öffnet sich nicht

Wenn der Browser sich nicht automatisch öffnet, kopieren Sie die im Terminal angezeigte URL und öffnen Sie sie manuell in Ihrem Browser.

### Verbindungsprobleme

Wenn Sie Verbindungsprobleme feststellen, überprüfen Sie:

1. Dass die CMS-URL korrekt ist
2. Dass Ihre Internetverbindung ordnungsgemäß funktioniert
3. Dass keine Firewalls die Verbindung blockieren
4. Dass Ihre Internetverbindung ordnungsgemäß funktioniert
5. Dass keine Firewalls die Verbindung blockieren

### Anmeldeinformationen nicht erhalten

Wenn Sie keine Anmeldeinformationen erhalten haben:

1. Stellen Sie sicher, dass Sie den Authentifizierungsprozess im Browser abgeschlossen haben
2. Überprüfen Sie, dass der lokale Port nicht blockiert ist
3. Versuchen Sie den Befehl erneut

## Nächste Schritte

Nach dem Abschluss der Anmeldung:

1. Fügen Sie die Anmeldeinformationen zu Ihrer `.env`-Datei hinzu
2. Konfigurieren Sie Ihre `intlayer.config.*`-Datei mit den Anmeldeinformationen
3. Verwenden Sie CLI-Befehle, um Ihre Wörterbücher zu verwalten:
   - [`npx intlayer push`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/push.md) - Wörterbücher in das CMS pushen
   - [`npx intlayer pull`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/pull.md) - Wörterbücher aus dem CMS pullen
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) - Fehlende Übersetzungen auffüllen
   - [`npx intlayer fill`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/fill.md) - Fehlende Übersetzungen auffüllen

## Siehe auch

- [CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)
- [Intlayer-Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md)
