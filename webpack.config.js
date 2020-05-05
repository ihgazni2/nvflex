const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "nvflex.js",
    path: path.resolve(__dirname, "dist"),
    library: "NVFLEXJS",
    libraryTarget: "umd",
    globalObject: "this"
  },
  node:{
      fs:'empty'    
  },
  mode: "production",
  devtool: "source-map"
};
