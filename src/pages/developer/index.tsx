import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';

import { user } from '@/store/auth';

const Developer = () => {
  const navigate = useNavigate();

	createEffect(() => {
		if (!user()) {
			navigate('/login');
		}
	});

	return <div>Developer</div>;
};

export default Developer;
