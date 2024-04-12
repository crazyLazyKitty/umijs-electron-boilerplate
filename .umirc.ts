import { defineConfig } from "umi";
import path from './.erb/configs/webpack.paths';

// 使用INNER_WEB_BUILD环境变量来区分是electron侧的build
const isInnerWebBuild = process.env.INNER_WEB_BUILD === 'true'
const publicPath = isInnerWebBuild? './': '/'
const historyType: 'browser' | 'hash' = isInnerWebBuild? 'hash':'browser';

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'yarn',
  publicPath,
  history: {
    type: historyType,
  },
  chainWebpack(memo) {
    if (process.env.INNER_WEB_BUILD === 'true') {
      memo.output.path(path.distRendererPath);
      return;
    }
  },
});
