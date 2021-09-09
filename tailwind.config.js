module.exports = {
  important: true,
  purge: {
    enabled: true,
    content: ["./projects/**/src/**/*.{html,ts}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: { "logo-font": ['"ZCOOL KuaiLe"', "cursive"] },
    },
  },
  variants: {
    extend: {},
    textOpacity: ["dark"],
    translate: ["dark"],
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-nested"),
    require("postcss-custom-properties"),
    require("autoprefixer"),
  ],
};
