# gulp工具项目demo
  用于前后端分离项目，可以使用es6语法，sass，自动打包压缩代码


##  使用了eslink，所以使用编译报错时，需要修改eslink报的错才能打包成功
  ```
    可以修改eslink配置，具体看eslinktrc.js文件
  ```

##  1 如何开始使用？

  ```
    首先要安装好Nodejs，然后装好cnpm
    cnpm install 下载所有的npm包
  ```

  ```
    打开两个node窗口，窗口一输入命令行npm start 这个是监听gulp所有任务的命令
    在dist文件夹里面打开node窗口二输入命令 npm run server 这个是开启本地服务，自动刷新浏览器，浏览器需要安装livereload插件
    每次修改完文件，按保存，将会自动执行gulp的任务，如果gulp报错，需要解决报错的问题，才能打包文件
  ```

##  2 文件夹说明
  ```
  src里面的文件为本地编写代码文件，dist为gulp打包输出的文件

  lib放公共文件，例如库文件，css,js都可以

  images 放置图片，页面引入的静态图片等
  ```

##  3 确定项目是单页面应用还是多页面
  ```
    单页面应该直接在index.html中引入js文件同时根据单页面应该的方式来加载html（具体情况需要看使用的框架是如何进行的单页应用）
  ```

  ```
    目前配置的是多页应用，在tppl文件中写页面html，js文件夹中放页面html的js文件，styles放所需的css或sass文件（css）
  ```

###  注意
  ```
  每次新增或者删除加了文件，需要关闭（node窗口ctr+c）再输入npm start重新开启一下

  ```
