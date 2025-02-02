// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  {
    ignores: ['.next', 'node_modules'],
  },
  compat.config({
    extends: ['next'],
  }),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: ['*.js'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
