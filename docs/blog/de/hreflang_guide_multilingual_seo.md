---
createdAt: 2026-08-29
updatedAt: 2026-08-29
title: "Hreflang, Leitfaden für mehrsprachige SEO"
description: "Was hreflang ist, die Regeln, die Suchmaschinen durchsetzen, warum x-default fast immer falsch ist, und wie man korrekte Tags in Next.js und TanStack Start generiert."
keywords:
  - hreflang
  - SEO
  - Internationalization
  - Intlayer
  - i18n
  - Sitemap
  - Canonical
  - Next.js
  - TanStack Start
slugs:
  - blog
  - hreflang-guide-multilingual-seo
author: aymericzip
---

# Hreflang: der Leitfaden für mehrsprachige SEO

Du hast deine App übersetzt. Du hast `/en`, `/fr`, `/es` deployed. Und französische Benutzer landen immer noch auf der englischen Seite.

Die Übersetzung ist die einfache Hälfte. Die schwierige Hälfte besteht darin, Suchmaschinen mitzuteilen, dass diese Seiten die **gleiche Seite in einer anderen Sprache** sind, nicht drei Dokumente, die miteinander konkurrieren. Das ist das, was `hreflang` tut, und hier verlieren die meisten mehrsprachigen Websites stillschweigend ihren Traffic.

---

## Was hreflang wirklich ist

Eine Anmerkung auf einer Seite, die besagt: _diese URL hat äquivalente Versionen dort drüben, für diese Sprachen._

```html
<link rel="alternate" hreflang="en" href="https://example.com/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="es" href="https://example.com/es/about" />
<link rel="alternate" hreflang="x-default" href="https://example.com/about" />
```

Es bringt dir zwei Dinge: die richtige Version, die dem richtigen Benutzer angezeigt wird, und deine Locales in einen Cluster konsolidiert statt sich gegenseitig als Duplikate zu kannibalisieren.

Es ist wichtig zu verdeutlichen, was es nicht ist. Es ist **keine Umleitung** — es ist ein Hinweis, und Google kann ihn überschreiben. Es ist **kein Ranking-Boost** — es ändert _welche_ Version rankt, nicht _ob_ du rankst. Und Bing ignoriert es ganz, stattdessen auf `content-language` und Geo-Targeting verlassend.

---

## Wo man es deklariert

Drei Platzierungen, alle gültig. Wähle eine und bleibe dabei — derselbe Cluster, der an zwei Stellen deklariert wird, ist wie Sets auseinanderdriften.

**HTML `<head>`** ist die übliche Wahl. Ein Vorbehalt: Tags, die nach der Hydration eingefügt werden, sind unzuverlässig. Wenn dein Framework sie nur client-seitig hinzufügt, sieht der Crawler sie möglicherweise nie.

**XML-Sitemap** ist bei großem Umfang besser. Zehn Locales auf 5.000 Seiten bedeuten 50.000 `<link>`-Elemente, die ohne Nutzen an Browser versendet werden; in einer Sitemap kostet das deine Seiten null Bytes.

**HTTP `Link` Header** ist die einzige Option für Nicht-HTML-Dateien wie PDFs.

---

## Die Regeln

### Selbstreferenz und Gegenseitigkeit

Die Menge auf `/fr/about` muss `hreflang="fr"` enthalten, das auf `/fr/about` verweist. Und wenn `/about` auf `/fr/about` verweist, muss `/fr/about` zurückverweisen. Google nennt eine einseitige Referenz ein "no return tag" und verwirft sie.

In der Praxis bedeutet dies, dass **jede Seite in einem Cluster den identischen Satz von Links versendet**. Diese aus einer gemeinsamen Locale-Liste zu generieren ist nicht nur eine Bequemlichkeit, sondern die einzige Möglichkeit, korrekt zu bleiben, wenn du mehr als zwei Locales hast.

### Absolute URLs, immer

```html
<!-- Stillschweigend ignoriert -->
<link rel="alternate" hreflang="fr" href="/fr/about" />

<!-- Korrekt -->
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
```

Der Grund lohnt sich zu verstehen, anstatt ihn auswendig zu lernen. `hreflang` ist eine dokumentübergreifende Referenz: Suchmaschinen erstellen einen Cluster, der nach URL verschlüsselt ist und auf jeder Seite darin geteilt wird. Ein relativer Pfad hat nur eine Bedeutung relativ zum Dokument, in dem er sich befindet, daher kann er dies nicht ausdrücken. Er kann auch keinen Host überqueren – und eine Alternative tut dies oft, wenn ein Locale auf `example.fr` oder `fr.example.com` lebt. In einer Sitemap oder einem HTTP-Header gibt es überhaupt kein Basisdokument zum Auflösen.

Dies hat eine direkte Folge im Code. `getLocalizedUrl("/about", "fr")` gibt `/fr/about` zurück — relativ rein, relativ raus. Für `hreflang` musst du eine absolute URL eingeben:

```ts
getLocalizedUrl("/about", "fr"); // → "/fr/about"          ❌ fallen gelassen
getLocalizedUrl("https://example.com/about", "fr"); // → "https://example.com/fr/about"  ✅
```

Die einzige Ausnahme ist ein Framework, das relative Werte vor dem Rendern für dich auflöst: Next.js erweitert relative `alternates` gegen `metadataBase`. In Ordnung — aber die Regel gilt für das **emittierte HTML**, also überprüfe mit `curl`, nicht mit dem DevTools Inspector.

### Sprachcodes

ISO 639-1 für die Sprache, ISO 3166-1 Alpha 2 für die optionale Region: `fr`, `fr-CA`, `pt-BR`.

Zwei Fallen fangen fast jeden. Eine Region allein ist ungültig — `hreflang="ca"` ist Katalanisch, nicht Kanada; du brauchst `en-CA` oder `fr-CA`. Und `en-UK` existiert nicht: der Ländercode für das Vereinigte Königreich ist `GB`, also ist es `en-GB`.

Füge eine Region nur hinzu, wenn du diesem Region wirklich unterschiedliche Inhalte bereitstellst — unterschiedliche Preise, unterschiedliche Rechtsmitteilungen. `fr` und `fr-FR` auf identischem Inhalt ist Rauschen.

### x-default

```html
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

Ein Konzept, das am häufigsten vergessen und schlecht verstanden wird, ist `x-default` — weniger als 30% der Apps implementieren es richtig.

Es ist das Fallback für Nutzer, deren Sprache nichts in Ihrer Menge entspricht. Ein Niederländischsprachiger auf einer Website, die Englisch, Französisch und Spanisch anbietet, stimmt mit keinem Eintrag überein; ohne `x-default` wählt Google für Sie.

Was die Leute falsch verstehen, ist seine Bedeutung. `x-default` ist **nicht "die englische Version"** und **nicht "das Standard-Locale"**, obwohl es normalerweise dorthin verweist. Es bedeutet _die Seite für Nutzer, die diese Menge nicht abdeckt_. Deshalb ist es legitim – und oft besser – es auf eine Sprachwahlseite oder eine Geo-Umleitung-Startseite zu verweisen, anstatt auf `/en`. Wenn Sie keine solche Seite haben, ist Ihre primäre Sprache die sinnvolle Antwort.

Zwei Dinge sind wichtig: `x-default` ist ein zusätzlicher Eintrag im Set, kein Ersatz für den selbstreferenzierenden, und wie jeder andere Eintrag muss er identisch auf jeder Seite im Cluster erscheinen.

---

## Die kanonische Falle

Jede lokalisierte Seite muss **ihr eigenes kanonisches Element sein**:

```html
<!-- On https://example.com/fr/about -->
<link rel="canonical" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/about" />
<link rel="alternate" hreflang="en" href="https://example.com/about" />
```

Alle kanonischen Elemente jedes Locale auf die englische Version zu verweisen:

```html
<!-- On https://example.com/fr/about — kills the page -->
<link rel="canonical" href="https://example.com/about" />
```

sagt, dass die französische Seite ein Duplikat ist, das nicht indexiert werden sollte, während `hreflang` sagt, dass sie die Seite für französische Benutzer ist. Die Signale widersprechen sich, das canonical gewinnt, und deine französischen Seiten fallen aus dem Index.

**Canonical ist selbstreferenziell pro Locale. `hreflang` beschreibt den Cluster.**

---

## URL-Struktur wählen

`hreflang` annotiert URLs, daher kommt die Struktur zuerst.

| Struktur               | Beispiel          | Trade-off                                                                                     |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| **Unterverzeichnisse** | `example.com/fr/` | Eine Domain, gemeinsame Autorität — schwächeres Geo-Signal                                    |
| **Subdomains**         | `fr.example.com`  | Einfach, ein Locale hinzuzufügen oder zu entfernen — kann als separate Website gelesen werden |
| **ccTLDs**             | `example.fr`      | Stärkstes Länder-Signal — Autorität pro Domain aufgebaut                                      |

Unterverzeichnisse sind der richtige Standard für die meisten Projekte. Greifen Sie zu ccTLDs nur, wenn Sie wirklich als separate Ländergeschäfte tätig sind.

Die eine Struktur, die Sie vermeiden sollten: Verschiedene Sprachen auf der **gleichen URL** basierend auf `Accept-Language` oder IP bereitstellen. Crawler sehen eine Version und indexieren eine Version; alles andere ist unsichtbar.

> Intlayer deckt alle drei Optionen durch `routing.mode` und `routing.domains` ab. Siehe [benutzerdefinierte Domains](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/custom_domains.md) und die [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

---

## Implementierung

Das manuelle Schreiben dieser Tags überlebt den Kontakt mit einer zweiten Sprache nicht. Leiten Sie sie stattdessen von Ihrer Locale-Liste ab.

<Steps>

<Step number={1} title="Emit the cluster auf jeder Seite">

Gleicher Satz überall, canonical pro Locale, absolute URLs, `x-default` inbegriffen.

<Tabs>

<Tab label="Next.js" value="nextjs">

Die Metadata API exposiert `alternates.languages`, und `getMultilingualUrls` erstellt den gesamten Record aus Ihren konfigurierten Locales:

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

const SITE_URL = "https://example.com";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  /**
   * getMultilingualUrls(`${SITE_URL}/about`) gibt zurück:
   * {
   *   en: 'https://example.com/about',
   *   fr: 'https://example.com/fr/about',
   *   es: 'https://example.com/es/about',
   * }
   */
  const multilingualUrls = getMultilingualUrls(`${SITE_URL}/about`);

  return {
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": `${SITE_URL}/about` },
    },
  };
};
```

Vollständige Konfiguration: [Next.js 16 i18n-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md).

</Tab>

<Tab label="TanStack Start" value="tanstack">

Die `head`-Funktion der Route erstellt die Links. `localeMap` iteriert über deine konfigurierten Locales, sodass das Hinzufügen eines Locale zur Konfiguration es überall gleichzeitig hinzufügt:

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getLocalizedUrl, localeMap } from "intlayer";

const SITE_URL = "https://example.com";

export const Route = createFileRoute("/{-$locale}/about")({
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const url = `${SITE_URL}/about`;

    return {
      links: [
        { rel: "canonical", href: getLocalizedUrl(url, locale) },

        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(url, mapLocale),
        })),

        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(url, defaultLocale),
        },
      ],
    };
  },
});
```

`head` wird auf dem Server ausgeführt, sodass die Tags im initialen HTML landen. Vollständige Einrichtung: [TanStack Start i18n-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md).

</Tab>

</Tabs>

</Step>

<Step number={2} title="Oder verschiebe es alles in die Sitemap">

In großem Maßstab solltest du die Annotationen ganz aus deinen Seiten heraushalten. `generateSitemap` gibt `xhtml:link`-Alternates pro Eintrag aus und liest Locales und Routing-Modus aus deiner Konfiguration:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { generateSitemap } from "intlayer";

const sitemap = generateSitemap(
  [
    { path: "/", changefreq: "daily", priority: 1.0 },
    { path: "/about", changefreq: "monthly", priority: 0.8 },
  ],
  { siteUrl: "https://example.com" }
);
```

Zwei wissenswerte Optionen:

- `xhtmlLinks` (Standard `true`) — Alternates werden nur ausgegeben, wenn sich die Locale-URLs tatsächlich unterscheiden. Im `no-prefix`-Modus teilen sich alle Locales eine URL, daher werden sie übersprungen, es sei denn, `routing.domains` gibt den Locales ihre eigenen Hostnamen.
- `entryPerLocale` (Standard `false`) — standardmäßig trägt ein `<url>`-Eintrag alle Alternates. Beide Formen sind gültig, aber nur eine als `<loc>` aufgelistete URL zählt als _eingereicht_ in der Search Console; Alternate-only-Sprachen bleiben auffindbar, werden aber keinem Sitemap zugeordnet. Durch Aktivierung erhält jede lokalisierte URL einen eigenen Eintrag mit dem vollständigen Alternate-Set wiederholt. Dies vervielfacht die Einträge um die Sprachenanzahl, daher sollte das Limit von 50.000 URLs / 50 MB beachtet werden und bei Überschreitung in einen Sitemap-Index aufgeteilt werden.

</Step>

<Step number={3} title="Überprüfen Sie, was der Crawler erhält">

`hreflang` schlägt lautlos fehl, daher sollten Sie es überprüfen, statt es anzunehmen.

Lese die Quelle, nicht den Inspector — `curl https://example.com/fr/about | grep hreflang` zeigt, was ein Crawler erhält; DevTools zeigt das DOM nach der JavaScript-Ausführung. Folge dann jedem Alternate und bestätige, dass er mit dem identischen Set zurückweist, und dass keiner von ihnen umleitet. Der International Targeting Report der Search Console erfasst den Rest auf der gesamten Website.

Für einen mehrsprachigen Crawl überprüft der [Intlayer SEO Scanner](https://intlayer.org/i18n-seo-scanner) fehlende Tags, unterbrochene Alternates und kanonische Konflikte auf deinen lokalisierten Seiten.

</Step>

</Steps>

---

## Checkliste

- [ ] Jedes Locale hat eine unterschiedliche, crawlbare URL
- [ ] Jede Seite referenziert sich selbst, und jede Referenz ist gegenseitig
- [ ] Der gleiche Satz wird auf jeder Seite im Cluster bereitgestellt
- [ ] Alle `href`-Werte sind in der emittierten HTML absolut
- [ ] Codes sind ISO 639-1 + ISO 3166-1 Alpha 2 (`en-GB`, nicht `en-UK`)
- [ ] `x-default` ist vorhanden und verweist auf den Ort, wohin nicht übereinstimmende Benutzer gehen sollten
- [ ] Canonical verweist selbstreferenziell pro Locale
- [ ] Tags werden serverseitig gerendert, nicht nach der Hydration eingefügt
- [ ] An genau einer Stelle deklariert
- [ ] Keine Alternate-Weiterleitungen

---

## Zusammenfassung

`hreflang` ist einfach und unerbittlich. Ein fehlendes Return-Tag, eine relative URL, ein locale-übergreifender Canonical, und der Cluster wird ohne Fehlermeldung irgendwo verworfen. Jedes davon kommt vom manuellen Schreiben der Tags.

Leiten Sie den Satz von einer einzigen Locale-Liste ab, rendern Sie ihn serverseitig, halten Sie das Canonical selbstreferenziell und geben Sie `x-default` die Aufmerksamkeit, die es verdient. Tun Sie das einmal und Korrektheit hört auf, etwas zu sein, das Sie warten.

### Weiter geht es

- [SEO und Internationalisierung](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/internationalization_and_SEO.md) — das umfassendere mehrsprachige SEO-Bild
- [SEO und i18n in Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/de/nextjs-multilingual-seo-comparison.md) — `next-intl` vs `next-i18next` vs Intlayer
- [Next.js 16 i18n Guide](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_16.md)
- [TanStack Start i18n-Anleitung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_tanstack.md)
- [Benutzerdefinierte Domains pro Locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/custom_domains.md)
- [Konfigurationsreferenz](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md)
