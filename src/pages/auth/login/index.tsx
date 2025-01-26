import { A, useNavigate } from '@solidjs/router';
import { createEffect, createSignal, on } from 'solid-js';

import { setUser, user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { User } from '@/lib/types';

const login = async (
	username: string,
	password: string
): Promise<User | undefined> => {
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
		if (user) {
			setUser(user);
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/');
		}
	};

	return (
		<div class="flex h-screen w-full items-center justify-center bg-[#101010] text-white">
			<form
				class="flex w-[400px] flex-col items-center rounded-2xl bg-[#1c1c1c] px-6 py-8 shadow-lg"
				onSubmit={handleSubmit}
			>
				<h1 class="text-2xl font-bold text-gray-100">Sign In</h1>
				<div class="mt-5 flex w-full flex-col gap-4">
					<input
						value={username()}
						onInput={(e) => setUsername(e.currentTarget.value)}
						type="text"
						class="h-12 w-full rounded-md bg-[#2c2c2c] px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
						placeholder="Username"
						required
					/>
					<input
						value={password()}
						onInput={(e) => setPassword(e.currentTarget.value)}
						type="password"
						class="h-12 w-full rounded-md bg-[#2c2c2c] px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
						placeholder="Password"
						required
					/>
				</div>
				<button
					class="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-lg font-medium text-white transition duration-300 hover:bg-blue-500"
					type="submit"
				>
					Login
				</button>
				<A href="/register" class="mt-4 text-sm text-gray-400 hover:underline">
					Don't have an account? Register
				</A>
			</form>
		</div>
	);
};

export default Login;
