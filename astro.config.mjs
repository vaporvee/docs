import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeExternalLinks from "rehype-external-links"

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'vaporvee Docs',
			customCss: [
				'./src/styles/custom.scss',
			  ],
			social: {
				github: 'https://github.com/vaporvee',
				discord: 'https://discord.com/invite/EBdaTefpWy',
				linkedin: 'https://linkedin.com/in/yannik-ain/',
			},
			editLink: {
				baseUrl: 'https://github.com/vaporvee/docs/edit/main/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			components: {
				Head: "./src/components/Head.astro",
			}
		}),
	],
	markdown: {
		rehypePlugins: [
			[
			rehypeExternalLinks,
            {
              target: '_blank',
            },
          ],
		],
	}
});
