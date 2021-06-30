module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["prettier", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint"],
  rules: {},
};
