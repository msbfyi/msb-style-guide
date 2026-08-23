import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|js)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@whitespace/storybook-addon-html",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
};

export default config;
