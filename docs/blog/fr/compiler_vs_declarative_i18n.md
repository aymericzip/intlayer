---
createdAt: 2025-11-24
updatedAt: 2025-11-24
title: Compilateur vs. i18n déclaratif
description: Exploration des compromis architecturaux entre l'internationalisation "magique" basée sur un compilateur et la gestion explicite et déclarative du contenu.
keywords:
  - Intlayer
  - Internationalisation
  - Blog
  - Next.js
  - JavaScript
  - React
  - i18n
  - Compilateur
  - Déclaratif
slugs:
  - blog
  - compiler-vs-declarative-i18n
---

# Les arguments pour et contre l'i18n basée sur un compilateur

Si vous développez des applications web depuis plus d'une décennie, vous savez que l'internationalisation (i18n) a toujours été un point de friction. C'est souvent la tâche que personne ne veut faire : extraire les chaînes, gérer les fichiers JSON, et se soucier des règles de pluriel.

Récemment, une nouvelle vague d’**outils i18n basés sur un compilateur** a émergé, promettant de faire disparaître cette douleur. L’argument est séduisant : **Il suffit d’écrire le texte dans vos composants, et laissez l’outil de build gérer le reste.** Pas de clés, pas d’importations, juste de la magie.

Mais comme pour toutes les abstractions en ingénierie logicielle, la magie a un prix.

Dans cet article de blog, nous allons explorer le passage des bibliothèques déclaratives aux approches basées sur un compilateur, les dettes architecturales cachées qu'elles introduisent, et pourquoi la méthode « ennuyeuse » pourrait encore être la meilleure pour les applications professionnelles.

## Table des matières

<TOC/>

## Un bref historique de l'internationalisation

Pour comprendre où nous en sommes, il faut revenir à nos débuts.

Vers 2011–2012, le paysage JavaScript était très différent. Les bundlers tels que nous les connaissons aujourd’hui (Webpack, Vite) n’existaient pas ou étaient à leurs débuts. Nous collions les scripts directement dans le navigateur. C’est à cette époque que des bibliothèques comme **i18next** sont nées.

Elles ont résolu le problème de la seule manière possible à l’époque : **les dictionnaires à l’exécution**. Vous chargiez un énorme objet JSON en mémoire, et une fonction recherchait les clés à la volée. C’était fiable, explicite, et fonctionnait partout.

Avançons jusqu’à aujourd’hui. Nous disposons de compilateurs puissants (SWC, bundlers basés sur Rust) capables d’analyser des arbres de syntaxe abstraite (AST) en quelques millisecondes. Cette puissance a donné naissance à une nouvelle idée : _Pourquoi gérer manuellement les clés ? Pourquoi le compilateur ne pourrait-il pas simplement voir le texte "Hello World" et le remplacer pour nous ?_

Ainsi est née l’i18n basée sur un compilateur.

> **Exemple d’i18n basée sur un compilateur :**
>
> - Paraglide (Modules tree-shaken qui compilent chaque message en une petite fonction ESM afin que les bundlers puissent automatiquement éliminer les locales et clés inutilisées. Vous importez les messages sous forme de fonctions au lieu de faire des recherches par clé de chaîne.)
> - LinguiJS (Compilateur macro-vers-fonction qui réécrit les macros de message comme `<Trans>` en appels de fonctions JS simples au moment de la compilation. Vous obtenez la syntaxe ICU/MessageFormat avec une empreinte runtime très réduite.)
> - Lingo.dev (Se concentre sur l’automatisation du pipeline de localisation en injectant le contenu traduit directement lors de la compilation de votre application React. Il peut générer automatiquement des traductions via l’IA et s’intégrer directement dans le CI/CD.)
> - Wuchale (Préprocesseur orienté Svelte qui extrait le texte en ligne dans les fichiers .svelte et le compile en fonctions de traduction sans wrapper. Il évite les clés de chaîne et sépare complètement la logique d'extraction de contenu du runtime principal de l'application.)
> - Intlayer (Compilateur / CLI d'extraction qui analyse vos composants, génère des dictionnaires typés, et peut optionnellement réécrire le code pour utiliser explicitement le contenu Intlayer. L'objectif est d'utiliser le compilateur pour la rapidité tout en conservant un noyau déclaratif et agnostique au framework.)
>
> **Exemple d’i18n déclarative :**
>
> - i18next / react-i18next / next-i18next (La norme industrielle mature utilisant des dictionnaires JSON au runtime et un écosystème étendu de plugins)
> - react-intl (Fait partie de la bibliothèque FormatJS, se concentrant sur la syntaxe standard des messages ICU et un formatage strict des données)
> - next-intl (Optimisé spécifiquement pour Next.js avec intégration pour l'App Router et les React Server Components)
> - vue-i18n / @nuxt/i18n (La solution standard de l'écosystème Vue offrant des blocs de traduction au niveau des composants et une intégration étroite de la réactivité)
> - svelte-i18n (Un wrapper léger autour des stores Svelte pour des traductions réactives à l'exécution)
> - angular-translate (La bibliothèque de traduction dynamique héritée reposant sur la recherche de clés à l'exécution plutôt que sur la fusion à la compilation)
> - angular-i18n (L'approche native d'Angular, en avance sur le temps, fusionnant les fichiers XLIFF directement dans les templates lors de la compilation)
> - Tolgee (Combine un code déclaratif avec un SDK en contexte pour une édition "click-to-translate" directement dans l'interface utilisateur)
> - Intlayer (Approche par composant, utilisant des fichiers de déclarations de contenu permettant le tree-shaking natif et la validation TypeScript)

## Le compilateur Intlayer

Bien que **Intlayer** soit une solution qui encourage fondamentalement une **approche déclarative** de votre contenu, elle inclut un compilateur pour aider à accélérer le développement ou faciliter le prototypage rapide.

Le compilateur Intlayer parcourt l'AST (Abstract Syntax Tree) de vos composants React, Vue ou Svelte, ainsi que d'autres fichiers JavaScript/TypeScript. Son rôle est de détecter les chaînes de caractères codées en dur et de les extraire dans des déclarations dédiées `.content`.

> Pour plus de détails, consultez la documentation : [Intlayer Compiler Docs](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/compiler.md)

## L'Attrait du Compilateur (L'Approche "Magique")

Il y a une raison pour laquelle cette nouvelle approche est tendance. Pour un développeur, l'expérience est incroyable.

### 1. Vitesse et "Flow"

Quand vous êtes dans votre zone, vous arrêter pour réfléchir à un nom de variable sémantique (`home_hero_title_v2`) casse votre flow. Avec une approche compilateur, vous tapez `<p>Welcome back</p>` et continuez. La friction est nulle.

### 2. La Mission de Sauvetage du Legacy

Imaginez hériter d'une immense base de code avec 5 000 composants et aucune traduction. Adapter cela avec un système manuel basé sur des clés est un cauchemar qui dure des mois. Un outil basé sur un compilateur agit comme une stratégie de sauvetage, extrayant instantanément des milliers de chaînes sans que vous ayez besoin de toucher un seul fichier manuellement.

### 3. L'ère de l'IA

C'est un avantage moderne qu'il ne faut pas négliger. Les assistants de codage IA (comme Copilot ou ChatGPT) génèrent naturellement du JSX/HTML standard. Ils ne connaissent pas votre schéma spécifique de clés de traduction.

- **Déclaratif :** Vous devez réécrire la sortie de l'IA pour remplacer le texte par des clés.
- **Compilateur :** Vous copiez-collez le code de l'IA, et ça fonctionne simplement.

## Le Réalisme : Pourquoi la "Magie" est Dangereuse

Bien que la "magie" soit séduisante, l'abstraction présente des fuites. Compter sur un outil de build pour comprendre l'intention humaine introduit une fragilité architecturale.

### Fragilité heuristique (Le jeu de devinettes)

Le compilateur doit deviner ce qui est contenu et ce qui est code. Cela conduit à des cas limites où vous vous retrouvez à "lutter" contre l'outil.

Considérez ces scénarios :

- Est-ce que `<span className="active"></span>` est extrait ? (C'est une chaîne, mais probablement une classe).
- Est-ce que `<span status="pending"></span>` est extrait ? (C'est une valeur de prop).
- Est-ce que `<span>{"Hello World"}</span>` est extrait ? (C'est une expression JS).
- Est-ce que `<span>Hello {name}. How are you?</span>` est extrait ? (L'interpolation est complexe).
- Est-ce que `<span aria-label="Image of cat"></span>` est extrait ? (Les attributs d'accessibilité nécessitent une traduction).
- Est-ce que `<span data-testid="my-element"></span>` est extrait ? (Les IDs de test NE DOIVENT PAS être traduits).
- Est-ce que `<MyComponent errorMessage="An error occurred" />` est extrait ?
- Est-ce que `<p>This is a paragraph{" "}\n containing multiple lines</p>` est extrait ?
- Est-ce que le résultat de la fonction `<p>{getStatusMessage()}</p>` est extrait ?
- Est-ce que `<div>{isLoading ? "The page is loading" : <MyComponent/>} </div>` est extrait ?
- Est-ce qu’un ID produit comme `<span>AX-99</span>` est extrait ?

Vous finissez inévitablement par ajouter des commentaires spécifiques (comme `// ignore-translation`, ou des props spécifiques comme `data-compiler-ignore="true"`) pour éviter que cela ne casse la logique de votre application.

### Comment Intlayer gère-t-il cette complexité ?

Intlayer utilise une approche mixte pour détecter si un champ doit être extrait pour traduction, en tentant de minimiser les faux positifs :

1.  **Analyse AST :** Il vérifie le type d’élément (par exemple, en distinguant entre un `reactNode`, un `label` ou une prop `title`).
2.  **Reconnaissance de motifs :** Il détecte si la chaîne est en majuscule ou contient des espaces, ce qui suggère qu’il s’agit probablement d’un texte lisible par un humain plutôt que d’un identifiant de code.

### La limite stricte des données dynamiques

L’extraction par le compilateur repose sur une **analyse statique**. Il doit voir la chaîne littérale dans votre code pour générer un ID stable.
Si votre API renvoie une chaîne de code d'erreur comme `server_error`, vous ne pouvez pas la traduire avec un compilateur car ce dernier ne sait pas que cette chaîne existe au moment de la compilation. Vous êtes obligé de créer un système secondaire "runtime-only" uniquement pour les données dynamiques.

### Manque de découpage en chunks

Certains compilateurs ne découpent pas les traductions par page. Si votre compilateur génère un gros fichier JSON par langue (par exemple, `./lang/en.json`, `./lang/fr.json`, etc.), vous risquez de charger le contenu de toutes vos pages pour une seule page visitée. De plus, chaque composant utilisant votre contenu sera probablement hydraté avec beaucoup plus de contenu que nécessaire, ce qui peut entraîner des problèmes de performance.

Faites également attention à charger vos traductions de manière dynamique. Si cela n'est pas fait, vous chargerez le contenu de toutes les langues en plus de celle en cours.

> Pour illustrer le problème, considérez un site avec 10 pages et 10 langues (toutes 100 % uniques). Vous chargeriez le contenu de 99 pages supplémentaires (10 × 10 - 1).

### « Explosion de chunks » et cascades réseau

Pour résoudre le problème du chunking, certaines solutions proposent un découpage par composant, voire par clé. Pourtant, le problème n'est que partiellement résolu. L'argument de vente de ces solutions est souvent de dire « Votre contenu est tree-shaké ».

En effet, si vous chargez le contenu statiquement, votre solution éliminera le contenu inutilisé, mais vous finirez quand même avec le contenu de toutes les langues chargé avec votre application.

Alors pourquoi ne pas le charger dynamiquement ? Oui, dans ce cas, vous chargerez plus de contenu que nécessaire, mais ce n'est pas sans compromis.

Le chargement dynamique du contenu isole chaque morceau de contenu dans son propre chunk, qui ne sera chargé que lorsque le composant est rendu. Cela signifie que vous ferez une requête HTTP par bloc de texte. 1 000 blocs de texte sur votre page ? → 1 000 requêtes HTTP vers vos serveurs. Et pour limiter les dégâts et optimiser le temps de rendu initial de votre application, vous devrez insérer plusieurs frontières de Suspense ou des Skeleton Loaders.

> Note : Même avec Next.js et le SSR, vos composants seront toujours hydratés après le chargement, donc les requêtes HTTP seront toujours effectuées.

La solution ? Adopter une solution qui permet de déclarer des contenus à portée locale, comme le font `i18next`, `next-intl` ou `intlayer`.

> Note : `i18next` et `next-intl` exigent que vous gériez manuellement l'importation de vos namespaces / messages pour chaque page afin d'optimiser la taille de votre bundle. Vous devriez utiliser un analyseur de bundle comme `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js), ou `webpack-bundle-analyzer` (React CRA / Angular / etc) pour détecter si vous polluez votre bundle avec des traductions inutilisées.

### Surcharge de performance à l'exécution

Pour rendre les traductions réactives (afin qu'elles se mettent à jour instantanément lorsque vous changez de langue), le compilateur injecte souvent des hooks de gestion d'état dans chaque composant.

- **Le coût :** Si vous affichez une liste de 5 000 éléments, vous initialisez 5 000 hooks `useState` et `useEffect` uniquement pour le texte. React doit identifier et re-render tous les 5 000 consommateurs simultanément. Cela provoque un blocage massif du "Main Thread", gelant l'interface utilisateur pendant le changement. Cela consomme de la mémoire et des cycles CPU que les bibliothèques déclaratives (qui utilisent généralement un seul fournisseur Context) économisent.

> Notez que le problème est similaire pour d'autres frameworks que React.

## Le piège : l'enfermement fournisseur

Faites attention à choisir une solution i18n qui permet l'extraction ou la migration des clés de traduction.

Dans le cas d'une bibliothèque déclarative, votre code source contient explicitement votre intention de traduction : ce sont vos clés, et vous les contrôlez. Si vous souhaitez changer de bibliothèque, il vous suffit généralement de mettre à jour l'import.

Avec une approche compilateur, votre code source peut être simplement du texte en anglais, sans aucune trace de logique de traduction : tout est caché dans la configuration de l'outil de build. Si ce plugin n'est plus maintenu ou si vous souhaitez changer de solution, vous pourriez être bloqué. Il n'y a pas de moyen simple de "détacher" : il n'y a pas de clés utilisables dans votre code, et vous pourriez devoir régénérer toutes vos traductions pour une nouvelle bibliothèque.

Certaines solutions proposent également des services de génération de traduction. Plus de crédits ? Plus de traductions.

Les compilateurs hachent souvent le texte (par exemple, `"Hello World"` -> `x7f2a`). Vos fichiers de traduction ressemblent à `{ "x7f2a": "Hola Mundo" }`. Le piège : si vous changez de bibliothèque, la nouvelle bibliothèque voit `"Hello World"` et cherche cette clé. Elle ne la trouvera pas car votre fichier de traduction est rempli de hachages (`x7f2a`).

### Verrouillage de plateforme

En choisissant une approche basée sur un compilateur, vous vous enfermez dans la plateforme sous-jacente. Par exemple, certains compilateurs ne sont pas disponibles pour tous les bundlers (comme Vite, Turbopack ou Metro). Cela peut rendre les migrations futures difficiles, et vous pourriez avoir besoin d'adopter plusieurs solutions pour couvrir toutes vos applications.

## L'autre côté : risques de l'approche déclarative

Pour être juste, la méthode déclarative traditionnelle n’est pas parfaite non plus. Elle a ses propres « pièges ».

1.  **L’enfer des namespaces :** Vous devez souvent gérer manuellement quels fichiers JSON charger (`common.json`, `dashboard.json`, `footer.json`). Si vous en oubliez un, l’utilisateur voit des clés brutes.
2.  **Surcharge de récupération :** Sans une configuration soigneuse, il est très facile de charger accidentellement _toutes_ vos clés de traduction pour _toutes_ les pages lors du chargement initial, ce qui alourdit la taille de votre bundle.
3.  **Dérive de synchronisation :** Il est courant que des clés restent dans le fichier JSON longtemps après que le composant qui les utilisait ait été supprimé. Vos fichiers de traduction grossissent indéfiniment, remplis de "clés zombies".

## Le juste milieu d'Intlayer

C'est là que des outils comme **Intlayer** cherchent à innover. Intlayer comprend que, bien que les compilateurs soient puissants, la magie implicite est dangereuse.

Intlayer propose une approche mixte, vous permettant de bénéficier des avantages des deux approches : une gestion déclarative du contenu, également compatible avec son compilateur pour gagner du temps de développement.

Et même si vous n'utilisez pas le compilateur Intlayer, Intlayer propose une commande `transform` (également accessible via l'extension VSCode). Au lieu de faire simplement de la magie lors de l'étape de build cachée, elle peut en fait **réécrire le code de vos composants**. Elle analyse votre texte et le remplace par des déclarations de contenu explicites dans votre base de code.

Cela vous offre le meilleur des deux mondes :

1.  **Granularité :** Vous gardez vos traductions proches de vos composants (améliorant la modularité et le tree-shaking).
2.  **Sécurité :** La traduction devient un code explicite, et non une magie cachée au moment du build.
3.  **Pas de verrouillage :** Puisque le code est transformé en une structure déclarative dans votre dépôt, vous pouvez facilement appuyer sur tab, ou utiliser le copilot de votre IDE, pour générer vos déclarations de contenu, vous ne cachez pas la logique dans un plugin webpack.

## Conclusion

Alors, que devriez-vous choisir ?

**Si vous construisez un MVP, ou souhaitez avancer rapidement :**  
L'approche basée sur le compilateur est un choix valable. Elle vous permet d'avancer incroyablement vite. Vous n'avez pas besoin de vous soucier des structures de fichiers ou des clés. Vous construisez simplement. La dette technique sera un problème pour le "Vous du futur".

**Si vous êtes un développeur junior, ou que l'optimisation ne vous importe pas :**  
Si vous souhaitez la gestion la plus simple possible, une approche basée sur le compilateur est probablement la meilleure. Vous n'aurez pas besoin de gérer vous-même les clés ou les fichiers de traduction — écrivez simplement le texte, et le compilateur automatise le reste. Cela réduit l'effort d'installation et les erreurs courantes liées à l'i18n manuelle.

**Si vous internationalisez un projet existant qui comprend déjà des milliers de composants à refactoriser :**  
Une approche basée sur un compilateur peut être un choix pragmatique ici. La phase d'extraction initiale peut vous faire gagner des semaines ou des mois de travail manuel. Cependant, envisagez d'utiliser un outil comme la commande `transform` d'Intlayer, qui peut extraire des chaînes et les convertir en déclarations de contenu déclaratives explicites. Cela vous offre la rapidité de l'automatisation tout en conservant la sécurité et la portabilité d'une approche déclarative. Vous obtenez le meilleur des deux mondes : une migration initiale rapide sans dette architecturale à long terme.

**Si vous développez une application professionnelle de niveau entreprise :**
La magie est généralement une mauvaise idée. Vous avez besoin de contrôle.

- Vous devez gérer des données dynamiques provenant des backends.
- Vous devez garantir la performance sur des appareils bas de gamme (en évitant les explosions de hooks).
- Vous devez vous assurer de ne pas être enfermé à jamais dans un outil de build spécifique.

Pour les applications professionnelles, la **Gestion de Contenu Déclarative** (comme Intlayer ou des bibliothèques établies) reste la référence. Elle sépare vos préoccupations, maintient votre architecture propre, et garantit que la capacité de votre application à parler plusieurs langues ne dépend pas d'un compilateur "boîte noire" devinant vos intentions.
