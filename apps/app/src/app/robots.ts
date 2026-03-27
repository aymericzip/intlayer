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
  App_NotFound_Path,
  App_Onboarding_Path,
  App_Pricing_Path,
} from '@intlayer/design-system/routes';
import { getMultilingualUrls } from 'intlayer';
import type { MetadataRoute } from 'next';

const getAllUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: getAllUrls([
      App_Home_Path,
      App_Pricing_Path,
      App_Onboarding_Path,
      App_Auth_SignIn_Path,
      App_Auth_SignUp_Path,
      App_Auth_AskResetPassword_Path,
    ]),
    disallow: getAllUrls([
      // Dashboards
      App_Dashboard_Editor_Path,
      App_Dashboard_Translate_Path,
      App_Dashboard_Dictionaries_Path,
      App_Dashboard_Projects_Path,
      App_Dashboard_Tags_Path,
      App_Dashboard_Organization_Path,
      App_Dashboard_Profile_Path,

      // Admin Area
      App_Admin_Path,
      App_Admin_Users_Path,
      App_Admin_Organizations_Path,
      App_Admin_Projects_Path,
      App_Admin_Dashboard_Path,
      App_Admin_Management_Path,
      App_Admin_Discussions_Path,

      // Internal Auth Flows (Non-public entry points)
      App_Auth_TwoFactor_Path,
      App_Auth_ResetPassword_Path,
      App_Auth_ChangePassword_Path,

      // Utilities
      App_NotFound_Path,
    ]),
  },
  host: process.env.NEXT_PUBLIC_URL,
  sitemap: [
    `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    `${process.env.NEXT_PUBLIC_DOMAIN}/sitemap.xml`,
  ],
});

export default robots;
