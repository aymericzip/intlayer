import { type NextRequest, NextResponse } from 'next/server';
import puppeteer, { type Browser } from 'puppeteer';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  let browser: Browser | undefined;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // ===== 1️⃣ STRUCTURE LINGUISTIQUE =====
    const html = await page.content();
    const { load } = await import('cheerio');
    const $ = load(html);

    const langTag = $('html').attr('lang') || 'not found';
    const hreflangs = $("link[rel='alternate'][hreflang]").length;
    const hreflangDiversity = new Set(
      $("link[rel='alternate'][hreflang]")
        .map((_, el) => $(el).attr('hreflang'))
        .get()
    ).size;

    // ===== 2️⃣ CONTENU & SEO =====
    const textContent = $('body').text().replace(/\s+/g, ' ');
    const totalChars = textContent.length;
    const textToImageRatio = totalChars / Math.max($('img').length * 1000, 1);
    const metaDescription = $("meta[name='description']").attr('content') || '';
    const title = $('title').text();
    const hasCanonical = $("link[rel='canonical']").length > 0;

    // ===== 3️⃣ UX MULTILINGUE =====
    const hasFlagIcons =
      $("img[src*='flag'], img[alt*='flag'], svg[aria-label*='flag']").length >
      0;

    // ===== LANG SWITCHER ROBUST DETECTION =====
    let hasLangSelector = false;

    // Sélection des éléments candidats : nav, header, footer, menus, boutons, etc.
    const potentialSelectors = $(
      'nav, header, footer, div, ul, li, button, a, span'
    ).filter((_, el) => {
      const text = $(el).text().trim().toLowerCase();
      const matches = text.match(
        /\b(en|english|fr|français|es|español|de|deutsch|it|italiano|jp|ja|日本語)\b/g
      );
      return matches !== null && matches.length > 1;
    });

    if (potentialSelectors.length > 0) {
      hasLangSelector = true;
    } else {
      // Détection par proximité : au moins 2 codes langues visibles sur la page
      const allTextNodes = $('body *')
        .map((_, el) => $(el).text().trim())
        .get()
        .filter(Boolean);

      const languageTokens = allTextNodes.filter((t) =>
        /\b(en|english|fr|français|es|español|de|deutsch|it|italiano|jp|ja|日本語)\b/i.test(
          t
        )
      );

      if (languageTokens.length >= 2) {
        hasLangSelector = true;
      }
    }

    // ===== 5️⃣ TESTS SEO MULTILINGUE (inspiré d’Intlayer) =====
    const urlStructureLocalized = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]')).map(
        (a) => a.getAttribute('href') || ''
      );
      return links.some((href) => /^\/(fr|es|de|ja|it)\//.test(href));
    });

    const sitemapHasAlternate = await page.evaluate(async () => {
      try {
        const resp = await fetch('/sitemap.xml');
        if (!resp.ok) return false;
        const text = await resp.text();
        return /<xhtml:link[^>]+hreflang=[^>]+/.test(text);
      } catch {
        return false;
      }
    });

    const robotsHasLocales = await page.evaluate(async () => {
      try {
        const resp = await fetch('/robots.txt');
        if (!resp.ok) return false;
        const text = await resp.text();
        return /(\/fr\/|\/es\/|\/de\/|\/ja\/|\/it\/)/.test(text);
      } catch {
        return false;
      }
    });

    const hasLocalizedLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]')).some((a) =>
        /\/(fr|es|de|ja|it)\//.test(a.getAttribute('href') || '')
      );
    });

    // ===== 6️⃣ SCORE =====
    const criteria = [
      langTag !== 'not found',
      hreflangs > 0,
      hreflangDiversity > 1,
      textToImageRatio > 0.5,
      metaDescription.length > 0,
      hasCanonical,
      hasLangSelector,
      hasFlagIcons,
      urlStructureLocalized,
      sitemapHasAlternate,
      robotsHasLocales,
      hasLocalizedLinks,
    ];

    const weightedScore =
      (criteria.filter(Boolean).length + (hasLangSelector ? 1 : 0)) /
      (criteria.length + 1);

    const score = Math.round(weightedScore * 100);
    const label =
      score < 40
        ? '🌱 Local only'
        : score < 70
          ? '🌍 Ready to expand'
          : '🚀 Global-ready';

    const ogImage =
      $("meta[property='og:image']").attr('content') ||
      $("meta[name='twitter:image']").attr('content') ||
      $("link[rel='icon']").attr('href') ||
      $("link[rel='shortcut icon']").attr('href') ||
      null;

    // Normaliser l’URL si relative
    const absoluteOgImage = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : new URL(ogImage, targetUrl).href
      : null;

    const summary = {
      langTag,
      hreflangs,
      hreflangDiversity,
      textToImageRatio: textToImageRatio.toFixed(2),
      metaDescription: metaDescription.slice(0, 100),
      title: title.slice(0, 80),
      hasCanonical,
      hasLangSelector,
      hasFlagIcons,
      urlStructureLocalized,
      sitemapHasAlternate,
      robotsHasLocales,
      hasLocalizedLinks,
      ogImage: absoluteOgImage,
    };

    return NextResponse.json({ success: true, score, label, summary });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch or analyze site.' },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
