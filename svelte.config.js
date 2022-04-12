import adapter from '@sveltejs/netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
            ssr:{
                noExternal: ['chart.js']
            }
        }
	}
};

export default config;
