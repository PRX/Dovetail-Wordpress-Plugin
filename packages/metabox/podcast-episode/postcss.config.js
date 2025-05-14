module.exports = {
  plugins: [
    require('@tailwindcss/nesting')(require('postcss-nesting')),
    require('@tailwindcss/postcss'),
    require("postcss-prefix-selector")({
      prefix: ':is(.dtpc-tw, #dovetail-podcasts-episode)',
    }),
  ]
};
