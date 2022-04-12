import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            split: false,
        }),
		vite: {
            ssr:{
                noExternal: ['chart.js']
            }
        }
	}
};

export default config;
