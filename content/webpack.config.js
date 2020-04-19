const path = require("path");

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
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash]-[name].[ext]",
              outputPath: "images/",
              publicPath:
                "chrome-extension://gajbgipfccflpoeomhonmpjkmhlppdnh/images",
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath:
                "chrome-extension://gajbgipfccflpoeomhonmpjkmhlppdnh/fonts",
            },
          },
        ],
      },
    ],
  },
};
