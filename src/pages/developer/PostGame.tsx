import { createSignal } from 'solid-js';

import { user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { BackendMessage } from '@/lib/types';

const postGame = async (
	added_by: number,
	title: string,
	description: string,
	price: string,
	genre: string,
	cover_image: string | null,
	icon_image: string | null,
	developer: string
): Promise<BackendMessage | undefined> => {
	if (!cover_image || !icon_image) {
		return;
	}

	try {
		const message = await fetchData<BackendMessage>('/games', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				added_by,
				title,
				description,
				price,
				genre,
				cover_image,
				icon_image,
				developer
			})
		});
		return message;
	} catch (error) {
		console.error(error);
	}
};

interface Props {
	refetchPosted: () => void;
}

const PostGame = (props: Props) => {
	const [title, setTitle] = createSignal<string>('');
	const [description, setDescription] = createSignal<string>('');
	const [price, setPrice] = createSignal<string>('');
	const [genre, setGenre] = createSignal<string>('');
	const [developer, setDeveloper] = createSignal<string>('');
	const [coverImageBlob, setCoverImageBlob] = createSignal<string | null>(null);
	const [iconImageBlob, setIconImageBlob] = createSignal<string | null>(null);

	const handleFileUpload = (e: Event, setBlob: (value: string) => void) => {
		const file = (e.target as HTMLInputElement).files?.[0] ?? null;
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setBlob(e.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCoverImageUpload = (e: Event) => {
		handleFileUpload(e, setCoverImageBlob);
	};

	const handleIconImageUpload = (e: Event) => {
		handleFileUpload(e, setIconImageBlob);
	};

	const handleResetForm = () => {
		setTitle('');
		setDescription('');
		setPrice('');
		setGenre('');
		setCoverImageBlob(null);
		setIconImageBlob(null);
		setDeveloper('');
	};

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		if (!user()?.user_id) return;

		postGame(
			Number(user()?.user_id),
			title(),
			description(),
			price(),
			genre(),
			coverImageBlob(),
			iconImageBlob(),
			developer()
		);

		handleResetForm();
		props.refetchPosted();
	};

	return (
		<div class="mb-10 w-full max-w-screen-lg rounded-md bg-white/10 p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-semibold">Add New Game</h2>
			<form class="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Title</label>
					<input
						type="text"
						value={title()}
						onChange={(e) => setTitle(e.currentTarget.value)}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter game title"
					/>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Description</label>
					<textarea
						value={description()}
						onChange={(e) => setDescription(e.currentTarget.value)}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter game description"
						rows={4}
					></textarea>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Price ($)</label>
					<input
						type="text"
						value={price()}
						onChange={(e) => setPrice(e.currentTarget.value)}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter game price"
					/>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Genre</label>
					<input
						type="text"
						value={genre()}
						onChange={(e) => setGenre(e.currentTarget.value)}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter game genre"
					/>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Developer</label>
					<input
						type="text"
						value={developer()}
						onChange={(e) => setDeveloper(e.currentTarget.value)}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter developer name"
					/>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Cover Image</label>
					<input
						type="file"
						onInput={handleCoverImageUpload}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm text-white file:mr-4 file:rounded file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div class="flex flex-col">
					<label class="mb-1 text-sm font-medium">Icon Image</label>
					<input
						type="file"
						onInput={handleIconImageUpload}
						class="w-full rounded-md border border-gray-600 bg-black/30 px-3 py-2 text-sm text-white file:mr-4 file:rounded file:border-0 file:bg-blue-500 file:px-4 file:py-2 file:text-sm file:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<button
					type="submit"
					class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-400"
				>
					Post Game
				</button>
			</form>
		</div>
	);
};

export default PostGame;
