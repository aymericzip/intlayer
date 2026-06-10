---
createdAt: 2025-09-10
updatedAt: 2025-09-10
title: Création d’un assistant de documentation propulsé par RAG (Segmentation, Embeddings et Recherche)
description: Création d’un assistant de documentation propulsé par RAG (Segmentation, Embeddings et Recherche)
keywords:
  - RAG
  - Documentation
  - Assistant
  - Segmentation
  - Embeddings
  - Recherche
slugs:
  - blog
  - rag-powered-documentation-assistant
---

# Création d’un assistant de documentation propulsé par RAG (Segmentation, Embeddings et Recherche)

## Ce que vous obtenez

J’ai créé un assistant de documentation propulsé par RAG et l’ai emballé dans un boilerplate que vous pouvez utiliser immédiatement.

- Livré avec une application prête à l’emploi (Next.js + API OpenAI)
- Comprend une pipeline RAG fonctionnelle (segmentation, embeddings, similarité cosinus)
- Fournit une interface complète de chatbot construite en React
- Tous les composants UI sont entièrement modifiables avec Tailwind CSS
- Enregistre chaque requête utilisateur pour aider à identifier les documents manquants, les points de douleur des utilisateurs et les opportunités produit

👉 [Démo en direct](https://intlayer.org/doc/why) 👉 [Boilerplate de code](https://github.com/aymericzip/smart_doc_RAG)

## Introduction

Si vous vous êtes déjà perdu dans une documentation, à faire défiler sans fin pour trouver une réponse, vous savez à quel point cela peut être pénible. Les docs sont utiles, mais elles sont statiques et leur recherche est souvent maladroite.

C’est là qu’intervient **RAG (Retrieval-Augmented Generation)**. Au lieu de forcer les utilisateurs à fouiller dans le texte, nous pouvons combiner la **récupération** (trouver les bonnes parties de la doc) avec la **génération** (laisser un LLM l’expliquer naturellement).

Dans cet article, je vais vous expliquer comment j’ai construit un chatbot de documentation alimenté par RAG et comment il ne se contente pas d’aider les utilisateurs à trouver des réponses plus rapidement, mais offre également aux équipes produit une nouvelle manière de comprendre les points de douleur des utilisateurs.

## Pourquoi utiliser RAG pour la documentation ?

RAG est devenu une approche populaire pour une raison : c’est l’une des façons les plus pratiques de rendre les grands modèles de langage réellement utiles.

Pour la documentation, les avantages sont clairs :

- Réponses instantanées : les utilisateurs posent des questions en langage naturel et obtiennent des réponses pertinentes.
- Meilleur contexte : le modèle ne voit que les sections de documentation les plus pertinentes, réduisant ainsi les hallucinations.
- Recherche qui semble humaine : un mélange d’Algolia + FAQ + chatbot, tout en un.
- Boucle de rétroaction : en stockant les requêtes, vous découvrez ce avec quoi les utilisateurs ont vraiment du mal.

Ce dernier point est crucial. Un système RAG ne se contente pas de répondre aux questions, il vous indique ce que les gens demandent. Cela signifie :

- Vous découvrez des informations manquantes dans votre documentation.
- Vous voyez apparaître des demandes de fonctionnalités.
- Vous repérez des tendances qui peuvent même orienter la stratégie produit.

Ainsi, RAG n’est pas seulement un outil de support. C’est aussi un **moteur de découverte produit**.

## Comment fonctionne le pipeline RAG

![RAG Pipeline](https://github.com/aymericzip/intlayer/blob/main/docs/assets/rag_flow.svg)

À un niveau élevé, voici la recette que j’ai utilisée :

1.  **Découpage de la documentation** De gros fichiers Markdown sont divisés en morceaux. Le découpage permet de fournir comme contexte uniquement les parties pertinentes de la documentation.
2.  **Génération des embeddings** Chaque morceau est transformé en vecteur en utilisant l’API d’embeddings d’OpenAI (text-embedding-3-large) ou une base de données vectorielle (Chroma, Qdrant, Pinecone).
3.  **Indexation et stockage** Les embeddings sont stockés dans un simple fichier JSON (pour ma démo), mais en production, vous utiliseriez probablement une base de données vectorielle.
4.  **Récupération (R dans RAG)** Une requête utilisateur est transformée en embedding, la similarité cosinus est calculée, et les chunks les plus pertinents sont récupérés.
5.  **Augmentation + Génération (AG dans RAG)** Ces chunks sont injectés dans le prompt pour ChatGPT, afin que le modèle réponde avec le contexte réel de la documentation.
6.  **Enregistrement des requêtes pour feedback** Chaque requête utilisateur est stockée. C’est une mine d’or pour comprendre les points de douleur, les documents manquants ou les nouvelles opportunités.

<Steps>

<Step number={1} title="Lecture des Docs">

La première étape était simple : j’avais besoin d’un moyen pour scanner un dossier docs/ à la recherche de tous les fichiers .md. En utilisant Node.js et glob, j’ai récupéré le contenu de chaque fichier Markdown en mémoire.

Cela maintient la flexibilité du pipeline : au lieu de Markdown, vous pourriez récupérer les documents depuis une base de données, un CMS, ou même une API.

</Step>

<Step number={2} title="Découpage de la documentation">

Pourquoi découper ? Parce que les modèles de langage ont des **limites de contexte**. Leur fournir un livre entier de documentation ne fonctionnera pas.

L’idée est donc de diviser le texte en morceaux gérables (par exemple 500 tokens chacun) avec un chevauchement (par exemple 100 tokens). Le chevauchement assure la continuité pour ne pas perdre le sens aux frontières des morceaux.

**Exemple :**

- Morceau 1 → « …la vieille bibliothèque que beaucoup avaient oubliée. Ses étagères imposantes étaient remplies de livres… »
- Morceau 2 → « …les étagères étaient remplies de livres de tous genres imaginables, chacun murmurant des histoires… »

Le chevauchement garantit que les deux morceaux contiennent un contexte partagé, ce qui rend la récupération cohérente.

Ce compromis (taille des chunks vs chevauchement) est essentiel pour l'efficacité du RAG :

- Trop petit → vous obtenez du bruit.
- Trop grand → vous explosez la taille du contexte.

</Step>

<Step number={3} title="Génération des embeddings">

Une fois les documents découpés en chunks, nous générons des **embeddings**, des vecteurs de haute dimension représentant chaque chunk.

J'ai utilisé le modèle text-embedding-3-large d'OpenAI, mais vous pouvez utiliser n'importe quel modèle d'embedding moderne.

**Exemple d'embedding :**

```js
[
  -0.0002630692, -0.029749284, 0.010225477, -0.009224428, -0.0065269712,
  -0.002665544, 0.003214777, 0.04235309, -0.033162255, -0.00080789323,
  //...+1533 éléments
];
```

Chaque vecteur est une empreinte mathématique du texte, permettant la recherche de similarité.

</Step>

<Step number={4} title="Indexation et stockage des embeddings">

Pour éviter de régénérer les embeddings plusieurs fois, je les ai stockés dans embeddings.json.

En production, vous voudriez probablement une base de données vectorielle telle que :

- Chroma
- Qdrant
- Pinecone
- FAISS, Weaviate, Milvus, etc.

Les bases de données vectorielles gèrent l’indexation, la scalabilité et la recherche rapide. Mais pour mon prototype, un JSON local a très bien fonctionné.

</Step>

<Step number={5} title="Recherche avec similarité cosinus">

Lorsqu’un utilisateur pose une question :

1. Générer un embedding pour la requête.
2. Le comparer à tous les embeddings des documents en utilisant la **similarité cosinus**.
3. Ne garder que les N chunks les plus similaires.

La similarité cosinus mesure l’angle entre deux vecteurs. Une correspondance parfaite obtient un score de **1.0**.

Ainsi, le système trouve les passages de documents les plus proches de la requête.

</Step>

<Step number={6} title="Augmentation + Génération">

Voici la magie. Nous prenons les meilleurs chunks et les injectons dans le **prompt système** pour ChatGPT.

Cela signifie que le modèle répond comme si ces extraits faisaient partie de la conversation.

Le résultat : des réponses précises, **fondées sur la documentation**.

</Step>

<Step number={7} title="Enregistrement des requêtes utilisateur">

C’est la superpuissance cachée.

Chaque question posée est stockée. Au fil du temps, vous constituez un ensemble de données comprenant :

- Les questions les plus fréquentes (idéal pour les FAQ)
- Les questions sans réponse (documentation manquante ou peu claire)
- Les demandes de fonctionnalités déguisées en questions (« Est-ce que cela s’intègre avec X ? »)
- Les cas d’utilisation émergents auxquels vous n’aviez pas pensé

Cela transforme votre assistant RAG en un **outil continu de recherche utilisateur**.

</Step>

<Step number={8} title="Quel est le coût ?">

Une objection courante au RAG est le coût. En pratique, c’est étonnamment peu cher :

- Générer des embeddings pour environ 200 documents prend environ **5 minutes** et coûte **1 à 2 euros**.
- La fonctionnalité de recherche dans la documentation est 100 % gratuite.
- Pour les requêtes, nous utilisons gpt-4o-latest sans le mode « réflexion ». Sur Intlayer, nous observons environ **300 requêtes de chat par mois**, et la facture de l’API OpenAI dépasse rarement **10 $**.

En plus de cela, vous pouvez inclure le coût d’hébergement.

</Step>

<Step number={9} title="Détails de l’implémentation">

Stack :

- Monorepo : espace de travail pnpm
- Package doc : Node.js / TypeScript / API OpenAI
- Frontend : Next.js / React / Tailwind CSS
- Backend : route API Node.js / API OpenAI

Le package `@smart-doc/docs` est un package TypeScript qui gère le traitement de la documentation. Lorsqu’un fichier markdown est ajouté ou modifié, le package inclut un script `build` qui reconstruit la liste de documentation dans chaque langue, génère des embeddings, et les stocke dans un fichier `embeddings.json`.

Pour le frontend, nous utilisons une application Next.js qui fournit :

- Rendu Markdown vers HTML
- Une barre de recherche pour trouver la documentation pertinente
- Une interface de chatbot pour poser des questions sur la documentation

Pour effectuer une recherche dans la documentation, l’application Next.js inclut une route API qui appelle une fonction du package `@smart-doc/docs` pour récupérer les segments de documentation correspondant à la requête. En utilisant ces segments, nous pouvons retourner une liste de pages de documentation pertinentes pour la recherche de l’utilisateur.

Pour la fonctionnalité de chatbot, nous suivons le même processus de recherche mais injectons en plus les segments de documentation récupérés dans le prompt envoyé à ChatGPT.

Voici un exemple de prompt envoyé à ChatGPT :

Prompt système :

```txt
Vous êtes un assistant utile capable de répondre aux questions concernant la documentation Intlayer.

Segments liés :

-----
docName: "getting-started"
docChunk: "1/3"
docUrl: "https://example.com/docs/fr/getting-started"
---

# Comment démarrer

...

-----
docName: "another-doc"
docChunk: "1/5"
docUrl: "https://example.com/docs/fr/another-doc"
---

# Un autre document

...
```

Requête utilisateur :

```txt
Comment démarrer ?
```

Nous utilisons SSE pour diffuser la réponse depuis la route API.

Comme mentionné, nous utilisons gpt-4-turbo sans mode "réflexion". Les réponses sont pertinentes et la latence est faible.
Nous avons expérimenté avec gpt-5, mais la latence était trop élevée (parfois jusqu'à 15 secondes pour une réponse). Nous y reviendrons à l'avenir.

👉 [Essayez la démo ici](https://intlayer.org/doc/why) 👉 [Consultez le modèle de code sur GitHub](https://github.com/aymericzip/smart_doc_RAG)

</Step>

</Steps>

## Aller plus loin

Ce projet est une implémentation minimale. Mais vous pouvez l'étendre de nombreuses façons :

- Serveur MCP → la fonction de recherche dans la documentation vers un serveur MCP pour connecter la documentation à n'importe quel assistant IA

- Bases de données vectorielles → évoluer jusqu'à des millions de fragments de documentation
- LangChain / LlamaIndex → frameworks prêts à l'emploi pour les pipelines RAG
- Tableaux de bord analytiques → visualiser les requêtes des utilisateurs et les points de douleur
- Recherche multi-source → extraire non seulement des documents, mais aussi des entrées de base de données, articles de blog, tickets, etc.
- Amélioration des prompts → reranking, filtrage, et recherche hybride (mot-clé + sémantique)

## Limitations rencontrées

- Le découpage en fragments et le chevauchement sont empiriques. Le bon équilibre (taille des fragments, pourcentage de chevauchement, nombre de fragments récupérés) nécessite des itérations et des tests.
- Les embeddings ne sont pas régénérés automatiquement lorsque les documents changent. Notre système réinitialise les embeddings d'un fichier uniquement si le nombre de fragments diffère de ce qui est stocké.
- Dans ce prototype, les embeddings sont stockés en JSON. Cela fonctionne pour des démonstrations mais pollue Git. En production, une base de données ou un magasin vectoriel dédié est préférable.

## Pourquoi c’est important au-delà de la documentation

La partie intéressante n’est pas seulement le chatbot. C’est la **boucle de rétroaction**.

Avec RAG, vous ne vous contentez pas de répondre :

- Vous apprenez ce qui embrouille les utilisateurs.
- Vous découvrez quelles fonctionnalités ils attendent.
- Vous adaptez votre stratégie produit en fonction des requêtes réelles.

**Exemple :**

Imaginez lancer une nouvelle fonctionnalité et voir instantanément :

- 50 % des questions portent sur la même étape de configuration peu claire
- Les utilisateurs demandent à plusieurs reprises une intégration que vous ne supportez pas encore
- Les gens recherchent des termes qui révèlent un nouveau cas d’usage

C’est de **l’intelligence produit** directement issue de vos utilisateurs.

## Conclusion

- Dans ce prototype, les embeddings sont stockés en JSON. Cela fonctionne pour des démonstrations mais pollue Git. En production, une base de données ou un magasin vectoriel dédié est préférable.

## Pourquoi c’est important au-delà de la documentation

L’aspect intéressant ne se limite pas au chatbot. C’est la **boucle de rétroaction**.

Avec RAG, vous ne faites pas que répondre :

- Vous apprenez ce qui embrouille les utilisateurs.
- Vous découvrez quelles fonctionnalités ils attendent.
- Vous adaptez votre stratégie produit en fonction des requêtes réelles.

**Exemple :**

Imaginez lancer une nouvelle fonctionnalité et voir instantanément :

- 50 % des questions portent sur la même étape de configuration peu claire
- Les utilisateurs demandent à plusieurs reprises une intégration que vous ne supportez pas encore
- Les gens recherchent des termes qui révèlent un nouveau cas d’usage

C’est de **l’intelligence produit** directement issue de vos utilisateurs.

## Conclusion

RAG est l’une des manières les plus simples et puissantes de rendre les LLM pratiques. En combinant **récupération + génération**, vous pouvez transformer des docs statiques en un **assistant intelligent** et, en même temps, obtenir un flux continu d’informations produit.

Pour moi, ce projet a montré que RAG n’est pas qu’un simple tour technique. C’est une façon de transformer la documentation en :

- un système de support interactif
- un canal de retour d’expérience
- un outil de stratégie produit

👉 [Essayez la démo ici](https://intlayer.org/doc/why) 👉 [Consultez le modèle de code sur GitHub](https://github.com/aymericzip/smart_doc_RAG)

Et si vous expérimentez aussi avec RAG, j’aimerais beaucoup savoir comment vous l’utilisez.
