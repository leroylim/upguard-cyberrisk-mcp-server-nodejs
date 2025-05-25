# 🐳 Docker Setup for GitHub Container Registry

## 📋 Prerequisites

1. **GitHub Personal Access Token (PAT)**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Create a token with these scopes:
     - `write:packages` (to push packages)
     - `read:packages` (to pull packages)
     - `delete:packages` (optional)

2. **Docker installed and running**

## 🔧 Setup Instructions

### 1. **Configure Environment Variables**

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set:
```bash
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_USERNAME=your_github_username
GITHUB_REPOSITORY=your_username/upguard-cyberrisk-mcp-server
```

### 2. **Local Docker Commands**

#### **Linux/macOS:**
```bash
# Build and push to GitHub Container Registry
npm run docker:build-ghcr

# Or manually:
bash docker-build-push.sh
```

#### **Windows:**
```powershell
# Build and push to GitHub Container Registry
npm run docker:build-ghcr:win

# Or manually:
powershell -ExecutionPolicy Bypass -File docker-build-push.ps1
```

### 3. **Manual Docker Commands**

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Build the image
docker build -t ghcr.io/$GITHUB_USERNAME/upguard-cyberrisk-mcp-server:latest .

# Push the image
docker push ghcr.io/$GITHUB_USERNAME/upguard-cyberrisk-mcp-server:latest
```

### 4. **GitHub Actions (Automatic)**

The Docker workflow (`.github/workflows/docker.yml`) automatically:
- Builds and pushes on every push to main/develop
- Creates multi-platform images (amd64, arm64)
- Uses the built-in `GITHUB_TOKEN` (no setup needed)

## 🔐 Security Best Practices

### **Local Development:**
- Store PAT in `.env` file (never commit this file)
- Use environment variables: `export GITHUB_TOKEN=your_token`

### **CI/CD (GitHub Actions):**
- Uses built-in `GITHUB_TOKEN` automatically
- No manual token setup required

### **Production:**
- Use GitHub Actions for automated builds
- Enable package visibility settings in GitHub

## 📦 Using the Docker Image

### **Pull and Run:**
```bash
# Pull the image
docker pull ghcr.io/your_username/upguard-cyberrisk-mcp-server:latest

# Run the container
docker run -p 3000:3000 --env-file .env ghcr.io/your_username/upguard-cyberrisk-mcp-server:latest
```

### **Docker Compose:**
```yaml
version: '3.8'
services:
  upguard-mcp:
    image: ghcr.io/your_username/upguard-cyberrisk-mcp-server:latest
    ports:
      - "3000:3000"
    env_file:
      - .env
```

## 🚀 Available Scripts

- `npm run docker:build-ghcr` - Build and push (Linux/macOS)
- `npm run docker:build-ghcr:win` - Build and push (Windows)
- `npm run docker:login` - Login to GHCR (Linux/macOS)
- `npm run docker:login:win` - Login to GHCR (Windows)

## 🔍 Troubleshooting

### **Authentication Issues:**
```bash
# Check if token is set
echo $GITHUB_TOKEN

# Test login
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
```

### **Permission Issues:**
- Ensure PAT has `write:packages` scope
- Check repository visibility settings
- Verify username is correct

### **Build Issues:**
- Ensure Docker is running
- Check Dockerfile syntax
- Verify all dependencies are available
```

## 📚 Additional Resources

- [GitHub Container Registry Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Docker Guide](https://docs.github.com/en/actions/publishing-packages/publishing-docker-images)
