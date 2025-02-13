# Todo 应用部署指南

## 环境要求

- Node.js 20.x 或更高版本
- Docker 24.x 或更高版本
- npm 10.x 或更高版本
- Git

## 本地开发环境配置

1. 克隆项目代码
```bash
git clone <项目仓库地址>
cd todo-app
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

## 构建和部署

### 方式一：手动构建和部署

1. 构建项目
```bash
npm run build
```

2. 构建 Docker 镜像
```bash
docker build -t todo-app:latest .
```

3. 运行容器
```bash
docker run -d \
    --name todo-app \
    -p 80:80 \
    --restart unless-stopped \
    todo-app:latest
```

### 方式二：使用部署脚本

1. 修改 deploy.sh 中的配置
```bash
# 修改以下变量为实际值
APP_NAME="todo-app"
REGISTRY="your-registry.com"
```

2. 添加执行权限并运行部署脚本
```bash
chmod +x deploy.sh
./deploy.sh
```

## 部署架构

本应用采用 Docker 容器化部署，使用 Nginx 作为 Web 服务器。主要组件包括：

- 前端应用（React + TypeScript）
- Nginx 服务器（处理静态资源和路由）
- Docker 容器（应用运行环境）

## 配置说明

### Nginx 配置

主要配置文件位于 `nginx.conf`，包含：
- 静态资源缓存策略
- SPA 路由支持
- 安全相关配置

### Docker 配置

Dockerfile 采用多阶段构建：
1. 构建阶段：使用 Node.js 环境构建应用
2. 运行阶段：使用 Nginx 运行构建后的静态文件

## 注意事项

1. 部署前检查项
   - 确保所有环境变量配置正确
   - 验证构建产物是否完整
   - 检查 Docker 镜像仓库权限

2. 安全建议
   - 定期更新依赖包
   - 使用安全的镜像仓库
   - 配置适当的防火墙规则

3. 性能优化
   - 启用 Nginx 缓存
   - 优化静态资源
   - 合理配置容器资源限制

## 常见问题

1. 构建失败
   - 检查 Node.js 版本是否符合要求
   - 确认是否有完整的依赖安装权限
   - 验证构建脚本配置是否正确

2. 容器启动失败
   - 检查端口是否被占用
   - 确认容器运行权限
   - 查看容器日志排查问题

3. 访问应用失败
   - 验证防火墙配置
   - 检查 Nginx 配置是否正确
   - 确认容器网络设置

## 回滚策略

如需回滚到之前版本：

1. 使用 Docker 镜像回滚
```bash
# 停止当前容器
docker stop todo-app
docker rm todo-app

# 运行指定版本镜像
docker run -d \
    --name todo-app \
    -p 80:80 \
    --restart unless-stopped \
    todo-app:<previous-tag>
```

2. 使用部署脚本回滚
```bash
# 切换到指定 Git 提交
git checkout <commit-hash>

# 重新运行部署脚本
./deploy.sh
```

## 监控和维护

1. 容器健康检查
   - 定期检查容器状态
   - 监控资源使用情况
   - 设置自动重启策略

2. 日志管理
   - 配置日志轮转
   - 实施日志监控
   - 定期清理旧日志

3. 性能监控
   - 监控应用响应时间
   - 跟踪资源使用率
   - 设置告警阈值

## 更新记录

- 2024-02-20: 初始版本
  - 创建基础部署文档
  - 添加 Docker 部署支持
  - 配置 Nginx 服务器