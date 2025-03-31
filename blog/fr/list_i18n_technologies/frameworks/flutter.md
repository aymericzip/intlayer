# Explorer les solutions i18n pour traduire votre application Flutter

Dans un monde de plus en plus connecté, offrir votre application Flutter en plusieurs langues peut élargir sa portée et améliorer son utilisation pour les non-anglophones. La mise en œuvre de l'internationalisation (i18n) dans Flutter garantit que le texte, les dates et d'autres informations culturellement sensibles sont correctement localisés. Dans cet article, nous explorerons différentes approches de l'i18n dans Flutter, des frameworks officiels aux bibliothèques communautaires, afin que vous puissiez choisir celle qui convient le mieux à votre projet.

---

![i18n illustration](https://github.com/aymericzip/intlayer/blob/main/blog/assets/i18n.webp)

## Qu'est-ce que l'internationalisation (i18n) ?

L'internationalisation, communément appelée i18n, est le processus de conception d'une application afin qu'elle puisse facilement prendre en charge plusieurs langues et formats culturels. Dans Flutter, cela implique de configurer votre application pour gérer des chaînes localisées, des formats de date/heure et des formats de nombre sans effort. En préparant votre application Flutter pour l'i18n, vous construisez une base solide pour intégrer des traductions et gérer les différences régionales avec un minimum de friction.

Si vous êtes nouveau dans ce concept, consultez notre article : [Qu'est-ce que l'internationalisation (i18n) ? Définition et défis](https://github.com/aymericzip/intlayer/blob/main/blog/fr/what_is_internationalization.md).

---

## Le défi de la traduction pour les applications Flutter

L'architecture réactive et basée sur des widgets de Flutter présente des défis uniques en matière d'i18n :

- **UI basée sur des widgets** : Les chaînes de texte peuvent être éparpillées dans divers widgets, nécessitant un moyen systématique de centraliser les traductions tout en gardant l'interface utilisateur réactive.
- **Contenu dynamique** : Les traductions pour des données en temps réel ou récupérées (par exemple, à partir d'API REST ou de Firebase) peuvent compliquer votre configuration.
- **Gestion d'état** : Maintenir la bonne locale à travers la navigation de l'application et les transitions d'état peut nécessiter des solutions comme `Provider`, `Riverpod` ou `Bloc`.
- **Materiel vs. Cupertino** : Flutter propose des widgets UI multiplateformes pour Android (Materiel) et iOS (Cupertino), donc garantir une i18n cohérente sur les deux peut ajouter de la complexité.
- **Déploiement et mises à jour** : Gérer plusieurs langues peut signifier des bundles d'application plus volumineux ou un téléchargement à la demande d'actifs linguistiques, nécessitant une stratégie qui équilibre performance et expérience utilisateur.

---

## Solutions i18n principales pour Flutter

Flutter fournit un support de localización officiel, et la communauté a développé des bibliothèques supplémentaires qui facilitent la gestion de plusieurs locales. Voici quelques approches couramment utilisées.

### 1. i18n officiel de Flutter (intl + fichiers ARB)

**Aperçu**  
Flutter est livré avec un support officiel pour la localisation via le package [`intl`](https://pub.dev/packages/intl) et l'intégration avec la bibliothèque `flutter_localizations`. Cette approche utilise généralement des fichiers **ARB (Application Resource Bundle)** pour stocker et gérer vos traductions.

**Caractéristiques clés**

- **Officiel et intégré** : Pas besoin de bibliothèques externes, `MaterialApp` et `CupertinoApp` peuvent directement référencer vos localisations.
- **Package intl** : Offre la mise en forme des dates/nombres, des pluriels, la gestion du genre et d'autres fonctionnalités basées sur l'ICU.
- **Vérifications à la compilation** : Générer du code à partir de fichiers ARB aide à attraper les traductions manquantes lors de la compilation.
- **Forte communauté de support** : Soutenu par Google, avec une richesse de documentation et d'exemples.

**Considérations**

- **Configuration manuelle** : Vous devrez configurer les fichiers ARB, configurer `MaterialApp` ou `CupertinoApp` avec `localizationsDelegates`, et gérer plusieurs fichiers `.arb` pour chaque langue.
- **Hot Reload/Restart** : Changer de langue à l'exécution nécessite généralement un redémarrage complet de l'application pour prendre en compte la nouvelle locale.
- **Scalabilité** : Pour les applications plus grandes, le nombre de fichiers ARB peut augmenter, nécessitant une structure de dossier disciplinée.

---

### 2. Easy Localization

Dépôt : [https://pub.dev/packages/easy_localization](https://pub.dev/packages/easy_localization)

**Aperçu**  
**Easy Localization** est une bibliothèque communautaire conçue pour simplifier les tâches de localisation dans Flutter. Elle se concentre sur une approche plus dynamique pour charger et changer de langues, souvent avec un minimum de code.

**Caractéristiques clés**

- **Configuration simplifiée** : Vous pouvez envelopper votre widget racine avec `EasyLocalization` pour gérer les locales et traductions prises en charge sans effort.
- **Changement de langue en temps réel** : Changez la langue de l'application à la volée sans redémarrages manuels, améliorant l'expérience utilisateur.
- **JSON/YAML/CSV** : Stockez les traductions dans différents formats de fichiers pour plus de flexibilité.
- **Pluriel et contexte** : Fonctionnalités de base pour gérer les formes plurielles et les traductions contextuelles.

**Considérations**

- **Moins de contrôle granulaire** : Bien que plus simple, vous pourriez avoir moins de contrôle sur les optimisations à l'heure de construction par rapport à l'approche officielle ARB.
- **Performance** : Le chargement de plusieurs fichiers de traduction volumineux à l'exécution peut affecter le temps de démarrage pour des applications plus grandes.
- **Communauté et mises à jour** : Très axé sur la communauté, ce qui peut être un avantage pour le support mais aussi sujet à des changements au fil du temps.

---

### 3. Flutter_i18n

Dépôt : [https://pub.dev/packages/flutter_i18n](https://pub.dev/packages/flutter_i18n)

**Aperçu**  
**Flutter_i18n** offre une approche similaire à Easy Localization, en se concentrant sur la garde des traductions et de la logique en dehors de votre code de widget principal. Il prend en charge le chargement à la fois synchrone et asynchrone des fichiers de localisation.

**Caractéristiques clés**

- **Formats de fichiers multiples** : Utilisez JSON ou YAML pour stocker des traductions.
- **Support Hot Reload** : Vous pouvez changer de langue dynamiquement et voir les changements immédiatement en mode développement.
- **Widgets et hooks i18n** : Fournissent des widgets spécialisés comme `I18nText` pour une utilisation plus simple dans l'interface utilisateur, ainsi que des hooks pour des solutions basées sur l'état.
- **Localisation au niveau des itinéraires** : Associez des locales spécifiques avec certains itinéraires ou modules, ce qui peut être pratique pour les grandes applications.

**Considérations**

- **Gestion manuelle des langues** : Vous devrez gérer soigneusement les changements de locale pour éviter les conditions de concurrence ou les données obsolètes.
- **Surcharge d'intégration** : Bien que flexible, la configuration de fonctionnalités avancées (comme les traductions imbriquées ou les locales de secours) peut nécessiter plus de configuration.
- **Maturité de la communauté** : Raisonnablement mature avec des mises à jour régulières, mais moins officiel que la solution Flutter de base.

---

### 4. Intlayer

Site web : [https://intlayer.org/](https://intlayer.org/)

**Aperçu**  
**Intlayer** est une solution i18n open-source visant à simplifier le support multilingue à travers plusieurs frameworks, y compris **Flutter**. Elle met l'accent sur une approche déclarative, un typage fort, et le support SSR dans d'autres écosystèmes, bien que le SSR ne soit pas typique dans Flutter standard, vous pourriez trouver une synergie si votre projet utilise Flutter web ou des frameworks avancés.

**Caractéristiques clés**

- **Traduction déclarative** : Définissez des dictionnaires de traduction soit à un niveau de widget soit dans un fichier centralisé pour une architecture plus propre.
- **TypeScript et auto-complétion (Web)** : Bien que cette fonctionnalité bénéficie principalement aux frameworks web, l'approche de traduction typée peut toujours guider un code structuré dans Flutter.
- **Chargement asynchrone** : Chargez des actifs de traduction dynamiquement, réduisant potentiellement la taille initiale du bundle pour des applications multilingues.
- **Intégration avec Flutter** : Une intégration de base peut être mise en place pour tirer parti de l'approche Intlayer pour des traductions structurées.

**Considérations**

- **Maturité spécifique à Flutter** : Bien qu'en croissance, la communauté Flutter d'Intlayer est plus petite, vous pourriez donc trouver moins de tutoriels ou d'exemples de code par rapport à d'autres bibliothèques.
- **SSR** : La bibliothèque soutient fortement le SSR dans des contextes basés sur le web, mais l'utilisation du SSR dans Flutter est plus spécialisée (par exemple, Flutter web ou des approches serveur personnalisées).
- **Configuration personnalisée** : Nécessite une initialisation pour s'intégrer au flux de `MaterialApp` ou `CupertinoApp` de Flutter.

---

### Pensées finales

Lorsque vous évaluez une approche d'i18n pour Flutter :

1. **Déterminez votre flux de travail** : Décidez si vous préférez les **traductions à la compilation** (via ARB + `intl`) pour une meilleure sécurité de type et performance ou les **traductions à l'exécution** (via Easy Localization, Flutter_i18n) pour plus de flexibilité.
2. **Changement de langue** : Si un changement de langue en temps réel sans redémarrage de l'application est crucial, considérez une bibliothèque basée sur l'exécution.
3. **Scalabilité et organisation** : À mesure que votre application Flutter grandit, planifiez comment vous organiserez, nommerez et versionnerez vos fichiers de traduction. Ceci est particulièrement pertinent lorsque vous traitez avec de nombreuses locales.
4. **Performance contre flexibilité** : Chaque approche implique des compromis. Les solutions précompilées offrent généralement une surcharge d'exécution plus petite, tandis que les traductions à la volée offrent une expérience utilisateur plus fluide.
5. **Communauté et écosystème** : Les solutions officielles comme ARB + `intl` offrent généralement une stabilité à long terme. Les bibliothèques tierces offrent une commodité supplémentaire et des fonctionnalités à l'exécution mais peuvent nécessiter plus de diligence concernant les mises à jour et le support.

Toutes ces solutions peuvent vous aider à créer une application Flutter multilingue. Le choix final dépend de vos **exigences en matière de performance**, **flux de travail des développeurs**, **objectifs d'expérience utilisateur**, et **maintenabilité à long terme**. En choisissant soigneusement une stratégie qui s'aligne sur les priorités de votre projet, vous vous assurerez que votre application Flutter peut ravir les utilisateurs du monde entier.
