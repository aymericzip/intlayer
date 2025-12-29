'use client';

import { type FC, useState } from 'react';

// This component is used to test the `intlayer transform command`
export const HelloWorld: FC = () => {
  // The values here should be extracted
  const [state, setState] = useState(
    'This is a sentence if a state (should be extracted)'
  );

  const [isClicked, setIsClicked] = useState(false);

  // The values here should be extracted
  const listOfItems = [
    "I'm a list of items (should be extracted as returned by the function) (1)",
    "I'm a list of items (should be extracted as returned by the function) (2)",
  ];

  const secondListOfItems = [
    // The values here should be extracted
    { key: '1', value: "I'm a second list of items" },
    { key: '2', value: "I'm a second list of items" },
    { key: '3', value: "I'm a second list of items" },
  ];

  const handleClick = () => {
    setState(
      'This is a sentence if a state changed. Because state is returned as reactNode, this sentence should be extracted'
    );
  };

  return (
    <div>
      <h1>Hello World (should be extracted)</h1>
      <h1>I'm a test (should be extracted)</h1>
      <p>This is a test (should be extracted)</p>
      <button onClick={() => setIsClicked(true)}>
        {isClicked
          ? 'Clicked (should be extracted)'
          : 'Click me (should be extracted)'}
      </button>
      <input
        type="text" // should not be extracted
        placeholder="This is the placeholder (should be extracted)"
        aria-label="This is the aria-label (should be extracted)"
      />
      <select>
        <option value="1">
          This is the text of the option 1 (should be extracted)
        </option>
        <option value="2">
          This is the text of the option 2 (should be extracted)
        </option>
        <option value="3">
          This is the text of the option 3 (should be extracted)
        </option>
      </select>
      <ul>
        {listOfItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul>
        {secondListOfItems.map((item) => (
          <li key={item.key}>{item.value}</li>
        ))}
      </ul>
      <span>
        This is a string including '"!@#$%^&*()_+-=[]{} special characters:
      </span>

      <p>
        This is a paragraph on several lines. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <span>{state}</span>
      <img
        src="/should-not-be-extracted.svg"
        alt="This text should be extracted"
      />
      <button onClick={handleClick}>Click me (should be extracted)</button>
      <span>{randomFunction()}</span>
      <HelloWorld2
        title="Hello World 2 (should be extracted)"
        color="red" // should not be extracted
      />
    </div>
  );
};

export function HelloWorld2({
  title,
  color,
}: {
  title: string;
  color?: string;
}) {
  return (
    <div>
      <h1 style={{ color }}>{title}</h1>
      <h1>Hello World 2 (should be extracted)</h1>
      <p>This is a test 2 (should be extracted)</p>
    </div>
  );
}

const randomFunction = () => {
  console.log('This console log should not be extracted');

  return "This is a random function return should be extracted because it's returned by the function";
};

export default HelloWorld;
