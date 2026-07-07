/// <reference types="react-scripts" />

// react-scripts' types declare `*.module.css` but not plain side-effect CSS
// imports (e.g. `import './App.css'`). TypeScript 5.4+/6 reports TS2882 for
// untyped side-effect imports, so declare them here.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
