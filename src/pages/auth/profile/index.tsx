import { createResource, createSignal, Show } from 'solid-js';

import { fetchLibrary } from '@/pages/library';
import { user } from '@/store/auth';

import EditableField from './EditableField';

const Profile = () => {
	const [library] = createResource(() => Number(user()?.user_id), fetchLibrary);
	const [localUsername, setLocalUsername] = createSignal(
		user()?.username ?? ''
	);
	const [localEmail, setLocalEmail] = createSignal(user()?.email ?? '');

	const hasChanges = () => {
		return (
			localUsername() !== user()?.username || localEmail() !== user()?.email
		);
	};

	return (
		<div class="flex size-full grow justify-center bg-[#101010] pt-28 text-white">
			<div class="flex h-fit flex-col items-center gap-6 rounded-md bg-white/10 px-7 py-4">
				<h1 class="text-3xl font-bold">Profile</h1>
				<div class="flex gap-5">
					<div class="size-48 cursor-pointer overflow-hidden rounded-full">
						<Show when={user()?.profile_image}>
							<img
								src={user()?.profile_image}
								class="size-full object-cover object-center"
								alt="Avatar"
							/>
						</Show>
					</div>
					<div class="flex min-w-48 flex-col">
						<EditableField
							label="Username"
							value={localUsername()}
							setValue={setLocalUsername}
							class="text-lg"
							inputClass="text-lg"
						/>
						<EditableField
							label="Email"
							value={localEmail()}
							setValue={setLocalEmail}
							class="text-lg"
							inputClass="text-lg"
						/>
						<Show when={library()}>
							<span>Games in the library: {library()?.length}</span>
						</Show>
						<Show when={hasChanges()}>
							<button class="mt-2 h-10 w-20 rounded-md bg-blue-800 text-lg font-medium text-white transition-all duration-300 hover:bg-blue-700">
								Save
							</button>
						</Show>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
