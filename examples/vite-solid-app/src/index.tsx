/* @refresh reload */
import { render } from '@solidjs/web';
import { Router } from './App.tsx';
import './index.css';

const root = document.getElementById('root');

render(() => <Router>{(props) => props.children}</Router>, root!);
