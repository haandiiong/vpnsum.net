import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = new URL('../dist/client/', import.meta.url);
const errors = [];

const walk = async (directory) => {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const target = new URL(entry.name, directory);
		if (entry.isDirectory()) files.push(...await walk(new URL(`${entry.name}/`, directory)));
		else files.push(target);
	}
	return files;
};

const files = await walk(outputDirectory);
const htmlFiles = files.filter((file) => file.pathname.endsWith('.html'));
const routes = new Set(['/robots.txt', '/sitemap.xml']);

for (const file of htmlFiles) {
	const relative = path.relative(outputDirectory.pathname, file.pathname);
	if (relative === '404.html') continue;
	const route = relative === 'index.html'
		? '/'
		: `/${relative.replace(/index\.html$/, '').replaceAll(path.sep, '/')}`;
	routes.add(route);
}

const normalizeInternalPath = (value) => {
	const url = new URL(value, 'https://vpnsum.net');
	if (url.origin !== 'https://vpnsum.net') return undefined;
	let pathname = decodeURIComponent(url.pathname);
	if (!pathname.endsWith('/') && !path.extname(pathname)) pathname += '/';
	return pathname;
};

for (const file of htmlFiles) {
	const html = await readFile(file, 'utf8');
	const relative = path.relative(outputDirectory.pathname, file.pathname);

	if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${relative}: 缺少页面标题`);
	if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${relative}: 缺少页面描述`);
	if (!/<link rel="canonical" href="https:\/\/vpnsum\.net\//.test(html)) errors.push(`${relative}: canonical 地址异常`);

	for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
		try {
			JSON.parse(match[1]);
		}
		catch {
			errors.push(`${relative}: JSON-LD 无法解析`);
		}
	}

	for (const match of html.matchAll(/href="([^"]+)"/g)) {
		if (!match[1].startsWith('/') || match[1].startsWith('//')) continue;
		const target = normalizeInternalPath(match[1]);
		if (target && !routes.has(target) && !files.some((file) => file.pathname.endsWith(target))) {
			errors.push(`${relative}: 内部链接不存在 ${match[1]}`);
		}
	}
}

const sitemap = await readFile(new URL('sitemap.xml', outputDirectory), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== routes.size - 2) {
	errors.push(`sitemap.xml: URL 数量 ${sitemapUrls.length} 与可索引页面数量 ${routes.size - 2} 不一致`);
}

const robots = await readFile(new URL('robots.txt', outputDirectory), 'utf8');
if (!robots.includes('Sitemap: https://vpnsum.net/sitemap.xml')) {
	errors.push('robots.txt: 缺少正式 Sitemap 地址');
}

if (errors.length > 0) {
	console.error(`站点审查发现 ${errors.length} 个问题：`);
	for (const error of errors) console.error(`- ${error}`);
	process.exitCode = 1;
}
else {
	console.log(`站点审查通过：${htmlFiles.length} 个 HTML 页面，${sitemapUrls.length} 个 Sitemap URL，内部链接和结构化数据正常。`);
}
