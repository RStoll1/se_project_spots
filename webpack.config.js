const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: {
      main: "./src/pages/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: "",
      clean: true, // ensures output folder is cleaned
    },
    mode: isDev ? "development" : "production",
    devtool: isDev ? "inline-source-map" : false,
    stats: "errors-only",
    devServer: {
      static: path.resolve(__dirname, "dist"),
      compress: true,
      port: 8080,
      open: true,
      liveReload: true,
      hot: false,
    },
    target: ["web", "es5"],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|webp|gif|woff(2)?|eot|ttf|otf)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
    ],
  };
};
