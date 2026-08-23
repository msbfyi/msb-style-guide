module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "lit", "wc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:lit/recommended",
    "plugin:wc/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: [
    "dist",
    "storybook-static",
    "node_modules",
    ".storybook/__image_snapshots__",
  ],
  rules: {
    // Lit's `@property()`/`@customElement()` decorators and constructor-
    // less classes routinely trip these two; they fight the idiom rather
    // than catch real bugs here.
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  overrides: [
    {
      // Story/test files reference component classes only for their
      // types, and web-test-runner/Storybook globals (describe/it/play)
      // aren't ambient here the way they are under their real test
      // runners' own tsconfig — relax a couple of rules just for these.
      files: ["*.stories.ts", "*.test.ts"],
      env: { mocha: true },
      rules: {
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      },
    },
  ],
};
