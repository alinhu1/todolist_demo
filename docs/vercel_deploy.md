# 实现todo list部署到线上CICD流程，到vercel可以服务
## 第一步 代码推送到GitHub仓库
我将本地todo list项目代码推送到github仓库的main分支，就会触发工作流
## 第二步 GitHub Actions执行CI
GitHub检测到main分支有提交，就启动GitHub Actions工作流
1. 启动一个虚拟机(ubantu-latest)
2. 从GitHub拉取最新的代码
3. 安装Node.js 22版本，启用yarn依赖缓存加速安装
4. 安装项目依赖，生成node_modules目录
## 第三步 Vercel部署
1. 配置vercel：通过vercel cli拉取预览环境配置，将vercel的环境变量文件复制到项目根目录，将证书写入文件，然后生成zenstack和prisma客户端代码，并数据库迁移
2. 构建项目：再次生成代码，然后使用vercel cli执行项目构建
3. 部署到vercel：部署预构建的项目，从日志中提取自动生成部署的url，然后将url绑定到域名上