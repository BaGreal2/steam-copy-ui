import { A, redirect, useNavigate } from '@solidjs/router';
import { createEffect, createSignal, on } from 'solid-js';

import { setUser, user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { User } from '@/lib/types';

const login = async (username: string, password: string) => {
	try {
		const user = await fetchData<User>('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		return user;
	} catch (error) {
		console.error(error);
	}
};

const Login = () => {
  const navigate = useNavigate();
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');

	createEffect(
		on(user, (currentUser) => {
			if (currentUser) {
				navigate('/');
			}
		})
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const user = await login(username(), password());
    console.log('user', user);
		if (user) {
			setUser(user);
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		}
	};

	return (
		<div class="flex h-full w-full grow items-center justify-center bg-blue-900 text-white shadow-xl">
			<form
				class="flex w-96 flex-col items-center rounded-lg bg-black/55 py-6"
				onSubmit={handleSubmit}
			>
				<h1 class="text-2xl font-medium">Sign In</h1>
				<div class="mt-3 flex flex-col gap-4">
					<input
						value={username()}
						onInput={(e) => setUsername(e.currentTarget.value)}
						type="text"
						class="h-10 w-80 rounded-md bg-black/50 p-2 text-white"
						placeholder="Username"
						required
					/>
					<input
						value={password()}
						onInput={(e) => setPassword(e.currentTarget.value)}
						type="password"
						class="h-10 w-80 rounded-md bg-black/50 p-2 text-white"
						placeholder="Password"
						required
					/>
				</div>
				<div class="mt-4 flex flex-col items-center">
					<button
						class="h-10 w-full rounded-md bg-blue-800 px-4 text-lg font-medium text-white shadow-md transition-all duration-150 hover:bg-blue-900"
						type="submit"
					>
						Login
					</button>
					<A href="/register" class="mt-2 text-sm hover:underline">
						Don't have an account? Register
					</A>
				</div>
			</form>
		</div>
	);
};

export default Login;
