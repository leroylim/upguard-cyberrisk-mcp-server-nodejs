#!/bin/bash
# Docker Build and Push Script for GitHub Container Registry

set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Set default values if not provided
GITHUB_USERNAME=${GITHUB_USERNAME:-"your_username"}
DOCKER_REGISTRY=${DOCKER_REGISTRY:-"ghcr.io"}
DOCKER_IMAGE_NAME=${DOCKER_IMAGE_NAME:-"upguard-cyberrisk-mcp-server"}
DOCKER_IMAGE_TAG=${DOCKER_IMAGE_TAG:-"latest"}

# Full image name
FULL_IMAGE_NAME="${DOCKER_REGISTRY}/${GITHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

echo "🐳 Building Docker image: ${FULL_IMAGE_NAME}"

# Build the Docker image
docker build -t "${FULL_IMAGE_NAME}" .

echo "✅ Docker image built successfully"

# Check if GITHUB_TOKEN is set
if [ -z "${GITHUB_TOKEN}" ]; then
  echo "⚠️  GITHUB_TOKEN not set. Please set it to push to GitHub Container Registry."
  echo "   You can set it in your .env file or as an environment variable."
  exit 1
fi

echo "🔐 Logging in to GitHub Container Registry..."

# Login to GitHub Container Registry
echo "${GITHUB_TOKEN}" | docker login ghcr.io -u "${GITHUB_USERNAME}" --password-stdin

echo "📤 Pushing Docker image to GitHub Container Registry..."

# Push the image
docker push "${FULL_IMAGE_NAME}"

echo "🎉 Docker image pushed successfully to ${FULL_IMAGE_NAME}"
