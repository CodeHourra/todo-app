# GitHub 仓库推送指南

## 步骤 1: 在 GitHub 上创建新仓库

1. 登录 GitHub 账号
2. 点击右上角 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - Repository name: 输入项目名称（例如：todo-app）
   - Description: 添加项目描述（可选）
   - 选择 Public 或 Private
   - 不要勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

## 步骤 2: 初始化本地 Git 仓库

在项目根目录下运行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 创建首次提交
git commit -m "初始化提交：Todo 应用"
```

## 步骤 3: 添加远程仓库

将 GitHub 仓库添加为远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/todo-app.git
```

## 步骤 4: 推送代码到 GitHub

```bash
# 推送代码到 main 分支
git push -u origin main
```

## 注意事项

1. 确保已经安装并配置了 Git
2. 如果是首次使用 GitHub，需要配置 SSH 密钥或使用个人访问令牌
3. 如果遇到推送失败，可能需要：
   - 检查远程仓库 URL 是否正确
   - 确认是否有推送权限
   - 解决可能的冲突

## 验证推送结果

1. 访问你的 GitHub 仓库页面
2. 确认所有文件都已经成功推送
3. 检查代码和提交历史是否完整

## 后续维护

1. 定期拉取远程更新：`git pull origin main`
2. 创建新的功能分支：`git checkout -b feature/new-feature`
3. 合并更改到主分支：`git merge feature/new-feature`
4. 推送更新：`git push origin main`