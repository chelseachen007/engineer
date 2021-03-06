# 从 0 制作一个工程化模板

一个工程化模板

## 工作流

多人协作采用[git -flow工作流](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)

* [x] 清晰的项目结构
* [x] webpack配置+性能优化
* [x] 自动生成 Dll 的脚本
* [x] axios封装
* [x] util辅助函数
* [x] 自动化部署
* [x] 代码规范化

### 提交规范

```javascript
yarn run gc
```
- feat：新功能（feature）`
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

### 关于自动化部署

自动化脚本需要服务器,在setting中的webhooks中配置发送的域名
自动化部署监听 master 分支, 当 master 分支 commit 后执行构建脚本
现在采用的是git actions自动检测提交规范，以及eslint检查

