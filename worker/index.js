/**
 * Production entry point for the static Astro build on Cloudflare.
 * Astro emits the site into dist/ and the ASSETS binding serves those files.
 */
export default {
	async fetch(request, env) {
		return env.ASSETS.fetch(request);
	},
};
