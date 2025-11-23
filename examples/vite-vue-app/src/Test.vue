<script setup lang="ts">
import { ref } from 'vue';
import Test2 from './Test2.vue

// This component is used to test the `intlayer transform command`
// The values here should be extracted
const state = ref('This is a sentence if a state (should be extracted)');

const isClicked = ref(false);

// The values here should be extracted
const listOfItems = [
  "I'm a list of items (should be extracted as returned by the function)",
  "I'm a list of items (should be extracted as returned by the function)",
];

const secondListOfItems = [
  // The values here should be extracted
  { key: '1', value: "I'm a second list of items" },
  { key: '2', value: "I'm a second list of items" },
  { key: '3', value: "I'm a second list of items" },
];

const handleClick = () => {
  state.value =
    'This is a sentence if a state changed. Because state is returned as reactNode, this sentence should be extracted';
};

const randomFunction = () => {
  console.log('This console log should not be extracted');

  return "This is a random function return should be extracted because it's returned by the function";
};
</script>

<template>
  <div>
    <h1>Hello World (should be extracted)</h1>
    <p>This is a test (should be extracted)</p>
    <button @click="isClicked = true">
      {{ isClicked ? 'Clicked (should be extracted)' : 'Click me (should be extracted)' }}
    </button>
    <input
      type="text"
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
      <li v-for="item in listOfItems" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in secondListOfItems" :key="item.key">
        {{ item.value }}
      </li>
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
    <span>{{ state }}</span>
    <img
      src="/should-not-be-extracted.svg"
      alt="This text should be extracted"
    />
    <button @click="handleClick">Click me (should be extracted)</button>
    <span>{{ randomFunction() }}</span>
    <Test2
      title="Hello World 2 (should be extracted)"
      color="red"
    />
  </div>
</template>

