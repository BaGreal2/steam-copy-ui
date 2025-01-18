import { A, redirect, useNavigate } from '@solidjs/router';
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
		<div class="flex h-full w-full grow items-center justify-center bg-[#101010] text-white shadow-xl">
			<form
				class="flex w-96 flex-col items-center rounded-lg bg-white/10 py-6"
				onSubmit={handleSubmit}
			>
				<h1 class="text-2xl font-medium">Create an Account</h1>
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
						value={email()}
						onInput={(e) => setEmail(e.currentTarget.value)}
						type="email"
						class="h-10 w-80 rounded-md bg-black/50 p-2 text-white"
						placeholder="E-Mail"
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
					<input
						onInput={handleFileUpload}
						type="file"
						class="h-10 w-80 rounded-md bg-black/50 p-2 text-white"
						placeholder="Profile Picture"
						required
					/>
				</div>
				<div class="mt-4 flex flex-col items-center">
					<button
						class="h-10 w-full rounded-md bg-black/40 px-4 text-lg font-medium text-white shadow-md transition-all duration-150 hover:bg-black/20"
						type="submit"
					>
						Register
					</button>
					<A href="/login" class="mt-2 text-sm hover:underline">
						Already have an account? Login
					</A>
				</div>
			</form>
		</div>
	);
};

export default Register;
