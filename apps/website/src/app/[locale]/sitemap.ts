import type { MetadataRoute } from 'next';
import type { LocalParams } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Home}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}/${PagesRoutes.Demo}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Demo}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_CRA}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_CRA}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_CRA}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_ViteAndReact}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_ViteAndReact}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_ViteAndReact}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_NextJS}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_NextJS}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Environment_NextJS}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclareYourContent}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclareYourContent}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclareYourContent}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Translation}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Translation}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Translation}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Enumeration}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Enumeration}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_Enumeration}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_FunctionFetching}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_FunctionFetching}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_FunctionFetching}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_NestedId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_NestedId}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_NestedId}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclarationWatching}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclarationWatching}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_ContentDeclaration_DeclarationWatching}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerEditor}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerEditor}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerEditor}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_HowWorksIntlayer}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_HowWorksIntlayer}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_HowWorksIntlayer}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerWithI18n}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerWithI18n}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_IntlayerWithI18n}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_GetStarted}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_GetStarted}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_GetStarted}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Configuration}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.Doc_Interest}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.PrivacyPolicy}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.PrivacyPolicy}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.PrivacyPolicy}/fr`,
      },
    },
  },
  {
    url: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.TermsOfService}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
    alternates: {
      languages: {
        es: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.TermsOfService}/es`,
        fr: `${process.env.NEXT_PUBLIC_URL}${PagesRoutes.TermsOfService}/fr`,
      },
    },
  },
];

export default sitemap;
