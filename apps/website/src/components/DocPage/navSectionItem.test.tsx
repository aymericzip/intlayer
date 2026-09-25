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
  getPathWithoutLocale: (path: string) => path,
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

  it('closes without navigating when the drawer is already open and clicked', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli-open"
        title="CLI Open"
        to="/doc/concept/cli"
        isActive={false}
        isSelfActive={false}
        isSubSectionActive={false}
        defaultIsOpen={true}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();
    expect(lastAccordionProps.isOpen).toBe(true);

    // Clicking when already open should close and not navigate
    lastAccordionProps.onToggle(false);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate on toggle when hasDefaultSection is true, but clicking title navigates', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli"
        title="CLI"
        to="/doc/concept/cli"
        isActive={false}
        isSelfActive={false}
        isSubSectionActive={false}
        hasDefaultSection={true}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();

    // Trigger toggle (simulating click on chevron)
    lastAccordionProps.onToggle(true);

    expect(mockNavigate).not.toHaveBeenCalled();

    // Trigger title click
    const stopPropagation = vi.fn();
    lastAccordionProps.header.props.onClick({ stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/doc/concept/cli' });
  });

  it('collapses when clicking on the title if it is already selected', () => {
    renderToStaticMarkup(
      <NavAccordion
        label="cli-selected"
        title="CLI Selected"
        to="/doc/concept/cli"
        isActive={true}
        isSelfActive={true}
        isSubSectionActive={false}
        defaultIsOpen={true}
        hasDefaultSection={true}
      >
        <div>Content</div>
      </NavAccordion>
    );

    expect(lastAccordionProps).toBeTruthy();
    expect(lastAccordionProps.isOpen).toBe(true);

    // Trigger title click when already selected
    const stopPropagation = vi.fn();
    lastAccordionProps.header.props.onClick({ stopPropagation });

    expect(stopPropagation).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
