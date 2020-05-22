const tailwindcss = require("tailwindcss")
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("postcss-preset-env")({
      stage: 3,
    }),
    require("postcss-nested"),
    require("autoprefixer"),
  ],
}
