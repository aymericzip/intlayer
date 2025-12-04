import type { Dictionary } from 'intlayer';

// ANSI color codes matching the CLI output
const RESET = '\x1b[0m';
const BEIGE = '\x1b[38;5;3m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const GREY_DARK = '\x1b[38;5;239m';

const testSectionContent = {
  key: 'test-section',
  content: [
    '$ npx intlayer test',
    '',
    'Missing translations:',
    ` - ${BEIGE}blog-post${RESET}        - ${RED}French (fr), Spanish (es)${RESET}     - ${GREY_DARK}src/components/BlogPost/blogPost.content.ts${RESET}`,
    ` - ${BEIGE}features-section${RESET} - ${RED}Spanish (es)${RESET}                  - ${GREY_DARK}src/components/FeaturesSection/featuresSection.content.ts${RESET}`,
    ` - ${BEIGE}product-card${RESET}     - ${RED}French (fr)${RESET}                   - ${GREY_DARK}src/components/ProductCard/productCard.content.ts${RESET}`,
    ` - ${BEIGE}product-page${RESET}     - ${RED}Spanish (es)${RESET}                  - ${GREY_DARK}src/components/ProductPage/productPage.content.ts${RESET}`,
    ` - ${BEIGE}about-section${RESET}    - ${RED}French (fr), Spanish (es)${RESET}     - ${GREY_DARK}src/components/AboutSection/aboutSection.content.ts${RESET}`,
    ` - ${BEIGE}faq-section${RESET}      - ${RED}Spanish (es)${RESET}                  - ${GREY_DARK}src/components/FAQSection/faqSection.content.ts${RESET}`,
    ` - ${BEIGE}contact-form${RESET}     - ${RED}French (fr), Spanish (es)${RESET}     - ${GREY_DARK}src/components/ContactForm/contactForm.content.ts${RESET}`,
    ` - ${BEIGE}user-settings${RESET}    - ${RED}Spanish (es)${RESET}                  - ${GREY_DARK}src/components/UserSettings/userSettings.content.ts${RESET}`,
    ` - ${BEIGE}dashboard-widgets${RESET}- ${RED}French (fr)${RESET}                   - ${GREY_DARK}src/components/DashboardWidgets/dashboardWidgets.content.ts${RESET}`,
    `Locales: ${GREEN}English (en), French (fr), Spanish (es)${RESET}`,
    `Required locales: ${GREEN}English (en)${RESET}`,
    `Missing locales: ${RED}French (fr), Spanish (es)${RESET}`,
    `Missing required locales: ${GREEN}—${RESET}`,
    `Total missing locales: ${RED}2${RESET}`,
    `Total missing required locales: ${GREEN}0${RESET}`,
    '',
    '',
  ],
} satisfies Dictionary;

export default testSectionContent;
