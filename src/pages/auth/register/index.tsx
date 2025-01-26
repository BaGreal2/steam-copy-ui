import { A, useNavigate } from '@solidjs/router';
import { createEffect, createSignal, on } from 'solid-js';

import { setUser, user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { User } from '@/lib/types';

const createAccount = async (
	username: string,
	email: string,
	password: string,
	avatar: string | null
) => {
	if (!avatar) {
		return;
	}

	try {
		const user = await fetchData<User>('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				email,
				password,
				profile_image: avatar
			})
		});
		return user;
	} catch (error) {
		console.error(error);
	}
};

const Register = () => {
	const navigate = useNavigate();
	const [username, setUsername] = createSignal('');
	const [email, setEmail] = createSignal('');
	const [password, setPassword] = createSignal('');
	const [avatarBlob, setAvatarBlob] = createSignal<string | null>(null);

	createEffect(
		on(user, (currentUser) => {
			if (currentUser) {
				navigate('/');
			}
		})
	);

	const handleFileUpload = (e: Event) => {
		const file = (e.target as HTMLInputElement).files?.[0] ?? null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatarBlob(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		const user = await createAccount(
			username(),
			email(),
			password(),
			avatarBlob()
		);
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
				<h1 class="text-2xl font-bold text-gray-100">Create an Account</h1>
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
						value={email()}
						onInput={(e) => setEmail(e.currentTarget.value)}
						type="email"
						class="h-12 w-full rounded-md bg-[#2c2c2c] px-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
						placeholder="E-Mail"
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
					<input
						onInput={handleFileUpload}
						type="file"
						class="w-full rounded-md bg-[#2c2c2c] px-4 py-3 text-gray-400 placeholder-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:text-white focus:outline-none"
						placeholder="Profile Picture"
						required
					/>
				</div>
				<button
					class="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 text-lg font-medium text-white transition duration-300 hover:bg-blue-500"
					type="submit"
				>
					Register
				</button>
				<A href="/login" class="mt-4 text-sm text-gray-400 hover:underline">
					Already have an account? Login
				</A>
			</form>
		</div>
	);
};

export default Register;
