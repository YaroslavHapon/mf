const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// We can setup this environment variable during our CI/CD pipeline at AWS
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    // generic filename and hash function
    filename: "[name].[contenthash].js",
    // publicPath of output files isn't known at compile time
    // Allows to set some path for HTMLWebpackPlugin so it can access file
    publicPath: "/container/latest/",
    // HTMLWebpackPlugin will prepend path like this
    // http://domain.com/container/latest/[name].[contenthash].js
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // replacement of localhost:8081 at production for our remotes
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
