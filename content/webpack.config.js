const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "cheap-module-source-map",

  entry: ["./content/src/scripts/index.js"],

  output: {
    filename: "content.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".svg"],
    modules: ["node_modules"],
  },

  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(jsx|js)?$/,
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
