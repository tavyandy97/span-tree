const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "cheap-module-source-map",

  entry: ["./event/src/index.js"],

  output: {
    filename: "event.js",
    path: path.join(__dirname, "../", "build"),
  },

  resolve: {
    extensions: [".js", ".json"],
    modules: ["node_modules"],
  },

  module: {
    rules: [
      {
        test: /\.(js)?$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
          },
        },
      },
    ],
  },
};
