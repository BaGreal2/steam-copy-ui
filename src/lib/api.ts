import { API_BASE_URL } from './constants';

export const fetchData = async <T>(
	endpoint: string,
	options: any = {}
): Promise<T> => {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		}
	});
	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}
	return response.json() as T;
};
