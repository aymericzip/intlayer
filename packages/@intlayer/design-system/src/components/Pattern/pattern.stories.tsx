import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../Container';
import { H3 } from '../Headers';
import { DotPattern, GridPattern, Spotlight } from './index';

/**
 * Pattern Components Stories
 *
 * Collection of SVG-based decorative pattern components for backgrounds and visual effects.
 * Includes DotPattern, GridPattern, and Spotlight components with comprehensive customization options.
 */
const meta: Meta = {
  title: 'Components/Pattern',
  parameters: {
    docs: {
      description: {
        component:
          'A collection of decorative SVG pattern components perfect for backgrounds, visual interest, and modern design effects.',
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;

/**
 * DotPattern Stories
 */
export const DotPatternBasic: StoryObj<typeof DotPattern> = {
  name: 'DotPattern - Basic',
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border border-neutral-200 bg-background">
      <DotPattern />
      <Container className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <H3>Basic Dot Pattern</H3>
          <p className="mt-2 text-neutral-600">
            Default 16x16px grid with 1px radius dots
          </p>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic dot pattern with default settings - subtle background texture.',
      },
    },
  },
};

export const DotPatternCustom: StoryObj<typeof DotPattern> = {
  name: 'DotPattern - Variations',
  render: () => (
    <div className="space-y-6">
      {/* Small Dense Dots */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <DotPattern
          width={12}
          height={12}
          cr={0.5}
          className="fill-primary/20"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Dense Small Dots</H3>
            <p className="text-neutral-600 text-sm">
              12x12px grid, 0.5px radius, primary color
            </p>
          </div>
        </Container>
      </div>

      {/* Large Sparse Dots */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <DotPattern
          width={32}
          height={32}
          cr={2}
          cx={16}
          cy={16}
          className="fill-accent/25"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Large Centered Dots</H3>
            <p className="text-neutral-600 text-sm">
              32x32px grid, 2px radius, centered positioning
            </p>
          </div>
        </Container>
      </div>

      {/* Offset Pattern */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <DotPattern
          width={20}
          height={20}
          x={10}
          y={10}
          cr={1.5}
          className="fill-secondary/30"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Offset Pattern</H3>
            <p className="text-neutral-600 text-sm">
              10px offset, creates diamond-like arrangement
            </p>
          </div>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different dot pattern variations showing size, spacing, and color customization options.',
      },
    },
  },
};

/**
 * GridPattern Stories
 */
export const GridPatternBasic: StoryObj<typeof GridPattern> = {
  name: 'GridPattern - Basic',
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border border-neutral-200 bg-background">
      <GridPattern />
      <Container className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center">
          <H3>Basic Grid Pattern</H3>
          <p className="mt-2 text-neutral-600">
            Default 40x40px grid for structured layouts
          </p>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Basic grid pattern perfect for technical layouts and structured designs.',
      },
    },
  },
};

export const GridPatternVariations: StoryObj<typeof GridPattern> = {
  name: 'GridPattern - Variations',
  render: () => (
    <div className="space-y-6">
      {/* Fine Grid */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <GridPattern
          width={20}
          height={20}
          strokeDasharray={1}
          className="stroke-primary/20"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Fine Dashed Grid</H3>
            <p className="text-neutral-600 text-sm">
              20px cells with dashed lines
            </p>
          </div>
        </Container>
      </div>

      {/* Large Grid */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <GridPattern width={60} height={60} className="stroke-accent/25" />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Large Grid</H3>
            <p className="text-neutral-600 text-sm">
              60px cells for spacious layouts
            </p>
          </div>
        </Container>
      </div>

      {/* Grid with Highlights */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <GridPattern
          width={30}
          height={30}
          squares={[
            [0, 1],
            [1, 1],
            [2, 1],
            [3, 1],
            [1, 2],
            [2, 2],
            [1, 3],
            [2, 3],
            [3, 3],
            [5, 0],
            [6, 0],
            [7, 0],
            [5, 1],
            [6, 1],
            [7, 1],
          ]}
          className="fill-primary/20 stroke-primary/30"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-lg">Grid with Highlights</H3>
            <p className="text-neutral-600 text-sm">
              Data visualization with emphasized squares
            </p>
          </div>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grid pattern variations showing different sizes, line styles, and highlighted squares for data visualization.',
      },
    },
  },
};

/**
 * Spotlight Stories
 */
export const SpotlightBasic: StoryObj<typeof Spotlight> = {
  name: 'Spotlight - Basic',
  render: () => (
    <div className="relative h-96 overflow-hidden rounded-lg border border-neutral-200 bg-slate-900">
      <Spotlight className="animate-pulse" />
      <Container className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center text-white">
          <H3 className="text-white">Spotlight Effect</H3>
          <p className="mt-2 text-slate-300">
            Dramatic lighting for hero sections
          </p>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic spotlight effect with default positioning and animation.',
      },
    },
  },
};

export const SpotlightVariations: StoryObj<typeof Spotlight> = {
  name: 'Spotlight - Variations',
  render: () => (
    <div className="space-y-6">
      {/* Blue Spotlight */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-slate-900">
        <Spotlight fill="#3b82f6" opacity={0.3} className="animate-pulse" />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <H3 className="text-lg text-white">Blue Spotlight</H3>
            <p className="text-blue-200 text-sm">
              Custom blue color with higher opacity
            </p>
          </div>
        </Container>
      </div>

      {/* Purple Spotlight */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-slate-900">
        <Spotlight
          fill="rgb(236, 72, 153)"
          opacity={0.25}
          cx={2000}
          cy={400}
          className="animate-pulse delay-300"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <H3 className="text-lg text-white">Purple Spotlight</H3>
            <p className="text-pink-200 text-sm">Custom position and color</p>
          </div>
        </Container>
      </div>

      {/* Multiple Spotlights */}
      <div className="relative h-48 overflow-hidden rounded-lg border border-neutral-200 bg-slate-900">
        <Spotlight
          fill="#3b82f6"
          opacity={0.15}
          cx={1000}
          cy={300}
          className="animate-pulse"
        />
        <Spotlight
          fill="#ec4899"
          opacity={0.15}
          cx={2800}
          cy={600}
          className="animate-pulse delay-500"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <H3 className="text-lg text-white">Multiple Spotlights</H3>
            <p className="text-slate-300 text-sm">Layered lighting effects</p>
          </div>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Spotlight variations showing different colors, positions, and layering effects.',
      },
    },
  },
};

/**
 * Combined Patterns Story
 */
export const CombinedPatterns: StoryObj = {
  name: 'Combined Patterns',
  render: () => (
    <div className="space-y-8">
      {/* Hero Section Example */}
      <div className="relative h-96 overflow-hidden rounded-lg border border-neutral-200 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <GridPattern
          width={50}
          height={50}
          strokeDasharray={2}
          className="stroke-white/10"
        />
        <DotPattern width={24} height={24} cr={1} className="fill-white/5" />
        <Spotlight fill="#8b5cf6" opacity={0.3} className="animate-pulse" />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <H3 className="font-bold text-2xl text-white">
              Modern Hero Section
            </H3>
            <p className="mt-2 text-purple-200">
              Combining grid, dots, and spotlight for depth
            </p>
          </div>
        </Container>
      </div>

      {/* Dashboard Example */}
      <div className="relative h-64 overflow-hidden rounded-lg border border-neutral-200 bg-background">
        <GridPattern
          width={20}
          height={20}
          squares={[
            [2, 1],
            [3, 1],
            [4, 1],
            [2, 2],
            [4, 2],
            [2, 3],
            [3, 3],
            [4, 3],
            [8, 2],
            [9, 2],
            [10, 2],
          ]}
          className="fill-primary/10 stroke-primary/20"
        />
        <DotPattern
          width={40}
          height={40}
          cr={0.5}
          className="fill-neutral/10"
        />
        <Container className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <H3 className="text-xl">Dashboard Design</H3>
            <p className="mt-2 text-neutral-600">
              Grid with data highlights and subtle dot texture
            </p>
          </div>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples showing how to combine multiple pattern components for complex visual effects and real-world design scenarios.',
      },
    },
  },
};

/**
 * Interactive Pattern Playground
 */
export const PatternPlayground: StoryObj = {
  name: 'Pattern Playground',
  render: () => (
    <div className="space-y-8">
      <Container className="text-center">
        <H3>Pattern Component Playground</H3>
        <p className="mt-2 text-neutral-600">
          Explore different pattern combinations and effects
        </p>
      </Container>

      {/* Light Theme Examples */}
      <div>
        <h4 className="mb-4 font-semibold text-lg">Light Theme Patterns</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative h-32 overflow-hidden rounded-lg border bg-white">
            <DotPattern className="fill-slate-400/20" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-medium text-sm">Subtle Dots</span>
            </div>
          </div>

          <div className="relative h-32 overflow-hidden rounded-lg border bg-white">
            <GridPattern
              width={25}
              height={25}
              className="stroke-slate-300/30"
            />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-medium text-sm">Clean Grid</span>
            </div>
          </div>

          <div className="relative h-32 overflow-hidden rounded-lg border bg-slate-50">
            <GridPattern
              squares={[
                [1, 1],
                [2, 1],
                [1, 2],
              ]}
              className="fill-blue-500/20 stroke-blue-500/30"
            />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-medium text-sm">Data Grid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Theme Examples */}
      <div>
        <h4 className="mb-4 font-semibold text-lg">Dark Theme Patterns</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative h-40 overflow-hidden rounded-lg bg-slate-900">
            <DotPattern
              width={20}
              height={20}
              className="fill-emerald-400/20"
            />
            <Spotlight fill="#10b981" opacity={0.2} className="animate-pulse" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-medium text-sm text-white">
                Emerald Glow
              </span>
            </div>
          </div>

          <div className="relative h-40 overflow-hidden rounded-lg bg-slate-900">
            <GridPattern strokeDasharray={3} className="stroke-violet-400/20" />
            <Spotlight
              fill="#8b5cf6"
              opacity={0.25}
              cx={2500}
              className="animate-pulse delay-700"
            />
            <div className="relative z-10 flex h-full items-center justify-center">
              <span className="font-medium text-sm text-white">
                Violet Focus
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground showcasing various pattern combinations, themes, and design possibilities.',
      },
    },
  },
};
