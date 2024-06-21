import { type DeclarationContent, t, enu } from 'intlayer';
import { PagesRoutes } from '@/Routes';

type NavLink = {
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
      title: t({ fr: 'Commencez', en: 'Get started', es: 'Comenzar' }),
      url: PagesRoutes.Doc_GetStarted,
      subSections: [],
    },
    {
      title: t({ fr: 'Concept', en: 'Concept', es: 'Concepto' }),
      subSections: [
        {
          title: t({
            fr: 'Configuration',
            en: 'Configuration',
            es: 'Configuración',
          }),
          url: PagesRoutes.Doc_Configuration,
        },
        {
          title: t({
            fr: 'Intérêt de intlayer',
            en: 'Interest of intlayer',
            es: 'Interés de intlayer',
          }),
          url: PagesRoutes.Doc_Interest,
        },
        {
          title: t({
            fr: 'Éditeur Intlayer',
            en: 'Intlayer editor',
            es: 'Editor de Intlayer',
          }),
          url: PagesRoutes.Doc_IntlayerEditor,
        },
        {
          title: t({
            fr: 'Déclaration de contenu',
            en: 'Content declaration',
            es: 'Declaración de contenido',
          }),
          url: PagesRoutes.Doc_ContentDeclaration,
          subSections: [
            {
              title: t({
                fr: 'Traduction',
                en: 'Translation',
                es: 'Traducción',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_Translation,
            },
            {
              title: t({
                fr: 'Énumération',
                en: 'Enumeration',
                es: 'Enumeración',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_Enumeration,
            },
            {
              title: t({
                fr: 'Récupération de fonction',
                en: 'Function fetching',
                es: 'Obtención de función',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
            },
            {
              title: t({
                fr: 'ID imbriqué',
                en: 'Nested ID',
                es: 'ID anidado',
              }),
              url: PagesRoutes.Doc_ContentDeclaration_NestedId,
            },
          ],
        },
      ],
    },
    {
      title: t({ fr: 'Environnements', en: 'Environments', es: 'Entornos' }),
      subSections: [
        {
          title: t({
            fr: 'Intlayer avec NextJS',
            en: 'Intlayer with NextJS',
            es: 'Intlayer con NextJS',
          }),
          url: PagesRoutes.Doc_Environment_NextJS,
        },
        {
          title: t({
            fr: 'Intlayer avec React (CRA)',
            en: 'Intlayer with React (CRA)',
            es: 'Intlayer con React (CRA)',
          }),
          url: PagesRoutes.Doc_Environment_CRA,
        },
        {
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
