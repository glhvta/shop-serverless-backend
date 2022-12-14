module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      'project': 'tsconfig.json',
      'tsconfigRootDir': __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/recommended',
  ],
  env: { node: true },
  ignorePatterns: ['**/*.js'],
  rules: {
      'no-duplicate-imports': 'error',
      'comma-dangle': ['warn', 'always-multiline'],
      'prefer-const': 'warn',
      'semi': ["warn", "always"],
      'no-multi-spaces': 'warn',
      'no-else-return': 'warn',
      "indent": ["warn", 2],
      "eol-last": ["warn", "always"],
      'object-curly-spacing': ['error', 'always'],
      'quotes': ['warn', 'single'],
      'no-use-before-define': [
          'error',
          {
              'functions': false,
              'classes': false,
          },
      ],
  },
}
