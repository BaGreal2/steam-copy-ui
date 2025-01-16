/* @refresh reload */
import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';

import Layout from './Layout';
import './index.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
	);
}

const Home = lazy(() => import('./pages/home'));
const Library = lazy(() => import('./pages/library'));
const Developer = lazy(() => import('./pages/developer'));
const Register = lazy(() => import('./pages/auth/register'));
const Login = lazy(() => import('./pages/auth/login'));

render(
	() => (
		<Router root={Layout}>
			<Route path="/" component={Home} />
			<Route path="/library" component={Library} />
			<Route path="/developer" component={Developer} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
		</Router>
	),
	root!
);
