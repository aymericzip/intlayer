# MobileFeaturesSection Component

## Overview

A mobile-optimized version of the FeaturesSection component that replaces the complex carousel with an accordion-style interface for better mobile performance and user experience.

## Features

- **Accordion Layout**: Expandable/collapsible sections for better mobile navigation
- **Touch-Friendly**: Larger touch targets and simplified interactions
- **Performance Optimized**: Lightweight animations and conditional loading
- **Design System Integration**: Uses Container component from @intlayer/design-system
- **Internationalization**: Full support for 13 languages

## Props

```tsx
type MobileSectionItemProps = {
  section: Section;
  isActive: boolean;
  onToggle: () => void;
};
```

## Usage

```tsx
import { MobileFeaturesSection } from './MobileFeaturesSection';

// Automatically used by FeaturesSection on mobile devices
<MobileFeaturesSection />
```

## Content Structure

The component uses internationalized content from `index.content.ts`:

```tsx
const mobileFeaturesSectionContent = {
  key: 'mobile-features-section',
  title: t({ en: 'Features', fr: 'Fonctionnalités', ... }),
  description: t({ en: 'Discover...', fr: 'Découvrez...', ... }),
  sections: {
    codebase: { title: t(...), description: t(...) },
    'visual-editor': { title: t(...), description: t(...) },
    multilingual: { title: t(...), description: t(...) },
    markdown: { title: t(...), description: t(...) },
    autocomplete: { title: t(...), description: t(...) },
  }
}
```

## Supported Languages

- English (en, en-GB)
- French (fr)
- Spanish (es)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Chinese (zh)
- Japanese (ja)
- Arabic (ar)
- Hindi (hi)
- Korean (ko)

## Performance Improvements

- **No Scroll Calculations**: Eliminates complex scroll-based animations
- **Simplified Rendering**: Linear layout instead of complex positioning
- **Lighter Animations**: Basic CSS transitions instead of heavy Framer Motion
- **Conditional Loading**: Heavy components only load when expanded

## Dependencies

- `@intlayer/design-system` - Container component and useDevice hook
- `framer-motion` - Lightweight animations
- `next-intlayer` - Internationalization support
- `intlayer` - Content management and translation
