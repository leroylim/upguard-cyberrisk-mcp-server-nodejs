# Docker Build and Push Script for GitHub Container Registry (PowerShell)

# Load environment variables from .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

# Set default values if not provided
$GITHUB_USERNAME = if ($env:GITHUB_USERNAME) { $env:GITHUB_USERNAME } else { "your_username" }
$DOCKER_REGISTRY = if ($env:DOCKER_REGISTRY) { $env:DOCKER_REGISTRY } else { "ghcr.io" }
$DOCKER_IMAGE_NAME = if ($env:DOCKER_IMAGE_NAME) { $env:DOCKER_IMAGE_NAME } else { "upguard-cyberrisk-mcp-server" }
$DOCKER_IMAGE_TAG = if ($env:DOCKER_IMAGE_TAG) { $env:DOCKER_IMAGE_TAG } else { "latest" }

# Full image name - using proper PowerShell variable syntax
$FULL_IMAGE_NAME = "${DOCKER_REGISTRY}/${GITHUB_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"

Write-Host "🐳 Building Docker image: $FULL_IMAGE_NAME" -ForegroundColor Blue

# Build the Docker image
docker build -t $FULL_IMAGE_NAME .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Docker image built successfully" -ForegroundColor Green

# Check if GITHUB_TOKEN is set
if (-not $env:GITHUB_TOKEN) {
    Write-Host "⚠️  GITHUB_TOKEN not set. Please set it to push to GitHub Container Registry." -ForegroundColor Yellow
    Write-Host "   You can set it in your .env file or as an environment variable." -ForegroundColor Yellow
    exit 1
}

Write-Host "🔐 Logging in to GitHub Container Registry..." -ForegroundColor Blue

# Login to GitHub Container Registry
$env:GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker login failed" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing Docker image to GitHub Container Registry..." -ForegroundColor Blue

# Push the image
docker push $FULL_IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker push failed" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Docker image pushed successfully to $FULL_IMAGE_NAME" -ForegroundColor Green
