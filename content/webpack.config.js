const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
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

  plugins:
    process.env.NODE_ENV === "production" ? [new MinifyPlugin({}, {})] : [],

  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(jsx|js)?$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: path.join(__dirname, "src"),
        query: {
          presets: ["es2015", "react"],
        },
      },
    ],
  },
};
