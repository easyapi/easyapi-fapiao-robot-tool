# EasyAPI发票机器人 接口测试工具

## 项目介绍

基于 Nuxt3 框架开发的测试工具，EasyAPI开发了一款发票机器人产品，无需经过第三方，直接在网页上面开票。 本测试工具，主要帮助用户快速体验开票和如何对接发票机器人扩展程序。

示意图：
![发票红冲](https://qiniu.easyapi.com/fapiao-tool-red.png)


- 左侧输入参数
- 右侧是实际发送到发票机器人浏览器插件的WebSocket数据
- [下载发票机器人](https://robot.easyapi.com/)

发票机器人支持电商平台：(https://robot.easyapi.com/)

- 有赞
- 快手
- 淘宝
- 京东
- 拼多多
- 抖音
- 自有平台（电商、非电商都支持）

> 访问官网了解EasyAPI发票机器人功能。(https://robot.easyapi.com/)

## 相关技术和第三方库

* [Nuxt3](https://nuxtjs.org/)
* [Axios网络请求库](https://axios-http.com/zh/)
* [Element Plus组件库](https://element-plus.gitee.io/zh-CN/)
* [Tailwind CSS](https://www.tailwindcss.cn/)

> 本项目还用到了sockjs-client，stompjs

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# preview
$ yarn preview

# server delpoy
$ yarn pm2
```

## 项目目录结构

``` bash
 ├──.nuxt               #自动生成的目录
 ├──api                 #API接口目录
 ├──assets              #资源目录，用于组织未编译的静态资源如STYLUS LESS、SASS 或 JavaScript
 │  ├──css              #css样式
 │  ├──images           #图片
 │  ├──js               #脚本
 ├──components          #组件目录
 ├──layouts             #布局目录
 ├──middleware          #中间件目录
 ├──pages               #页面目录
 ├──plugins             #插件目录
 ├──public              #静态文件目录，用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理
 ├──stores              #状态管理目录
 ├──utils               #工具类
 ├──.gitignore          #忽略配置文件
 ├──app.vue             #项目入口文件
 ├──package.json        #用于描述应用的依赖关系和对外暴露的脚本接口
 ├──prettier.config.js  #Prettier前端格式化配置文件
 ├──nuxt.config.js      #Nuxt.js配置文件，覆盖默认配置。
 └──tailwind.config     #Tailwind CSS配置
```

## 命名规范

* 使用kebab-case（短横线）命名方式
* 图片资源采用的命名规范
* CSS命名规范（BEM命名）
* 常规名称命名方案，参见EasyAPI中英文翻译
* API接口方法命名，例如getUser，getUserList，createUser，updateUser，deleteUser，其他方法尽量动词在前，例如cancelOrder 取消订单

## 其他说明

* page目录页面命名规范，文件命令简明扼要，例如/pages/api/list.vue表示API列表页，/pages/api/detail.vue表示API详情页，其他还包括edit.vue，info.vue，report.vue
* 如果页面必须是2个单词组成，使用短横线分隔命名，例如文章分类article-category，另外考虑是否可以使用/pages/article/category/list.vue来命名，尽量不使用短横线
* page目录中尽量采用样式表和页面分离开发，例如login文件夹中包含login.vue，login.scss，login.js
* 自定义组建说明，基于成熟的组建进行自定义开发，可平滑升级，打造属于EasyAPI的Vue组件库，以EasyAPI缩写ea为前缀，例如ea-table
* 网络请求需使用axios
* 用户信息等全局变量，必须使用store管理，放到stores文件夹下
