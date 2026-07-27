/**
 * Production entry point for the static Astro build on Cloudflare.
 * The build adapter places Astro's static output in dist/client/ for ASSETS.
 */
const permanentRedirects = new Map([
	['/jichang-tuijian', '/posts/jichang-tuijian/'],
	['/posts/jichang-recommend', '/posts/jichang-tuijian/'],
	['/posts/network-accelerator', '/posts/jichang-tuijian/'],
	['/posts/cheap-jichang-recommend', '/posts/cheap-airport-under-15/'],
	['/rankings/all', '/posts/jichang-tuijian/'],
	['/rankings/stable', '/posts/jichang-tuijian/'],
	['/rankings/cheap', '/posts/cheap-airport-under-15/'],
	['/rankings/clash', '/posts/clash-node-recommend/'],
]);

const addResponseHeaders = (response, pathname) => {
	const headers = new Headers(response.headers);
	headers.set('Strict-Transport-Security', 'max-age=31536000');
	headers.set('X-Frame-Options', 'DENY');
	headers.set('Content-Security-Policy', "frame-ancestors 'none'; base-uri 'self'; object-src 'none'");
	headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

	if (pathname.startsWith('/_astro/')) {
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};

export default {
	async fetch(request, env) {
		const requestUrl = new URL(request.url);
		const normalizedPath = requestUrl.pathname.length > 1
			? requestUrl.pathname.replace(/\/$/, '')
			: requestUrl.pathname;
		const redirectTarget = permanentRedirects.get(normalizedPath);
		if (redirectTarget) {
			return addResponseHeaders(
				Response.redirect(new URL(redirectTarget, requestUrl), 301),
				requestUrl.pathname,
			);
		}

		const response = await env.ASSETS.fetch(request);
		if (response.status !== 404 || request.method !== 'GET') {
			return addResponseHeaders(response, requestUrl.pathname);
		}

		const url = requestUrl;
		const lastSegment = url.pathname.split('/').at(-1);
		if (url.pathname.endsWith('/')) {
			url.pathname += 'index.html';
		} else if (lastSegment && !lastSegment.includes('.')) {
			url.pathname += '/index.html';
		} else {
			return addResponseHeaders(response, requestUrl.pathname);
		}

			const fallbackResponse = await env.ASSETS.fetch(new Request(url, request));
			if (fallbackResponse.status !== 404) {
				return addResponseHeaders(fallbackResponse, requestUrl.pathname);
			}

			const notFoundUrl = new URL('/404.html', requestUrl);
			const notFoundPage = await env.ASSETS.fetch(new Request(notFoundUrl, request));
			if (notFoundPage.status === 404) {
				return addResponseHeaders(response, requestUrl.pathname);
			}

			return addResponseHeaders(new Response(notFoundPage.body, {
				status: 404,
				headers: notFoundPage.headers,
			}), requestUrl.pathname);
		},
	};
