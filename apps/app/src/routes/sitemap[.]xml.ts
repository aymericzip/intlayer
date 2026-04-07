import {
  App_Admin_Dashboard_Path,
  App_Admin_Discussions_Path,
  App_Admin_Management_Path,
  App_Admin_Organizations_Path,
  App_Admin_Path,
  App_Admin_Projects_Path,
  App_Admin_Users_Path,
  App_Auth_AskResetPassword_Path,
  App_Auth_ChangePassword_Path,
  App_Auth_ResetPassword_Path,
  App_Auth_SignIn_Path,
  App_Auth_SignUp_Path,
  App_Auth_TwoFactor_Path,
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Editor_Path,
  App_Dashboard_Organization_Path,
  App_Dashboard_Profile_Path,
  App_Dashboard_Projects_Path,
  App_Dashboard_Tags_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
  App_Onboarding_Path,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { generateSitemap, type SitemapUrlEntry } from 'intlayer';

const siteUrl = (
  import.meta.env.VITE_SITE_URL ?? 'https://app.intlayer.org'
).replace(/\/$/, '');

const sitemapConfig: SitemapUrlEntry[] = [
  { path: App_Home_Path, changefreq: 'monthly', priority: 1.0 },
  { path: App_Pricing_Path, changefreq: 'monthly', priority: 0.8 },
  { path: App_Onboarding_Path, changefreq: 'monthly', priority: 0.5 },
  { path: App_Auth_SignIn_Path, changefreq: 'never', priority: 0.3 },
  { path: App_Auth_SignUp_Path, changefreq: 'never', priority: 0.3 },
  { path: App_Auth_AskResetPassword_Path, changefreq: 'never', priority: 0.1 },
  { path: App_Auth_ResetPassword_Path, changefreq: 'never', priority: 0.1 },
  { path: App_Auth_ChangePassword_Path, changefreq: 'never', priority: 0.1 },
  { path: App_Auth_TwoFactor_Path, changefreq: 'never', priority: 0.1 },
  { path: App_Dashboard_Editor_Path, changefreq: 'monthly', priority: 0.7 },
  { path: App_Dashboard_Translate_Path, changefreq: 'monthly', priority: 0.7 },
  {
    path: App_Dashboard_Dictionaries_Path,
    changefreq: 'monthly',
    priority: 0.7,
  },
  { path: App_Dashboard_Projects_Path, changefreq: 'monthly', priority: 0.7 },
  { path: App_Dashboard_Tags_Path, changefreq: 'monthly', priority: 0.7 },
  {
    path: App_Dashboard_Organization_Path,
    changefreq: 'monthly',
    priority: 0.7,
  },
  { path: App_Dashboard_Profile_Path, changefreq: 'monthly', priority: 0.7 },
  { path: App_Admin_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Users_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Organizations_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Projects_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Dashboard_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Management_Path, changefreq: 'monthly', priority: 0.4 },
  { path: App_Admin_Discussions_Path, changefreq: 'monthly', priority: 0.4 },
];

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(sitemapConfig, {
          siteUrl,
        });

        return new Response(sitemap, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
