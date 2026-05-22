import { type Dictionary, t } from 'intlayer';

const referralLinkContent = {
  key: 'referral-link',
  content: {
    yourReferralLink: t({
      en: 'Your referral link',
    }),

    shareThisLinkWhenSomeone: t({
      en: 'Share this link. When someone subscribes via your link, you earn a commission.',
    }),
  },
} satisfies Dictionary;

export default referralLinkContent;
