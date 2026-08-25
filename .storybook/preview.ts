import type { Preview } from "@storybook/web-components";
import "../src/tokens/tokens.css";
import "../src/patterns/_chamfer.css";

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true }, // tokens.css owns background via body/:root
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Colour mode",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "auto", title: "Auto", icon: "circlehollow" },
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "auto",
  },
  decorators: [
    (story, context) => {
      const mode = context.globals.theme ?? "auto";
      const root = document.documentElement;
      if (mode === "auto") {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", mode);
      }
      root.style.background = "var(--paper)";
      root.style.color = "var(--ink)";
      root.style.fontFamily = "var(--body)";
      return story();
    },
  ],
};

export default preview;
