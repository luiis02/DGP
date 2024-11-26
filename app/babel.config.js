module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "@babel/plugin-transform-private-methods",
      {
        loose: true, // Modo "loose" para este plugin
      },
    ],
    [
      "@babel/plugin-transform-private-property-in-object",
      {
        loose: true, // Modo "loose" para este plugin también
      },
    ],
    [
      "@babel/plugin-transform-class-properties",
      {
        loose: true, // Asegurarse de que este plugin también esté en "loose"
      },
    ],
  ],
  overrides: [
    {
      test: /node_modules\/@rneui\/(themed|base)/, // Aplica transformaciones a estos módulos
      presets: ["@babel/preset-env"],
    },
  ],
};
