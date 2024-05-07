import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypePrettyCode from "rehype-pretty-code";
import codeTheme from "./src/styles/moonlight-ii.json";
import lightCodeTheme from "./src/styles/github_light.json";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "vaporvee Docs",
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
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Discord SDK Godot",
          autogenerate: { directory: "discord-rpc-godot" },
        },
      ],
      components: {
        Head: "./src/components/Head.astro",
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: codeTheme,
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
});
