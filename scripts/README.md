# 🚀 Scripts Directory

This directory contains utility scripts for running the UpGuard CyberRisk MCP Server.

## 📜 Available Scripts

### Unix/Linux/macOS Scripts

- **[start-stdio.sh](./start-stdio.sh)** - Start server in stdio mode (Unix/Linux/macOS)
- **[start-http.sh](./start-http.sh)** - Start server in HTTP mode (Unix/Linux/macOS)

### Windows Scripts

- **[start-stdio.ps1](./start-stdio.ps1)** - Start server in stdio mode (Windows PowerShell)
- **[start-http.ps1](./start-http.ps1)** - Start server in HTTP mode (Windows PowerShell)

## 🎯 Usage

### For Unix/Linux/macOS:
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Start in stdio mode
./scripts/start-stdio.sh

# Start in HTTP mode
./scripts/start-http.sh
```

### For Windows:
```powershell
# Start in stdio mode
.\scripts\start-stdio.ps1

# Start in HTTP mode
.\scripts\start-http.ps1
```

## 📋 Script Details

### stdio Mode
- **Purpose**: Direct communication via standard input/output
- **Use Case**: Integration with MCP clients that support stdio transport
- **Port**: Not applicable (uses stdin/stdout)

### HTTP Mode
- **Purpose**: HTTP server for REST API access
- **Use Case**: Web applications, testing, and HTTP-based integrations
- **Port**: 3000 (configurable via environment variables)

## ⚙️ Configuration

All scripts respect environment variables:
- `UPGUARD_API_KEY` - Your UpGuard API key
- `PORT` - HTTP server port (HTTP mode only)
- `NODE_ENV` - Environment (development/production)

## 🔧 Customization

You can modify these scripts to:
- Change default ports
- Add additional environment variables
- Include custom startup logic
- Add logging configurations

---

**Built with ❤️ for enterprise security teams** 