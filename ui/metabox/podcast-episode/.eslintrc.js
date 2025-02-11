module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "eslint-config-prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/prop-types": 0,
  },
  plugins: ["react", "@typescript-eslint"],
};
