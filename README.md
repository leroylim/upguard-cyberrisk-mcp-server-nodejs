# UpGuard CyberRisk MCP Server

A Model Context Protocol (MCP) server for integrating with UpGuard's CyberRisk API. This server provides comprehensive security risk assessment and management capabilities through a standardized interface.

## Features

- **67 API Tools** across 13 categories for comprehensive security management
- **14 Enhanced Prompts** including 8 advanced workflow prompts for complex operations
- **Real-time Risk Assessment** with vendor monitoring and breach detection
- **Automated Documentation Generation** with multiple output formats
- **Interactive API Explorer** with Swagger UI and Redoc interfaces
- **Comprehensive Schema Validation** with 22 Zod schema definitions
- **CI/CD Integration** with automated documentation deployment

## Enhanced Prompts (New in v1.3.0)

The server now includes **14 comprehensive prompts** (6 original + 8 enhanced) that provide guided workflows for complex security operations:

### 🔴 **Risk Management Prompts**
- `upguard_comprehensive_risk_assessment` - Complete risk assessment workflows
- `upguard_risk_trend_analysis` - Multi-period risk trend analysis

### 📊 **Compliance & Reporting**
- `upguard_compliance_reporting_suite` - Automated compliance report generation

### 🌐 **Asset Management**
- `upguard_domain_lifecycle_management` - Complete domain lifecycle workflows
- `upguard_bulk_asset_management` - Large-scale asset management operations
- `upguard_network_security_assessment` - Comprehensive network security analysis

### 🪝 **Operations & Monitoring**
- `upguard_setup_comprehensive_alerting` - Complete alerting infrastructure setup
- `upguard_security_dashboard_setup` - Role-based security dashboard configuration

**Benefits:**
- **Step-by-step guidance** for complex security workflows
- **Multi-tool orchestration** combining multiple API endpoints
- **Role-based workflows** for different stakeholders (CISO, analysts, compliance)
- **Best practices integration** with built-in security recommendations

📖 **See [ENHANCED_PROMPTS.md](./ENHANCED_PROMPTS.md) for detailed documentation and examples.**

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- UpGuard CyberRisk API credentials

### Installation

```bash
git clone https://github.com/leroylim/upguard-cyberrisk-mcp-server-nodejs.git
cd upguard-cyberrisk-mcp-server-nodejs
npm install
```

### Configuration

Create a `.env` file with your UpGuard credentials:

```env
UPGUARD_API_KEY=your_api_key_here
UPGUARD_SECRET_TOKEN=your_secret_token_here
```

### Running the Server

```bash
npm start
```

## MCP Configuration

To use this server with Claude Desktop or other MCP-compatible clients, you need to add it to your MCP configuration file.

### For Claude Desktop (Windows/Mac/Linux)

Add the following configuration to your `claude_desktop_config.json` file:

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
**Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Linux:** `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "upguard-mcp": {
      "command": "node",
      "args": [
        "/path/to/your/upguard-cyberrisk-mcp-server/src/index.js"
      ],
      "env": {
        "UPGUARD_API_KEY": "your_upguard_api_key_here"
      }
    }
  }
}
```

### For Cursor IDE

Add the following configuration to your `mcp.json` file in your Cursor settings directory:

**Windows:** `%APPDATA%\Cursor\User\mcp.json`
**Mac:** `~/Library/Application Support/Cursor/User/mcp.json`  
**Linux:** `~/.config/Cursor/User/mcp.json`

```json
{
  "mcpServers": {
    "upguard-mcp": {
      "command": "node",
      "args": [
        "/path/to/your/upguard-cyberrisk-mcp-server/src/index.js"
      ],
      "env": {
        "UPGUARD_API_KEY": "your_upguard_api_key_here"
      }
    }
  }
}
```

### Configuration Notes

- **Replace the path**: Update `/path/to/your/upguard-cyberrisk-mcp-server/src/index.js` with the actual path to your installation
- **Replace the API key**: Update `your_upguard_api_key_here` with your actual UpGuard API key
- **Server name**: You can change `upguard-mcp` to any name you prefer
- **Additional environment variables**: If you're using `UPGUARD_SECRET_TOKEN`, add it to the `env` section as well

### Getting Your UpGuard API Key

1. Log in to your UpGuard account
2. Navigate to **Settings** → **API Keys**
3. Create a new API key or use an existing one
4. Copy the key and paste it into your configuration

### Restart Required

After updating your MCP configuration, restart Claude Desktop or your IDE for the changes to take effect.

## Documentation System

This project features a comprehensive documentation generation system that creates multiple formats from the source code:

### 📚 Available Documentation Formats

- **📊 Interactive Documentation Hub** - Central navigation with statistics
- **🚀 Swagger UI** - Interactive API explorer for testing endpoints
- **📚 Redoc** - Beautiful, professional API documentation
- **📖 Markdown** - Human-readable documentation with examples
- **🔧 OpenAPI Specification** - Machine-readable API spec for tooling

### 🛠️ Documentation Commands

```bash
# Generate complete documentation pipeline
npm run docs:full

# Individual generation steps
npm run docs:extract      # Extract tools from source code
npm run docs:generate     # Generate OpenAPI and Markdown
npm run docs:html         # Generate HTML documentation
npm run docs:test         # Validate generated documentation

# Utility commands
npm run docs:clean        # Clean generated files
npm run docs:build        # Generate with mock fallback
```

### 📊 Documentation Statistics

- **67 API Tools** documented across 13 categories
- **22 Schema Definitions** with Zod validation
- **54 Tools with Schemas** (80% schema coverage)
- **195KB OpenAPI Specification** with comprehensive examples
- **37KB Markdown Documentation** with authentication guides

### 🌐 Viewing Documentation

After running `npm run docs:full`, open any of these files in your browser:

- **Documentation Hub**: `docs/generated/index.html`
- **Swagger UI**: `docs/generated/swagger.html`
- **Redoc**: `docs/generated/redoc.html`
- **Markdown**: `docs/generated/API.md`
- **OpenAPI Spec**: `docs/generated/openapi.json`

## API Categories

### 🛡️ Risk Management (10 tools)
- Get available risks and risk details
- Account and vendor risk monitoring
- Risk filtering and categorization

### 🏢 Vendor Management (16 tools)
- Monitor and manage vendor security
- Vendor risk assessments
- Bulk vendor operations

### 🌐 Domain Management (9 tools)
- Domain monitoring and analysis
- Subdomain discovery
- Domain risk assessment

### 🔍 IP Management (5 tools)
- IP address monitoring
- Network security analysis
- IP risk evaluation

### 📊 Report Generation (7 tools)
- Custom security reports
- Automated report scheduling
- Report data export

### 🚨 Breach Monitoring (2 tools)
- Data breach detection
- Breach impact analysis

### ⚡ Bulk Operations (6 tools)
- Batch processing capabilities
- Mass vendor updates
- Bulk data operations

### 🔗 Webhook Management (5 tools)
- Event notification setup
- Webhook configuration
- Real-time alerts

### 📋 Additional Categories
- **Questionnaire Management** (1 tool)
- **Typosquat Detection** (1 tool)
- **Label Management** (1 tool)
- **Notification Management** (1 tool)
- **General** (3 tools)

## Development

### Project Structure

```
├── src/
│   ├── tools/           # API tool implementations
│   │   ├── schemas/     # Zod schema definitions
│   │   ├── risks.js     # Risk management tools
│   │   ├── vendors.js   # Vendor management tools
│   │   └── ...          # Other tool categories
│   └── utils/
│       ├── doc-generator.js  # Documentation generator
│       └── logger.js         # Logging utility
├── scripts/
│   ├── extract-tools-direct.js  # Tool extraction
│   ├── generate-docs.js         # Documentation generation
│   ├── generate-html-docs.js    # HTML documentation
│   └── test-docs.js             # Documentation testing
├── docs/
│   ├── generated/       # Generated documentation
│   └── extracted-tools.json    # Extracted tool data
└── .github/workflows/
    └── docs.yml         # CI/CD documentation pipeline
```

### Adding New Tools

1. Create tool implementation in appropriate category file
2. Add schema definitions to `src/tools/schemas/index.js`
3. Run `npm run docs:full` to update documentation
4. Test with `npm run docs:test`

### Schema Validation

All tools use Zod schemas for input validation:

```javascript
const { z } = require('zod');
const { vendorHostname, labels } = require('./schemas');

// Tool with schema validation
server.tool('tool_name', 'Description', {
  hostname: vendorHostname,
  labels: labels.optional()
}, async (args) => {
  // Implementation
});
```

## CI/CD Integration

The project includes automated documentation generation via GitHub Actions:

- **Triggers**: Push to main/master, tool file changes, manual dispatch
- **Generates**: All documentation formats automatically
- **Deploys**: GitHub Pages with interactive documentation
- **Artifacts**: Documentation files with 30-day retention

## Testing

```bash
# Run all tests
npm test

# Lint code
npm run lint
npm run lint:fix

# Test documentation
npm run docs:test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tools with proper schemas
4. Update documentation with `npm run docs:full`
5. Test changes with `npm run docs:test`
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/leroylim/upguard-cyberrisk-mcp-server-nodejs/issues)
- **Documentation**: Available in multiple formats in `docs/generated/`
- **API Reference**: Interactive Swagger UI and Redoc interfaces

---

**UpGuard CyberRisk MCP Server** v1.2.0 | Licensed under MIT | [View Documentation](docs/generated/index.html) 