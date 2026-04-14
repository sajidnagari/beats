import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...tseslint.configs.recommended,
];
