import { type DeclarationContent, t } from 'intlayer';
import { PagesRoutes } from '@/Routes';

export type NavLink = {
  key: string;
  title: string;
  subSections?: NavLink[];
  url?: string;
};

type NavbarContent = {
  navbar: NavLink[];
};

export const navbarContent: DeclarationContent<NavbarContent> = {
  id: 'doc-page',
  navbar: [
    {
      key: 'get_started',
      title: t({ fr: 'Commencez', en: 'Get started', es: 'Comenzar' }),
      url: PagesRoutes.Doc_GetStarted,
      subSections: [],
    },
    {
      key: 'concept',
      title: t({ fr: 'Concept', en: 'Concept', es: 'Concepto' }),
      subSections: [
        {
          key: 'how_works_intlayer',
          title: t({
            en: 'How Intlayer Works',
            fr: 'Comment Intlayer fonctionne',
            es: 'Cómo funciona Intlayer',
          }),
          url: PagesRoutes.Doc_HowWorksIntlayer,
        },
        {
          key: 'configuration',
          title: t({
            fr: 'Configuration',
            en: 'Configuration',
            es: 'Configuración',
          }),
          url: PagesRoutes.Doc_Configuration,
        },
        {
          key: 'interest_of_intlayer',

          title: t({
            fr: 'Intérêt de intlayer',
            en: 'Interest of intlayer',
            es: 'Interés de intlayer',
          }),
          url: PagesRoutes.Doc_Interest,
        },
        {
          key: 'intlayer_editor',
          title: t({
            fr: 'Éditeur Intlayer',
            en: 'Intlayer editor',
            es: 'Editor de Intlayer',
          }),
          url: PagesRoutes.Doc_IntlayerEditor,
        },
        {
          key: 'content_declaration',
          title: t({
            fr: 'Déclaration de contenu',
            en: 'Content declaration',
            es: 'Declaración de contenido',
          }),
          subSections: [
            {
              key: 'declare_your_content',
              title: t({
                fr: 'Déclarez votre contenu',
                en: 'Declare your content',
                es: 'Declare su contenido',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_DeclareYourContent,
            },
            {
              key: 'translation',
              title: t({
                fr: 'Traduction',
                en: 'Translation',
                es: 'Traducción',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_Translation,
            },
            {
              key: 'enumeration',

              title: t({
                fr: 'Énumération',
                en: 'Enumeration',
                es: 'Enumeración',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_Enumeration,
            },
            {
              key: 'function_fetching',
              title: t({
                fr: 'Récupération de fonction',
                en: 'Function fetching',
                es: 'Obtención de función',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
            },
            {
              key: 'nested_id',
              title: t({
                fr: 'ID imbriqué',
                en: 'Nested ID',
                es: 'ID anidado',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_NestedId,
            },
            {
              key: 'declaration_watching',
              title: t({
                fr: 'Actualisation des changements',
                en: 'Declaration file watching',
                es: 'Actualización de los cambios',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_DeclarationWatching,
            },
          ],
        },
        {
          key: 'intlayer_with_i18n',
          title: t({
            fr: 'Intlayer avec i18n',
            en: 'Intlayer with i18n',
            es: 'Intlayer con i18n',
          }),
          url: PagesRoutes.Doc_IntlayerWithI18n,
        },
      ],
    },
    {
      key: 'environment',
      title: t({ fr: 'Environnement', en: 'Environment', es: 'Entornos' }),
      subSections: [
        {
          key: 'nextjs',
          title: t({
            fr: 'Intlayer avec NextJS',
            en: 'Intlayer with NextJS',
            es: 'Intlayer con NextJS',
          }),
          url: PagesRoutes.Doc_Environment_NextJS,
        },
        {
          key: 'react_cra',
          title: t({
            fr: 'Intlayer avec React (CRA)',
            en: 'Intlayer with React (CRA)',
            es: 'Intlayer con React (CRA)',
          }),
          url: PagesRoutes.Doc_Environment_CRA,
        },
        {
          key: 'vite_react',
          title: t({
            fr: 'Intlayer avec ViteJS+React',
            en: 'Intlayer with ViteJS+React',
            es: 'Intlayer con ViteJS+React',
          }),
          url: PagesRoutes.Doc_Environment_ViteAndReact,
        },
      ],
    },
  ],
};
