# 构建阶段
FROM node:20-alpine as builder

WORKDIR /app

# 首先复制 package.json 和 package-lock.json
COPY package*.json ./

# 设置 npm 缓存目录和其他优化选项
RUN npm config set cache /tmp/npm-cache && \
    npm ci --prefer-offline --no-audit

# 分层复制源代码，提高缓存利用率
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

# 构建应用
RUN npm run build

# 运行阶段 - 使用更小的 nginx 镜像
FROM nginx:alpine-slim

# 创建非 root 用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 配置 nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物到 Nginx 目录，并设置正确的权限
COPY --from=builder --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# 使用非 root 用户运行
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]