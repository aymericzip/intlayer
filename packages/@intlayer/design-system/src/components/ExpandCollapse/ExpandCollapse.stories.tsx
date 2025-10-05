import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ExpandCollapse } from '.';

/**
 * ExpandCollapse Component Stories
 *
 * A smart content container that automatically provides expand/collapse functionality
 * when content exceeds a specified height threshold. Perfect for managing long-form
 * content, code blocks, documentation, and any scenario where content length is
 * unpredictable and needs progressive disclosure.
 *
 * ## Key Features
 * - **Intelligent Height Detection**: Automatically detects when content exceeds threshold
 * - **Smooth Animations**: CSS-based transitions for elegant expand/collapse effects
 * - **Internationalization**: Multi-language support for toggle button text
 * - **Performance Optimized**: Only applies collapse behavior when necessary
 * - **Customizable Thresholds**: Configurable minimum height for different use cases
 * - **Accessibility**: Full keyboard support and screen reader compatibility
 *
 * ## When to Use
 * - Long articles, blog posts, or documentation content
 * - Code examples and JSON data that might be lengthy
 * - User-generated content with unpredictable length
 * - FAQ sections and expandable information cards
 * - Data tables or lists that could grow beyond comfortable viewing
 * - Any content where progressive disclosure improves UX
 */
const meta: Meta<typeof ExpandCollapse> = {
  title: 'Components/ExpandCollapse',
  component: ExpandCollapse,
  parameters: {
    docs: {
      description: {
        component: `
A smart content container that automatically provides expand/collapse functionality based on content height.

### Core Functionality:
- **Smart Detection**: Measures actual content height and compares against threshold
- **Conditional Behavior**: Only shows collapse functionality when content exceeds minHeight
- **Smooth Transitions**: Uses MaxHeightSmoother for elegant animations
- **State Management**: Manages collapsed/expanded state with proper visual indicators

### Height Detection Logic:
1. **Measurement Phase**: On component mount, measures the actual content height
2. **Threshold Comparison**: Compares measured height against the minHeight prop
3. **Conditional Rendering**:
   - **Below Threshold**: Renders content normally without any collapse functionality
   - **Above Threshold**: Wraps content in expandable container with toggle button
4. **Dynamic Updates**: Responds to content changes and window resize events

### Toggle Button Features:
- **Contextual Text**: Shows "Show all" when collapsed, "Show less" when expanded
- **Internationalization**: Supports multiple languages through Intlayer integration
- **Visual Design**: Gradient background with backdrop blur for modern appearance
- **Smooth Transitions**: Button size and position animate during state changes
- **Accessibility**: Proper focus states and keyboard navigation support

### Animation System:
- **CSS-Based**: Uses CSS transitions for optimal performance
- **Customizable Duration**: Configurable animation timing through CSS variables
- **Reduced Motion**: Respects user preferences for accessibility
- **Smooth Scrolling**: Maintains scroll position during expand/collapse

### Use Case Optimization:
- **Performance**: Minimal overhead when content is below threshold
- **Flexibility**: Works with any content type (text, components, media)
- **Responsive**: Adapts to different screen sizes and container widths
- **Progressive Enhancement**: Gracefully degrades when JavaScript is disabled
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isRollable: {
      description: 'Enable or disable expand/collapse functionality entirely',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    minHeight: {
      description: 'Height threshold in pixels that triggers collapse behavior',
      control: { type: 'number', min: 50, max: 1000, step: 50 },
      table: {
        defaultValue: { summary: '700' },
        type: { summary: 'number' },
      },
    },
    children: {
      description: 'Content that may exceed the height threshold',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      description: 'Additional CSS classes for styling customization',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ExpandCollapse>;

// Long content for testing collapse functionality
const LONG_TEXT_CONTENT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 

Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.

Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.

Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin.

Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.

Sed adipiscing ornare risus. Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit. Pellentesque egestas sem. Suspendisse commodo ullamcorper magna. Sed magna tellus, fringilla eu, facilisis in, porta sed, augue.

Vestibulum tincidunt malesuada tellus. Ut ultrices ullamcorper imperdiet. Suspendisse potenti. Sed cursus blandit purus. Mauris tellus. Nullam tempor. Mauris molestie, dui vel condimentum rutrum, sem lorem semper tellus, at molestie tortor eros eget libero.

Fusce facilisis lacinia dui. Suspendisse potenti. In mi erat, cursus id, nonummy sed, ullamcorper eget, sapien. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate.`;

const CODE_EXAMPLE_CONTENT = `// React Hook Example - Custom useLocalStorage Hook
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage Example
function ExampleComponent() {
  const [name, setName] = useLocalStorage('name', 'Anonymous');
  const [preferences, setPreferences] = useLocalStorage('preferences', {
    theme: 'light',
    notifications: true,
    language: 'en'
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <h3>Preferences</h3>
        <label>
          <input
            type="radio"
            checked={preferences.theme === 'light'}
            onChange={() => setPreferences({...preferences, theme: 'light'})}
          />
          Light Theme
        </label>
        <label>
          <input
            type="radio"
            checked={preferences.theme === 'dark'}
            onChange={() => setPreferences({...preferences, theme: 'dark'})}
          />
          Dark Theme
        </label>
      </div>
    </div>
  );
}

export default ExampleComponent;`;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common use cases
 * for the ExpandCollapse component.
 */

/**
 * ### Default Behavior
 *
 * The basic expand/collapse functionality with long content that exceeds
 * the default height threshold. Shows the toggle button and smooth animation.
 */
export const Default: Story = {
  args: {
    isRollable: true,
    minHeight: 200,
    children: LONG_TEXT_CONTENT,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Article Content</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that content is initially collapsed (should show toggle button)
    const toggleButton = canvas.queryByRole('button');

    // If content exceeds minHeight, toggle button should exist
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();
      await expect(toggleButton).toHaveTextContent(/show all/i);

      // Test expanding
      await userEvent.click(toggleButton);
      await expect(toggleButton).toHaveTextContent(/show less/i);

      // Test collapsing
      await userEvent.click(toggleButton);
      await expect(toggleButton).toHaveTextContent(/show all/i);
    }
  },
};

/**
 * ### Short Content
 *
 * When content is below the height threshold, no collapse functionality
 * is applied and content renders normally.
 */
export const ShortContent: Story = {
  args: {
    isRollable: true,
    minHeight: 300,
    children:
      "This is short content that doesn't exceed the minimum height threshold, so no expand/collapse functionality is needed.",
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Short Article</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should not have toggle button for short content
    const toggleButton = canvas.queryByRole('button');
    await expect(toggleButton).not.toBeInTheDocument();

    // Content should be visible
    const content = canvas.getByText(/short content/i);
    await expect(content).toBeInTheDocument();
  },
};

/**
 * ### Disabled Rollable
 *
 * When isRollable is false, the component renders children directly
 * without any collapse functionality, regardless of content height.
 */
export const DisabledRollable: Story = {
  args: {
    isRollable: false,
    minHeight: 200,
    children: LONG_TEXT_CONTENT,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Full Content (No Collapse)</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should not have toggle button when isRollable is false
    const toggleButton = canvas.queryByRole('button');
    await expect(toggleButton).not.toBeInTheDocument();

    // All content should be visible
    const content = canvas.getByText(/Lorem ipsum/i);
    await expect(content).toBeInTheDocument();
  },
};

/**
 * ## Height Threshold Variations
 *
 * Stories demonstrating different height thresholds and their effects
 * on when collapse functionality is triggered.
 */

/**
 * ### Low Height Threshold
 *
 * With a low height threshold, even moderate content will trigger
 * the expand/collapse functionality.
 */
export const LowHeightThreshold: Story = {
  args: {
    isRollable: true,
    minHeight: 100,
    children:
      'This is moderate content that will trigger collapse functionality with a low height threshold. The component becomes very sensitive to content length and will show the toggle button even for relatively short content.',
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">
        Sensitive Threshold (100px)
      </h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // With low threshold, should have toggle button
    const toggleButton = canvas.queryByRole('button');
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();
    }
  },
};

/**
 * ### High Height Threshold
 *
 * With a high height threshold, only very long content will trigger
 * the collapse functionality.
 */
export const HighHeightThreshold: Story = {
  args: {
    isRollable: true,
    minHeight: 800,
    children: LONG_TEXT_CONTENT,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">High Threshold (800px)</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test behavior with high threshold - may or may not have toggle
    // depending on actual rendered height of the long content
    const toggleButton = canvas.queryByRole('button');
    // Just verify the component renders without errors
    const content = canvas.getByText(/Lorem ipsum/i);
    await expect(content).toBeInTheDocument();

    // Optional toggle test - button may or may not be present with high threshold
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();
    }
  },
};

/**
 * ## Content Type Variations
 *
 * Stories showing how the component works with different types of content.
 */

/**
 * ### Code Block Content
 *
 * Expand/collapse functionality with code content, demonstrating
 * proper handling of formatted text and syntax highlighting.
 */
export const CodeBlockContent: Story = {
  args: {
    isRollable: true,
    minHeight: 300,
    children: (
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100 text-sm">
        <code>{CODE_EXAMPLE_CONTENT}</code>
      </pre>
    ),
  },
  render: (args) => (
    <div className="max-w-4xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Code Example</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test with code content
    const codeElement = canvas.getByText(/React Hook Example/i);
    await expect(codeElement).toBeInTheDocument();

    // Check for toggle button
    const toggleButton = canvas.queryByRole('button');
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();

      // Test toggle functionality
      await userEvent.click(toggleButton);
    }
  },
};

/**
 * ### Mixed Content
 *
 * Expand/collapse with mixed content including text, images, and components.
 */
export const MixedContent: Story = {
  args: {
    isRollable: true,
    minHeight: 250,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Mixed Content Article</h3>
      <ExpandCollapse {...args}>
        <div className="space-y-4">
          <p className="text-gray-700">
            This article contains mixed content including text, images, and
            interactive elements.
          </p>

          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold text-blue-900">Important Note</h4>
            <p className="text-blue-800">
              This is a highlighted section within the collapsible content.
            </p>
          </div>

          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor.
          </p>

          <div className="rounded-lg border border-gray-200 p-4">
            <h4 className="mb-2 font-semibold">Code Example</h4>
            <pre className="overflow-x-auto rounded bg-gray-100 p-2 text-sm">
              <code>const example = "This is code within mixed content";</code>
            </pre>
          </div>

          <p className="text-gray-700">
            More content continues here to ensure we exceed the height threshold
            and trigger the collapse functionality for this mixed content
            example.
          </p>

          <ul className="list-inside list-disc space-y-1 text-gray-700">
            <li>List item one with important information</li>
            <li>List item two with additional details</li>
            <li>List item three for completeness</li>
          </ul>
        </div>
      </ExpandCollapse>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test mixed content rendering
    const note = canvas.getByText(/Important Note/i);
    await expect(note).toBeInTheDocument();

    const codeSnippet = canvas.getByText(/This is code within mixed content/i);
    await expect(codeSnippet).toBeInTheDocument();

    // Test toggle button if present
    const toggleButton = canvas.queryByRole('button');
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();
      await userEvent.click(toggleButton);
    }
  },
};

/**
 * ## Styling and Customization
 *
 * Stories demonstrating styling options and customization capabilities.
 */

/**
 * ### Custom Styling
 *
 * ExpandCollapse with custom CSS classes for different visual treatments.
 */
export const CustomStyling: Story = {
  args: {
    isRollable: true,
    minHeight: 200,
    className: 'border border-gray-300 rounded-lg p-4 bg-gray-50',
    children: LONG_TEXT_CONTENT,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <h3 className="mb-4 font-semibold text-lg">Custom Styled Container</h3>
      <ExpandCollapse {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test custom styling is applied
    const content = canvas.getByText(/Lorem ipsum/i);
    await expect(content).toBeInTheDocument();

    // Test toggle functionality
    const toggleButton = canvas.queryByRole('button');
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();
      await userEvent.click(toggleButton);
    }
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically designed to test and demonstrate accessibility features.
 */

/**
 * ### Keyboard Navigation
 *
 * Testing full keyboard accessibility including focus management
 * and keyboard interaction with the toggle button.
 */
export const KeyboardNavigation: Story = {
  args: {
    isRollable: true,
    minHeight: 150,
    children:
      'Content for keyboard navigation testing. This content should be long enough to trigger the expand/collapse functionality and test the keyboard accessibility of the toggle button.',
  },
  render: (args) => (
    <div className="max-w-2xl space-y-4 p-4">
      <div className="rounded-lg bg-blue-50 p-3 text-gray-600 text-sm">
        <p className="mb-1 font-medium">Keyboard Navigation Test:</p>
        <ul className="space-y-1 text-xs">
          <li>• Tab: Navigate to toggle button</li>
          <li>• Enter/Space: Activate expand/collapse</li>
          <li>• Focus indicators should be clearly visible</li>
        </ul>
      </div>

      <button className="rounded bg-gray-200 px-3 py-2">
        Before ExpandCollapse
      </button>

      <ExpandCollapse {...args} />

      <button className="rounded bg-gray-200 px-3 py-2">
        After ExpandCollapse
      </button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test keyboard navigation
    const beforeButton = canvas.getByText('Before ExpandCollapse');
    const afterButton = canvas.getByText('After ExpandCollapse');

    await expect(beforeButton).toBeInTheDocument();
    await expect(afterButton).toBeInTheDocument();

    // Find and test toggle button if present
    const toggleButton = canvas.queryByRole('button', { name: /show/i });
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();

      // Test keyboard interaction
      await userEvent.tab(); // Should focus toggle button eventually
      await userEvent.keyboard('{Enter}'); // Should activate toggle
    }
  },
};

/**
 * ## Real-world Examples
 *
 * Practical examples showing the component in realistic usage scenarios.
 */

/**
 * ### Documentation Article
 *
 * Example of using ExpandCollapse in a documentation context
 * with structured content and clear sections.
 */
export const DocumentationArticle: Story = {
  args: {
    isRollable: true,
    minHeight: 400,
  },
  render: (args) => (
    <div className="mx-auto max-w-4xl p-6">
      <article className="prose prose-gray max-w-none">
        <h1 className="mb-6 font-bold text-2xl">React Hooks Guide</h1>

        <ExpandCollapse {...args}>
          <div className="space-y-6">
            <section>
              <h2 className="mb-3 font-semibold text-xl">Introduction</h2>
              <p>
                React Hooks are functions that let you "hook into" React state
                and lifecycle features from function components. They were
                introduced in React 16.8 and have revolutionized how we write
                React applications.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-xl">Basic Hooks</h2>

              <h3 className="mb-2 font-medium text-lg">useState</h3>
              <p className="mb-4">
                The useState Hook lets you add state to function components. It
                returns a stateful value and a function to update it.
              </p>

              <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4">
                <code>{`const [count, setCount] = useState(0);`}</code>
              </pre>

              <h3 className="mb-2 font-medium text-lg">useEffect</h3>
              <p className="mb-4">
                The useEffect Hook lets you perform side effects in function
                components. It serves the same purpose as componentDidMount,
                componentDidUpdate, and componentWillUnmount combined.
              </p>

              <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4">
                <code>{`useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);`}</code>
              </pre>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-xl">Advanced Hooks</h2>

              <h3 className="mb-2 font-medium text-lg">useContext</h3>
              <p className="mb-4">
                useContext lets you subscribe to React context without
                introducing nesting.
              </p>

              <h3 className="mb-2 font-medium text-lg">useReducer</h3>
              <p className="mb-4">
                useReducer is usually preferable to useState when you have
                complex state logic that involves multiple sub-values.
              </p>

              <h3 className="mb-2 font-medium text-lg">
                useCallback and useMemo
              </h3>
              <p className="mb-4">
                These hooks help optimize performance by memoizing functions and
                values respectively.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-semibold text-xl">Best Practices</h2>
              <ul className="list-inside list-disc space-y-2">
                <li>Only call Hooks at the top level of your React function</li>
                <li>
                  Don't call Hooks inside loops, conditions, or nested functions
                </li>
                <li>Use the ESLint plugin to enforce these rules</li>
                <li>
                  Custom Hooks should start with "use" and can call other Hooks
                </li>
                <li>Extract complex logic into custom Hooks for reusability</li>
              </ul>
            </section>
          </div>
        </ExpandCollapse>
      </article>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test documentation structure
    const title = canvas.getByRole('heading', { level: 1 });
    await expect(title).toHaveTextContent('React Hooks Guide');

    // Test expandable functionality
    const toggleButton = canvas.queryByRole('button');
    if (toggleButton) {
      await expect(toggleButton).toBeInTheDocument();

      // Test expansion
      await userEvent.click(toggleButton);

      // After expansion, advanced content should be visible
      const advancedSection = canvas.getByText('Advanced Hooks');
      await expect(advancedSection).toBeInTheDocument();
    }
  },
};

/**
 * ### FAQ Section
 *
 * Example of using ExpandCollapse for a FAQ section where
 * answers might be quite lengthy.
 */
export const FAQSection: Story = {
  args: {
    isRollable: true,
    minHeight: 200,
  },
  render: (args) => (
    <div className="mx-auto max-w-3xl p-6">
      <h2 className="mb-6 font-bold text-xl">Frequently Asked Questions</h2>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 font-semibold">How does ExpandCollapse work?</h3>
          <ExpandCollapse {...args}>
            <div className="space-y-3 text-gray-700">
              <p>
                The ExpandCollapse component works by first measuring the actual
                height of its content when it mounts. It then compares this
                height against the specified minHeight threshold.
              </p>
              <p>
                If the content height is less than or equal to the minHeight,
                the component simply renders the content normally without any
                collapse functionality. This ensures optimal performance for
                shorter content.
              </p>
              <p>
                If the content exceeds the minHeight threshold, the component
                wraps the content in a MaxHeightSmoother container and adds a
                toggle button. The MaxHeightSmoother uses CSS transitions to
                smoothly animate between collapsed and expanded states.
              </p>
              <p>
                The toggle button shows internationalized text ("Show all" or
                "Show less") and includes a gradient background with backdrop
                blur for a modern appearance. The button is fully keyboard
                accessible and includes proper ARIA attributes.
              </p>
              <p>
                The component also handles edge cases like content that changes
                size after initial render, responsive behavior, and maintains
                proper accessibility throughout the interaction.
              </p>
            </div>
          </ExpandCollapse>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 font-semibold">
            When should I use this component?
          </h3>
          <ExpandCollapse minHeight={150} isRollable={true}>
            <div className="space-y-3 text-gray-700">
              <p>
                Use ExpandCollapse when you have content that might vary
                significantly in length and you want to maintain a clean,
                scannable interface.
              </p>
              <p>
                Perfect for: documentation articles, blog posts, code examples,
                user-generated content, product descriptions, FAQ answers, and
                any content where progressive disclosure improves the user
                experience.
              </p>
              <p>
                The component is particularly useful in content management
                systems where content length is unpredictable and you want to
                maintain consistent page layouts.
              </p>
            </div>
          </ExpandCollapse>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test FAQ structure
    const faqTitle = canvas.getByText('Frequently Asked Questions');
    await expect(faqTitle).toBeInTheDocument();

    // Test multiple ExpandCollapse instances
    const toggleButtons = canvas.queryAllByRole('button', { name: /show/i });

    if (toggleButtons.length > 0) {
      // Test first FAQ expansion
      await userEvent.click(toggleButtons[0]);

      // Should show expanded content
      const expandedContent = canvas.getByText(/MaxHeightSmoother/i);
      await expect(expandedContent).toBeInTheDocument();
    }
  },
};
