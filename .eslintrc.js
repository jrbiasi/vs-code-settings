module.exports = {
  root: true,
  extends: ['@rocketseat/eslint-config/react'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    eqeqeq: 'off',
    endOfLine: 'off',
    // 'prettier/prettier': 'warm',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true, // <-- Change this to true
      },
    ],
  },
}
