import { createSignal } from 'solid-js';

import { User } from '@/lib/types';

let localUser;

try {
	const userString = localStorage.getItem('user');
	localUser = userString ? JSON.parse(userString) : null;
} catch (e) {
	localUser = null;
}

const [user, setUser] = createSignal<User | null>(localUser);

export { user, setUser };
