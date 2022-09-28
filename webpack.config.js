const path = require("path");

const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

function workspace(...args) {
  return path.resolve(__dirname, ...args);
}

const plugins = {
  externals: nodeExternals({
    modulesDir: workspace("node_modules"),
  }),
  tsconfigpaths: new TsconfigPathsPlugin({
    configFile: workspace("tsconfig.json"),
  }),
  nodemon: new NodemonPlugin({
    script: "./index.start.js",
    watch: workspace("dist"),
    ext: "js",
    delay: 1000,
  }),
};

module.exports = (env) => {
  /** @type {import('webpack').Configuration['mode']} */
  // const mode = Boolean(env?.production) ? "production" : "development";
  const mode = "production";

  /** @type {import('webpack').Configuration} */
  const config = {
    mode: mode,
    entry: "./src/index.ts",
    target: "node",
    externals: [plugins.externals],
    externalsPresets: { node: true },
    module: { rules: [{ test: /\.ts/, use: "ts-loader", exclude: /node_modules/ }] },
    resolve: { extensions: [".ts"], plugins: [plugins.tsconfigpaths] },
    output: {
      library: {
        name: "regionsofindonesia",
        type: "global",
      },
      filename: "index.js",
      path: workspace("dist"),
    },
    plugins: [plugins.nodemon],
    optimization: {
      mangleExports: false,
    },
  };

  return config;
};
