import { createSignal, For } from 'solid-js';

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

interface Props {
	reviews: Review[];
	refetch: () => void;
	gameId: string;
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
		<div class="mt-4 flex flex-col gap-2 text-white">
			<h1 class="text-2xl font-bold">Reviews</h1>
			<form class="mb-2 flex w-[500px] gap-2" onSubmit={handleSubmit}>
				<input
					value={reviewText()}
					onChange={(e) => setReviewText(e.currentTarget.value)}
					type="text"
					class="h-12 grow rounded-md bg-white/10 px-4 py-2"
					placeholder="Write a review..."
				/>
				<select
					class="h-12 grow cursor-pointer rounded-md bg-white/10 px-4 py-2"
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
					class="h-12 w-24 rounded-md bg-blue-800 text-xl font-semibold text-white transition-all duration-300 hover:bg-blue-700"
					type="submit"
				>
					Submit
				</button>
			</form>
			<div class="flex flex-col gap-1">
				<For
					each={props.reviews.sort(
						(a, b) =>
							new Date(b.created_at).getTime() -
							new Date(a.created_at).getTime()
					)}
					fallback={<div>Loading...</div>}
				>
					{(review) => (
						<div class="flex w-[500px] flex-col rounded-md bg-white/10 px-4 py-2">
							<div class="flex justify-between text-lg">
								<span class="font-medium">Anonymous</span>
								<span>{review.rating} ★</span>
							</div>
							<span class="text">{review.review_text}</span>
						</div>
					)}
				</For>
			</div>
		</div>
	);
};

export default ReviewsSection;
