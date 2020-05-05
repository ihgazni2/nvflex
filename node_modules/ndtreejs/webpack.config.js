const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "ndtree.js",
    path: path.resolve(__dirname, "dist"),
    library: "NDTREEJS",
    libraryTarget: "umd",
    globalObject: "this"
  },
  node:{
      fs:'empty'    
  },
  mode: "production",
  devtool: "source-map"
};

