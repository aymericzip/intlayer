/* @refresh reload */
import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from './App.tsx';
import './index.css';

const root = document.getElementById('root');

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
