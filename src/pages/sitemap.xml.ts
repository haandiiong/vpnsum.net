import { getCollection } from 'astro:content';

export const prerender = true;

const siteUrl = 'https://www.vpnsum.net';

const escapeXml = (value: string) =>
	value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');

const toIsoDate = (value?: string | Date) => {
	if (!value) return undefined;
	const date = value instanceof Date ? value : new Date(String(value).replaceAll('/', '-'));
	return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

export async function GET() {
	const articles = await getCollection('articles');
	const latestContentUpdate = articles
		.map(({ data }) => toIsoDate(data.updateTime ?? data.createTime))
		.filter((value): value is string => Boolean(value))
		.sort()
		.at(-1);
	const pages = [
		{ permalink: '/', updateTime: latestContentUpdate },
		...articles
			.filter(({ data }) => !data.noindex)
			.map(({ data }) => ({
				permalink: data.permalink,
				updateTime: data.updateTime ?? data.createTime,
			})),
	].sort((a, b) => a.permalink.localeCompare(b.permalink));

	const urls = pages
		.map(({ permalink, updateTime }) => {
			const lastmod = toIsoDate(updateTime);
			return [
				'  <url>',
				`    <loc>${escapeXml(new URL(permalink, siteUrl).toString())}</loc>`,
				...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
				'  </url>',
			].join('\n');
		})
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
			},
		},
	);
}
