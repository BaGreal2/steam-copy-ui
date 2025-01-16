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
}
