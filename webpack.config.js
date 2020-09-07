const path = require("path");   //webpack.config.js는 모던 자바스크립트 파일이 아니라서 import 쓸 수 없음.
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    devtool: "cheap-module-source-map",
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
                test: /\.(scss)$/,
                use: ExtractCSS.extract([       //맨 아래에서 부터 시작 이 경우 sass부터 그리고 추출해줌.
                    {
                        loader: "css-loader"    //css를 가져와 줌.
                    },
                    {
                        loader: "postcss-loader",    //특정 plugin들을 css에 대해 실행시켜줌.
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })]; //webbrowser종류가 어떤것이든 거기서 실행할 수 있게 해줌.
                            }
                        }
                    },
                    {
                        loader: "sass-loader"   //sass를 css로 옮겨줌.
                    }]
                )
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;