import { readFile } from 'node:fs/promises';

const host = 'www.vpnsum.net';
const key = '714296b52e175f6f7c89beb687753a22';
const keyLocation = `https://${host}/${key}.txt`;
const sitemap = await readFile(new URL('../dist/client/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (urlList.length === 0) {
	throw new Error('Sitemap中没有可提交的URL');
}

const response = await fetch('https://api.indexnow.org/indexnow', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json; charset=utf-8' },
	body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
	throw new Error(`IndexNow提交失败：HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow已接收 ${urlList.length} 个URL。`);
