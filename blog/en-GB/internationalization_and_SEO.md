---
blogName: internationalization_and_SEO
url: https://intlayer.org/blog/SEO-and-i18n
githubUrl: https://github.com/aymericzip/intlayer/blob/main/blog/en/internationalization_and_SEO.md
createdAt: 2024-12-24
updatedAt: 2024-12-24
title: SEO and Internationalization
description: Discover how to optimise your multilingual website for search engines and improve your SEO.
keywords:
  - SEO
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
---

# SEO & I18n: The Ultimate Guide to Making Your Website Multilingual

Want to reach more users worldwide? Making your website multilingual is one of the best ways to expand your audience and improve your SEO (Search Engine Optimisation). In this blog post, we’ll break down the basics of international SEO, often referred to as **i18n** (short for “internationalisation”), in clear, understandable terms. You’ll learn about the key decisions you need to make, how to use technical elements like `hreflang`, and why tools like **Intlayer** can simplify your multilingual Next.js projects.

---

## 1. What Does It Mean to Make Your Website Multilingual?

A multilingual website offers its content in more than one language. For example, you might have an English version (`example.com/en/`), a French version (`example.com/fr/`), and a Spanish version (`example.com/es/`). This approach lets search engines display the correct language version to users based on their preferences or geographic location.

When you do this right, you’ll create a far more user-friendly experience for non-English speakers, leading to better engagement, higher conversion rates, and improved SEO in different regions.

---

## 2. Choosing the Right URL Structure

If you decide to have multiple language versions, you’ll need a clear, consistent way to organise your site’s URLs. Each language (or region) should have its own unique “address” on the internet. Below are three common ways to structure multilingual websites:

1. Country-Code Top-Level Domains (ccTLDs)

   - Example: `example.fr`, `example.de`
   - **Pros:** Sends a strong signal to search engines about which country the content targets (e.g., `.fr` = France).
   - **Cons:** Managing multiple domains can be more expensive and complicated.

2. **Subdomains**

   - **Example:** `fr.example.com`, `de.example.com`
   - **Pros:** Each language “lives” on its own subdomain, making it relatively easy to add or remove languages.
   - **Cons:** Search engines sometimes treat subdomains as separate sites, so it can dilute your main domain’s authority.

3. **Subdirectories (Subfolders)**
   - **Example:** `example.com/fr/`, `example.com/de/`
   - **Pros:** Straightforward to manage, and all traffic points to one main domain.
   - **Cons:** Not as strong a local SEO signal as ccTLDs (though it’s still very effective if done properly).

> **Tip:** If you have a global brand and want to keep things simpler, subdirectories often work best. If you’re only targeting one or two main countries and want to really emphasise each one, ccTLDs might be the way to go.

---

## 3. Mastering Language Targeting with Hreflang

### 3.1. What Is Hreflang?

When you have identical or very similar content in multiple languages, search engines like Google can get confused about which version to display to a user. **Hreflang** is an HTML attribute that tells search engines which language (and region) a particular page is intended for, and what the alternative language/region pages are.

### 3.2. Why Is This Important?

1. It prevents **duplicate content** issues (when search engines think you’re publishing the same content multiple times).
2. It makes sure **French users see the French version**, **Spanish users see the Spanish version**, and so on.
3. It improves the overall user experience, meaning better engagement and higher SEO ranking.

### 3.3. How to Use Hreflang in the `<head>` Tag

In your HTML, you’ll add something like:

```html
<link rel="alternate" hreflang="en" href="https://example.com/en" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr" />
<link rel="alternate" hreflang="es" href="https://example.com/es" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en" />
```

- **`hreflang="en"`**: Indicates the English version of the page.
- **`hreflang="fr"`**: Indicates the French version of the page.
- **`hreflang="es"`**: Indicates the Spanish version of the page.
- **`hreflang="x-default"`**: A “fallback” language or default URL when none of the other languages match the user’s preferences.

> **Quick Note:** Make sure the URLs in these tags point directly to the final page, with **no** additional redirects.

---

## 4. Making Content Truly “Local” (Not Just Translated)

### 4.1. Localisation vs. Translation

- **Translation** means converting text from one language to another word for word.
- **Localisation** means adapting the content’s format, currency, measurements, and cultural references for a local audience. For instance, if you’re targeting France, you’d use `€` instead of `$`, and possibly mention local holidays or region-specific details.

### 4.2. Avoiding Duplicate Content

Even with good translations, search engines can flag your site for duplicate content if it appears too similar in structure. Hreflang helps clarify that these pages aren’t duplicates but are language variations.

---

## 5. Technical SEO Must-Haves

### 5.1. Language Declarations (`lang` and `dir`)

In your HTML tag, you can declare the language like so:

```html
<html lang="en"></html>
```

- **`lang="en"`** helps browsers and assistive technologies understand the language.

For right-to-left languages (like Arabic or Hebrew), add:

```html
<html dir="rtl" lang="ar"></html>
```

- **`dir="rtl"`** ensures the text direction is right-to-left.

### 5.2. Canonical Tags

Canonical tags tell search engines which page is the “original” or primary version if you have near-duplicate pages. Usually, you’ll have a **self-referencing** canonical for multilingual sites.

```html
<link rel="canonical" href="https://example.com/fr/produits" />
```

---

## 6. On-Page SEO in Multiple Languages

### 6.1. Title & Meta Descriptions

- **Translated and optimised** for each language.
- Perform **keyword research** for each market because what people search for in English might differ in French or Spanish.

### 6.2. Headers (H1, H2, H3)

Your headings should reflect each region’s **local phrases** or **keywords**. Don’t just stick your original English heading through Google Translate and call it a day.

### 6.3. Images & Media

- Localise alt text, captions, and filenames if needed.
- Use visuals that resonate with the target culture.

---

## 7. Language Switching & User Experience

### 7.1. Auto-Redirect or a Language Selector?

- **Auto-Redirect** (based on IP or browser settings) can be convenient but may send travellers or VPN users to the wrong version.
- **A Language Selector** is often more transparent, users can choose their own language if the auto-detected one is incorrect.

Here’s a simplified Next.js + Intlayer example:

```tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Get the current URL path. Example: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Construct the URL with the updated locale
      // Example: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Update the URL path
      navigate(pathWithLocale);
    },
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={locale === localeItem ? "x-default" : localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

### 7.2. Storing Preferences

- Save your user’s language choice in a **cookie** or **session**.
- Next time they visit your site, you can automatically load their preferred language.

---

## 8. Building Local Backlinks

**Backlinks** (links from external sites to yours) remain an important SEO factor. When you run a multilingual site, consider:

- Reaching out to local news sites, blogs, or forums. For instance, a `.fr` domain pointing to your French subdirectory can boost your local French SEO.
- Monitoring backlinks per language to see which regions need more PR/marketing efforts.

---

## 9. Monitoring & Maintaining Your Multilingual Site

### 9.1. Google Analytics & Search Console

- Segment your data for each language directory (`/en/`, `/fr/`, `/es/`).
- Look out for **crawl errors**, **duplicate content flags**, and **indexing issues** on a per-language basis.

### 9.2. Regular Content Updates

- Keep translations fresh. If you change a product description in English, update it in French, Spanish, etc.
- Outdated translations can be confusing for customers and hurt user trust.

---

## 10. Common Pitfalls to Avoid

1. **Machine-Translated Content**
   Automated translations without human review can be riddled with errors.

2. **Incorrect or Missing `hreflang` Tags**
   Search engines can’t determine language versions on their own if your tags are incomplete or have the wrong codes.

3. **Language Switching Only via JavaScript**
   If Google can’t crawl unique URLs for each language, your pages might not appear in the correct local search results.

4. **Ignoring Cultural Nuances**
   A joke or phrase that works in one country might be offensive or meaningless in another.

---

## Wrapping Up

Making your website multilingual involves more than just translating text. It’s about structuring URLs effectively, using `hreflang` tags to help search engines serve the correct version, and providing a stellar user experience, complete with localised visuals, language selectors, and consistent navigation. Following these best practices will set you up for success in global markets, boost user satisfaction, and, ultimately, deliver better SEO results across regions.

If you’re using Next.js (particularly App Router in Next.js 13+), a tool like **Intlayer** can streamline this entire process. It helps with everything from generating localised sitemaps to automatically handling `hreflang` links, language detection, and more, so you can focus on crafting quality multilingual content.

**Ready to go global?** Start implementing these SEO and i18n strategies now, and watch as new visitors from around the world discover and engage with your site!
