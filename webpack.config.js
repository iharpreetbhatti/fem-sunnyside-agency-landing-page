const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isDevMode ? "js/[name].js" : "js/[name].[contenthash].js",
      assetModuleFilename: "assets/[hash][ext][query]",
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 8080,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
    },
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
          test: /\.(scss|css)$/,
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "css/[name].css" : "css/[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: "src/index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      // new CopyWebpackPlugin({
      //   patterns: [{ from: "src/assets", to: "assets" }],
      // }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      }),
    ],
    devtool: isDevMode ? "eval-source-map" : "source-map",
  };
};
