import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NavAccordion, NavSectionItem } from './NavSectionItem';

const mockNavigate = vi.fn();
let lastAccordionProps: any = null;

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children, to, activeOptions, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('react-intlayer', () => ({
  useLocale: () => ({ locale: 'en' }),
  usePathname: () => '',
}));

vi.mock('@intlayer/core/localization', () => ({
  getLocalizedUrl: (url: string, locale: string) =>
    locale === 'en' ? url : `/${locale}${url}`,
}));

vi.mock('@intlayer/design-system/accordion', () => ({
  Accordion: (props: any) => {
    lastAccordionProps = props;
    return <div data-testid="accordion">{props.children}</div>;
  },
}));

describe('NavAccordion and NavSectionItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lastAccordionProps = null;
  });

  it('renders section title in accordion when subSections exist', () => {
    const markup = renderToStaticMarkup(
      <NavSectionItem
        sectionKey="cli"
        sectionData={{
          title: 'CLI',
          default: {
            relativeUrl: '/doc/concept/cli',
            slugs: ['doc', 'concept', 'cli'],
          },
          subSections: {
            test: {
              title: 'Test',
              default: {
                relativeUrl: '/doc/concept/cli/test',
                slugs: ['doc', 'concept', 'cli', 'test'],
              },
            },
          },
        }}
        activeSlugs={['doc', 'concept', 'other']}
        level={1}
      />
    );

    expect(markup).toContain('Test');
    expect(lastAccordionProps).toBeTruthy();
  });

  it('navigates and deploys when clicking an accordion with default in docData and !isSelfActive', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli"
        title="CLI"
        to="/doc/concept/cli"
        isActive={false}
        isSelfActive={false}
        isSubSectionActive={false}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();

    // Trigger toggle (simulating click on accordion)
    lastAccordionProps.onToggle(true);

    expect(mockNavigate).toHaveBeenCalledWith({ to: '/doc/concept/cli' });
  });

  it('only toggles when isSelfActive is true', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli"
        title="CLI"
        to="/doc/concept/cli"
        isActive={true}
        isSelfActive={true}
        isSubSectionActive={false}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();

    // Trigger toggle while already on the page
    lastAccordionProps.onToggle(false);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('only toggles without navigating when to is not provided', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli"
        title="CLI"
        isActive={false}
        isSelfActive={false}
        isSubSectionActive={false}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();

    lastAccordionProps.onToggle(true);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
