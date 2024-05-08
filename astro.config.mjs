import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeInlineCodeLanguage from "rehype-inline-code-language"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "vaporvee Docs",
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        de: {
          label: 'Deutsch',
          lang: 'de'
        }
      },
      customCss: ["./src/styles/custom.scss", "./src/styles/global.scss"],
      social: {
        github: "https://github.com/vaporvee",
        discord: "https://discord.com/invite/EBdaTefpWy",
        linkedin: "https://linkedin.com/in/yannik-ain/",
      },
      editLink: {
        baseUrl: "https://github.com/vaporvee/docs/edit/main/",
      },
      sidebar: [
        {
          label: "Home",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Projects", link: "/" },
          ],
        },
        {
          label: "Discord RPC Godot",
          autogenerate: { directory: "discord-rpc-godot" },
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
        //SocialIcons: "./src/components/SocialIcons.astro",
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeInlineCodeLanguage,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
});
