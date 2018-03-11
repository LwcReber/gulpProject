# gulp工具项目demo
  用于前后端分离项目，可以使用es6语法，sass，自动打包压缩代码


##  使用了eslink，所以使用编译报错时，需要修改eslink报的错才能打包成功
  `可以修改eslink配置，具体看eslinktrc.js文件`

##  1 如何开始使用？

  `首先要安装好Nodejs，然后装好cnpm
  npm install 下载所有的npm包`

  `打开两个node窗口，窗口一输入命令行npm start 这个是监听gulp所有任务的命令
  窗口二输入命令 npm server 这个是开启本地服务，自动刷新浏览器，浏览器需要安装liverreload插件`

##  2 文件夹说明
  `src里面的文件为本地编写代码文件，dist为gulp打包输出的文件
  public放公共文件，例如库文件`

##  3 确定项目是单页面应用还是多页面
  `单页面应该直接在index.html中引入js文件同时根据单页面应该的方式来加载html（具体情况需要看使用的框架是如何进行的单页应用）`

  `目前配置的是多页应用，在tppl文件中写页面html，js文件夹中放页面html的js文件，styles放所需的css或sass文件（css）`

###  注意
  `需要注意html文件引入的js或css的文件路径，不能是src的路径，而是打包后的dist输出的路径`
  `如果新增加了文件，需要关闭npm start重新再开启一下`
