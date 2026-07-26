import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.(md|mdx)', base: './src/content/articles' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		permalink: z.string(),
		createTime: z.union([z.string(), z.date()]).optional(),
		updateTime: z.union([z.string(), z.date()]).optional(),
		tags: z.array(z.string()).optional(),
		cover: z.string().optional(),
		noindex: z.boolean().optional(),
		article: z.boolean().optional(),
	}).passthrough(),
});

export const collections = { articles };
