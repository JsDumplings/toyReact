### 7天视频学习react原理
* webpack \ webpack-cli \ webpack-dev-server 全局安装
* webpack.config.js配置（babel转译）
jsx原理分析：
 1. 将dom 给React.render去解析
    React.createElement(type,attributes,...children)方法获取dom内容
 2. 通过判断type类型，用不同的解析方式，创建各个元素节点、内容


问题
1. 在vscode终端 package.json中scripts中的serve运行报错（‘node’不是内部或外部命令，也不是可运行程序）。但是，通过windows PowerShell终端却可以运行。
猜测：
1. cmd跟bash终端的差别 
2. 环境变量的问题  
3. nvm或node出现问题