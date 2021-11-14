const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const statements = require("tsx-control-statements").default;

module.exports = {
  entry: path.resolve(__dirname, "/index.tsx"),
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "[path][name][ext]",
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@components": path.resolve(__dirname, "./src/components/"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    port: 3000,
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "/index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
};
