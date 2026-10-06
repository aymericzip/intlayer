import { render } from 'preact';
import { App } from './App';
import './assets/fonts/Inter-VariableFont.ttf';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  render(<App />, rootElement);
}
