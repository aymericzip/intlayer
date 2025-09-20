---
createdAt: 2025-03-01
updatedAt: 2025-09-20
title: Tester votre contenu
description: Découvrez comment tester votre contenu avec Intlayer.
keywords:
  - Test
  - Intlayer
  - Internationalisation
  - CMS
  - Système de gestion de contenu
  - Éditeur visuel
slugs:
  - doc
  - testing
---

# Tester votre contenu

Ce guide montre comment vérifier automatiquement que vos dictionnaires sont complets, détecter les traductions manquantes avant la mise en production, et tester l’interface localisée dans votre application.

---

## Ce que vous pouvez tester

- **Traductions manquantes** : échouer le CI si des locales requises manquent dans un dictionnaire.
- **Rendu de l’interface localisée** : afficher des composants avec un fournisseur de locale spécifique et vérifier le texte/attributs visibles.
- **Audits au moment de la compilation** : exécuter un audit rapide localement via la CLI.

---

## Démarrage rapide : audit via CLI

Lancez l’audit depuis la racine de votre projet :

```bash
npx intlayer content test
```

Options utiles :

- `--env-file [path]` : charger les variables d’environnement depuis un fichier.
- `-e, --env [name]` : sélectionner un profil d’environnement.
- `--base-dir [path]` : définir le répertoire de base de l’application pour la résolution.
- `--verbose` : afficher les logs détaillés.
- `--prefix [label]` : préfixer les lignes de log.

Note : la CLI affiche un rapport détaillé mais ne retourne pas un code d’erreur en cas d’échec. Pour un contrôle en CI, ajoutez un test unitaire (ci-dessous) qui vérifie qu’aucune locale requise n’est manquante.

---

## Test programmatique (Vitest/Jest)

Utilisez l’API CLI d’Intlayer pour vérifier qu’il n’y a pas de traductions manquantes pour vos locales requises.

```ts file=i18n.test.ts
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("traductions", () => {
  it("n’a pas de locales requises manquantes", () => {
    const result = listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      // Utile lorsque le test échoue localement ou en CI
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Équivalent Jest :

```ts file=i18n.test.ts
import { listMissingTranslations } from "intlayer/cli";

test("n’a pas de locales requises manquantes", () => {
  const result = listMissingTranslations();

  if (result.missingRequiredLocales.length > 0) {
    // eslint-disable-next-line no-console
    console.log(result.missingTranslations);
  }

  expect(result.missingRequiredLocales).toHaveLength(0);
});
```

Comment ça fonctionne :

- Intlayer lit votre configuration (locales, requiredLocales) et les dictionnaires déclarés, puis rapporte :
  - `missingTranslations` : pour chaque clé, quelles locales sont manquantes et dans quel fichier.
  - `missingLocales` : l’union de toutes les locales manquantes.
  - `missingRequiredLocales` : sous-ensemble limité aux `requiredLocales` (ou toutes les locales si `requiredLocales` n’est pas défini).

---

## Tester une interface localisée (React / Next.js)

Rendez les composants sous un fournisseur Intlayer et vérifiez le contenu visible.

Exemple React (Testing Library) :

```tsx
import { IntlayerProvider } from "react-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders localized title in English", () => {
  render(
    <IntlayerProvider locale="en-US">
      <MyComponent />
    </IntlayerProvider>
  );

  expect(screen.getByText("Titre anglais attendu")).toBeInTheDocument();
});
```

Exemple Next.js (App Router) : utilisez le wrapper du framework :

```tsx
import { IntlayerClientProvider } from "next-intlayer/client";
import { render, screen } from "@testing-library/react";
import { MyPage } from "./MyPage";

test("affiche le titre localisé en français", () => {
  render(
    <IntlayerClientProvider locale="fr-FR">
      <MyPage />
    </IntlayerClientProvider>
  );
  expect(
    screen.getByRole("heading", { name: "Titre attendu" })
  ).toBeInTheDocument();
});
```

Conseils :

- Lorsque vous avez besoin des valeurs brutes des chaînes pour des attributs (par exemple, `aria-label`), accédez au champ `.value` retourné par `useIntlayer` dans React.
- Gardez les dictionnaires proches des composants pour faciliter les tests unitaires et le nettoyage.

---

## Intégration Continue

Ajoutez un test qui fait échouer la compilation lorsque des traductions requises sont manquantes.

`package.json` :

```json
{
  "scripts": {
    "test:i18n": "vitest run -c"
  }
}
```

Exemple GitHub Actions :

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run test:i18n
```

Optionnel : lancez l'audit CLI pour un résumé lisible par un humain en parallèle des tests :

```bash
npx intlayer content test --verbose
```

---

## Dépannage

- Assurez-vous que votre configuration Intlayer définit `locales` et (optionnellement) `requiredLocales`.
- Si votre application utilise des dictionnaires dynamiques ou distants, exécutez les tests dans un environnement où les dictionnaires sont disponibles.
- Pour les monorepos mixtes, utilisez `--base-dir` pour indiquer au CLI la racine correcte de l'application.

---

## Historique du document

| Version | Date       | Modifications          |
| ------- | ---------- | ---------------------- |
| 6.0.0   | 2025-09-20 | Introduction des tests |
