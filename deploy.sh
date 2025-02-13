#!/bin/bash

# 配置变量
APP_NAME="todo-app"
REGISTRY="codehourra"
IMAGE_NAME="$REGISTRY/$APP_NAME"
IMAGE_TAG=$(git rev-parse --short HEAD)

# 构建 Docker 镜像
echo "开始构建 Docker 镜像..."
docker build -t $IMAGE_NAME:$IMAGE_TAG .

# 推送镜像到镜像仓库
echo "推送镜像到仓库..."
docker push $IMAGE_NAME:$IMAGE_TAG
docker tag $IMAGE_NAME:$IMAGE_TAG $IMAGE_NAME:latest
docker push $IMAGE_NAME:latest

# 更新服务
echo "更新服务..."
if docker ps -a | grep -q $APP_NAME; then
    echo "停止并删除旧容器..."
    docker stop $APP_NAME
    docker rm $APP_NAME
fi

echo "启动新容器..."
docker run -d \
    --name $APP_NAME \
    -p 5173:5173 \
    --restart unless-stopped \
    $IMAGE_NAME:$IMAGE_TAG

echo "部署完成！"