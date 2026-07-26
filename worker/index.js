/**
 * Production entry point for the static Astro build on Cloudflare.
 * The build adapter places Astro's static output in dist/client/ for ASSETS.
 */
export default {
	async fetch(request, env) {
		const response = await env.ASSETS.fetch(request);
		if (response.status !== 404 || request.method !== 'GET') return response;

		const url = new URL(request.url);
		const lastSegment = url.pathname.split('/').at(-1);
		if (url.pathname.endsWith('/')) {
			url.pathname += 'index.html';
		} else if (lastSegment && !lastSegment.includes('.')) {
			url.pathname += '/index.html';
		} else {
			return response;
		}

		return env.ASSETS.fetch(new Request(url, request));
	},
};
