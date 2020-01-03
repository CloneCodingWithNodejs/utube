const path = require("path");
const ExtractCss = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
//import path from "path"의 ES5버전임

//package.json의 script참조
const MODE = process.env.WEBPACK_ENV;

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        //webpack이 실행될때 .scss파일인지 확인해라
        test: /\.(scss)$/,
        //extract function은 밑에서부터 역순으로 실행됨
        use: ExtractCss.extract([
          {
            loader: "css-loader" //호환성 처리됨 css에서 text를 추출함
          },
          {
            loader: "postcss-loader", //css를 받아서 호환성 처리함
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader" //sass를 css로 변환
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCss("styles.css")]
};

module.exports = config;
