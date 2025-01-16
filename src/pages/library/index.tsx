import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';

import { user } from '@/store/auth';

const Library = () => {
  const navigate = useNavigate();

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	return <div>Library</div>;
};

export default Library;
