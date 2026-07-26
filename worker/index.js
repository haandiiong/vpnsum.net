/**
 * Production entry point for the static Astro build on Cloudflare.
 * The build adapter places Astro's static output in dist/client/ for ASSETS.
 */
export default {
	async fetch(request, env) {
		const requestUrl = new URL(request.url);
		if (requestUrl.pathname === '/jichang-tuijian' || requestUrl.pathname === '/jichang-tuijian/') {
			return Response.redirect(new URL('/posts/jichang-tuijian/', requestUrl), 301);
		}

		const response = await env.ASSETS.fetch(request);
		if (response.status !== 404 || request.method !== 'GET') return response;

		const url = requestUrl;
		const lastSegment = url.pathname.split('/').at(-1);
		if (url.pathname.endsWith('/')) {
			url.pathname += 'index.html';
		} else if (lastSegment && !lastSegment.includes('.')) {
			url.pathname += '/index.html';
		} else {
			return response;
		}

			const fallbackResponse = await env.ASSETS.fetch(new Request(url, request));
			if (fallbackResponse.status !== 404) return fallbackResponse;

			const notFoundUrl = new URL('/404.html', requestUrl);
			const notFoundPage = await env.ASSETS.fetch(new Request(notFoundUrl, request));
			if (notFoundPage.status === 404) return response;

			return new Response(notFoundPage.body, {
				status: 404,
				headers: notFoundPage.headers,
			});
		},
	};
