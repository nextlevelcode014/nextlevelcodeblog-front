import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { readFileSync } from 'fs'

// Definições de caminho
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Corrigido: adição do `recommendedConfig`
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: require('eslint/conf/eslint-recommended'),
})

// Configuração do ESLint
const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
    },
    settings: { react: { version: 'detect' } },
  }),
]

export default eslintConfig
