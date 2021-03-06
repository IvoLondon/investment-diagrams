const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const statements = require("tsx-control-statements").default;

module.exports = (env) => {
  return {
    entry: path.resolve(__dirname, "/index.tsx"),
    mode: "development",
    devtool: "eval-source-map",
    cache: false,
    output: {
      clean: true,
      filename: "index.[hash].bundle.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "[path][name][ext]",
    },
    resolve: {
      alias: {
        "@root": path.resolve(__dirname, "./src/"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@assets": path.resolve(__dirname, "./src/assets/"),
        "@components": path.resolve(__dirname, "./src/components/"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
      port: 3000,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({ before: [statements()] }),
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(svg|png|jpg|jpeg)$/,
          type: "asset",
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        REAL_DATA: env.REAL_DATA || "",
      }),
      new Dotenv({
        path: `./env/.env`,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "/index.html"),
        filename: "index.html",
        inject: "body",
      }),
    ],
  };
};
