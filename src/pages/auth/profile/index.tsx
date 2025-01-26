import { useNavigate } from '@solidjs/router';
import { createEffect, createResource, createSignal, Show } from 'solid-js';

import { fetchPosted } from '@/pages/developer';
import { fetchLibrary } from '@/pages/library';
import { setUser, user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { User } from '@/lib/types';

import EditableAvatar from './EditableAvatar';
import EditableField from './EditableField';

const patchUser = async (
	userId: number,
	username?: string,
	email?: string,
	profile_image?: string
): Promise<User | undefined> => {
	try {
		const body: Record<string, string> = {};

		if (username !== undefined) {
			body.username = username;
		}
		if (email !== undefined) {
			body.email = email;
		}
		if (profile_image !== undefined) {
			body.profile_image = profile_image;
		}

		const newUser = await fetchData<User>(`/me?user_id=${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		return newUser;
	} catch (error) {
		console.error(error);
	}
};

const Profile = () => {
	const navigate = useNavigate();
	const [library] = createResource(() => Number(user()?.user_id), fetchLibrary);
	const [postedGames] = createResource(
		() => Number(user()?.user_id),
		fetchPosted
	);
	const [localUsername, setLocalUsername] = createSignal(
		user()?.username ?? ''
	);
	const [localEmail, setLocalEmail] = createSignal(user()?.email ?? '');
	const [localAvatarBlob, setLocalAvatarBlob] = createSignal(
		user()?.profile_image ?? ''
	);

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	const handleResetForm = () => {
		setLocalUsername(user()?.username ?? '');
		setLocalEmail(user()?.email ?? '');
		setLocalAvatarBlob(user()?.profile_image ?? '');
	};

	const hasChanges = () => {
		return (
			localUsername() !== user()?.username ||
			localEmail() !== user()?.email ||
			localAvatarBlob() !== user()?.profile_image
		);
	};

	const handleSave = async () => {
		if (!hasChanges() || !user()?.user_id) {
			return;
		}

		const newUser = await patchUser(
			Number(user()?.user_id),
			localUsername() !== user()?.username ? localUsername() : undefined,
			localEmail() !== user()?.email ? localEmail() : undefined,
			localAvatarBlob() !== user()?.profile_image
				? localAvatarBlob()
				: undefined
		);

		if (newUser) {
			setUser(newUser);
			localStorage.setItem('user', JSON.stringify(newUser));
			handleResetForm();
		}
	};

	return (
		<div class="flex size-full grow justify-center bg-[#101010] pt-28 text-white">
			<div class="flex h-fit w-[600px] flex-col items-center gap-6 rounded-2xl bg-[#1c1c1c] px-7 pb-7 pt-6 shadow-lg">
				<h1 class="text-3xl font-bold text-gray-100">Profile</h1>
				<div class="flex gap-7">
					<div class="size-52 shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-600">
						<Show when={user()?.profile_image}>
							<EditableAvatar
								avatarBlob={localAvatarBlob()}
								setAvatarBlob={setLocalAvatarBlob}
							/>
						</Show>
					</div>
					<div class="flex w-full flex-col gap-1.5">
						<EditableField
							label="Username"
							value={localUsername()}
							setValue={setLocalUsername}
							class="text-lg"
							inputClass="text-lg bg-[#2c2c2c] rounded-md text-gray-300 focus:ring-2 focus:ring-blue-500"
						/>
						<EditableField
							label="Email"
							value={localEmail()}
							setValue={setLocalEmail}
							class="text-lg"
							inputClass="text-lg bg-[#2c2c2c] rounded-md text-gray-300 focus:ring-2 focus:ring-blue-500"
						/>
						<Show when={library()}>
							<span class="text-sm text-gray-400">
								Games in the library: {library()?.length}
							</span>
						</Show>
						<Show when={postedGames()}>
							<span class="text-sm text-gray-400">
								Games posted: {postedGames()?.length}
							</span>
						</Show>
						<div class="flex gap-2">
							<button
								class="mt-3 h-10 w-28 rounded-md bg-gray-600 text-lg font-medium text-white transition duration-300 hover:bg-gray-500 disabled:opacity-50 disabled:hover:bg-gray-600"
								disabled={!hasChanges()}
								onClick={handleResetForm}
							>
								Restore
							</button>
							<button
								class="mt-3 h-10 w-28 rounded-md bg-blue-600 text-lg font-medium text-white transition duration-300 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
								disabled={!hasChanges()}
								onClick={handleSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
