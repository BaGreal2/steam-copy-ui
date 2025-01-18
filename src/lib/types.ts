export interface Game {
	game_id: string;
	title: string;
	description: string;
	price: string;
	genre: string;
	developer: string;
	cover_image: string;
	icon_image: string;
	release_date: string;
}

export interface User {
	user_id: string;
	username: string;
	email: string;
	password: string;
	profile_image: string;
}

export interface Achievement {
	achievement_id: string;
	game_id: string;
	name: string;
	description: string;
	points: string;
}

export interface Review {
  review_id: string;
  game_id: string;
  user_id: string;
  rating: string;
  review_text: string;
  created_at: string;
}

export interface BackendMessage {
	message: string;
}
