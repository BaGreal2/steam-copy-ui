import { createSignal, For, Show } from 'solid-js';

import { user } from '@/store/auth';

import { fetchData } from '@/lib/api';
import { BackendMessage, Review } from '@/lib/types';

const postReview = async (
	reviewText: string,
	rating: number,
	gameId: number,
	userId: number
) => {
	try {
		const res = await fetchData<BackendMessage>(`/reviews/game/${gameId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				review_text: reviewText,
				rating,
				game_id: gameId,
				user_id: userId
			})
		});
		return res;
	} catch (error) {
		console.error(error);
	}
};

const NoReviews = () => {
	return <div class="text-lg font-medium text-gray-400">No reviews yet...</div>;
};

interface Props {
	reviews: Review[] | undefined;
	refetch: () => void;
	gameId: string;
	isLoading: boolean;
}

const ReviewsSection = (props: Props) => {
	const [reviewText, setReviewText] = createSignal('');
	const [rating, setRating] = createSignal('1');

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if (!user()?.user_id) {
			return;
		}
		postReview(
			reviewText(),
			Number(rating()),
			Number(props.gameId),
			Number(user()?.user_id)
		);
		setReviewText('');
		setRating('1');
		props.refetch();
	};

	return (
		<div class="mt-6 flex flex-col gap-4 text-white">
			<h1 class="text-2xl font-semibold">Reviews</h1>
			<form
				class="mb-4 flex w-full max-w-[600px] gap-3"
				onSubmit={handleSubmit}
			>
				<input
					value={reviewText()}
					onChange={(e) => setReviewText(e.currentTarget.value)}
					type="text"
					class="flex-grow rounded-lg border border-gray-700 bg-[#2c2c2c] px-4 py-2 text-sm text-gray-300 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Write a review..."
				/>
				<select
					class="rounded-lg border border-gray-700 bg-[#2c2c2c] px-4 py-2 text-sm text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={rating()}
					onChange={(e) => setRating(e.currentTarget.value)}
				>
					<option value="1">1 ★</option>
					<option value="2">2 ★</option>
					<option value="3">3 ★</option>
					<option value="4">4 ★</option>
					<option value="5">5 ★</option>
				</select>
				<button
					class="w-28 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-500 hover:shadow-lg"
					type="submit"
				>
					Submit
				</button>
			</form>
			<div class="flex flex-col gap-3">
				<Show
					when={props.reviews && props.reviews.length !== 0 && !props.isLoading}
					fallback={<NoReviews />}
				>
					<For
						each={props.reviews?.sort(
							(a, b) =>
								new Date(b.created_at).getTime() -
								new Date(a.created_at).getTime()
						)}
						fallback={
							<div class="text-lg font-medium text-gray-400">Loading...</div>
						}
					>
						{(review) => (
							<div class="flex w-full max-w-[600px] flex-col rounded-lg border border-gray-700 bg-[#2c2c2c] px-5 py-4 shadow-md hover:shadow-lg">
								<div class="flex justify-between text-base text-gray-200">
									<span class="font-semibold">{review.username}</span>
									<span class="text-sm text-yellow-500">{review.rating} ★</span>
								</div>
								<span class="mt-2 text-sm text-gray-400">
									{review.review_text}
								</span>
							</div>
						)}
					</For>
				</Show>
			</div>
		</div>
	);
};

export default ReviewsSection;
