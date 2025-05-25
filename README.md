# UpGuard CyberRisk MCP Server

A production-ready Model Context Protocol (MCP) server for interacting with the UpGuard CyberRisk API, providing comprehensive risk assessment and management capabilities with enterprise-grade resilience patterns.

## 🚀 Features

- **Risk Management**: Get available risks, risk details, account risks, and vendor-specific risks
- **Vendor Monitoring**: Monitor vendors, manage vendor tiers, and track vendor security scores
- **Domain Management**: Add/remove domains, get domain details, and manage domain labels
- **IP Management**: Monitor IP addresses, manage IP ranges, and track IP-based risks
- **Breach Monitoring**: Track data breaches and compromised identities
- **Report Generation**: Generate and download security reports
- **Webhook Management**: Configure webhooks for real-time notifications
- **Organization Management**: Manage organization settings and preferences
- **Notification System**: Handle security notifications and alerts
- **Label Management**: Create and manage labels for categorization
- **Vulnerability Tracking**: Monitor and track security vulnerabilities
- **Typosquat Detection**: Detect and monitor typosquatting domains
- **Questionnaire Management**: Manage security questionnaires and responses
- **Subsidiary Management**: Track and manage subsidiary organizations
- **Bulk Operations**: Perform bulk operations on domains and IPs

## 🏗️ Enterprise-Grade Enhancements

### **New Implementation Features**
- **🔧 Enhanced Configuration Management**: Centralized, validated configuration with environment overrides
- **📊 Advanced Telemetry System**: Prometheus-compatible metrics with custom alerts and system monitoring
- **🔒 Security Framework**: API key validation, input sanitization, rate limiting, and audit logging
- **📖 Auto-Generated Documentation**: OpenAPI 3.0 specs with interactive Swagger UI

### **Core Architecture Features**
- **🔄 Retry Logic**: Exponential backoff with jitter for transient failures
- **⚡ Circuit Breaker**: Automatic failure detection and recovery
- **💾 Intelligent Caching**: Multi-tier caching with LRU eviction and TTL
- **📊 Rate Limiting**: Configurable rate limits per endpoint type
- **🔍 Health Monitoring**: Real-time health checks and metrics
- **📝 Structured Logging**: Winston-based logging with multiple transports
- **🛡️ Security**: ESLint security rules and input validation
- **🐳 Containerization**: Docker support with multi-stage builds
- **🔧 CI/CD**: GitHub Actions pipeline with automated testing and deployment

### Technology Stack
- **MCP SDK**: Latest Model Context Protocol SDK (v1.11.3)
- **Node.js**: >= 18.0.0 with modern JavaScript features
- **Type Safety**: Zod schemas for parameter validation
- **Testing**: Jest with comprehensive coverage requirements
- **Code Quality**: ESLint + Prettier with security plugins
- **Containerization**: Docker with Alpine Linux for security

## 📚 Documentation

### Quick Start
- **[Quickstart Guide](./docs/quick-start.md)** - Get up and running in minutes with step-by-step setup and MCP client integration

### Comprehensive Guides  
- **[Complete Implementation Guide](./docs/implementation-guide.md)** - Comprehensive guide to all enhanced systems and how to use them
- **[Quick Reference Guide](./docs/quick-reference.md)** - Fast reference for developers with common patterns and examples
- **[API Usage Examples](./docs/api-examples.md)** - Real-world integration examples and complete scenarios

### Strategic Planning
- **[Recommended Improvements](./docs/recommended-improvements.md)** - Strategic roadmap with 16-week implementation plan and ROI analysis
- **[Schema Architecture Summary](./docs/schema-implementation.md)** - Details on the centralized schema system

### 🔧 Technical Specifications
- **[Enhanced Configuration](./src/config/enhanced.js)** - Zod-validated configuration management system
- **[Telemetry System](./src/utils/telemetry.js)** - Prometheus-compatible metrics and monitoring
- **[Security Framework](./src/security/index.js)** - Enterprise security with validation and audit logging
- **[Documentation Generator](./src/utils/doc-generator.js)** - OpenAPI 3.0 documentation automation

### 📊 Monitoring & Operations
- **Health Endpoint**: `http://localhost:3000/health` - Comprehensive health and system metrics
- **Metrics Endpoint**: `http://localhost:3000/metrics` - Prometheus format metrics
- **API Documentation**: `http://localhost:3000/docs` - Interactive Swagger UI documentation

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- Docker (optional, for containerized deployment)

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd cyberrisk-upguard-mcp-server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your UpGuard API credentials
```

**⚠️ SECURITY IMPORTANT**: Never commit your `.env` file or hardcode API keys in source code. The `.env` file is already in `.gitignore` for security.

4. Configure your UpGuard API key:
```bash
# In your .env file, set:
UPGUARD_API_KEY=your-actual-upguard-api-key-here
```

5. Start development server:
```bash
npm run dev
```

### Docker Deployment

#### Development
```bash
# Build and run development environment
npm run docker:dev
```

#### Production
```bash
# Build production image
npm run docker:build

# Run production container
npm run docker:prod
```

#### Using Docker Compose
```bash
# Production deployment
docker-compose up -d

# Development with hot reload
docker-compose --profile dev up
```

## ⚙️ Configuration

Create a `.env` file with the following variables:

```env
# Required
UPGUARD_API_KEY=your_upguard_api_key_here

# Optional (with defaults)
UPGUARD_API_BASE_URL=https://cyber-risk.upguard.com/api/public
UPGUARD_API_TIMEOUT=120000
NODE_ENV=production
LOG_LEVEL=info
```

### Advanced Configuration

The server supports extensive configuration options:

- **Cache Settings**: TTL and size limits for different data types
- **Rate Limiting**: Configurable limits per endpoint category
- **Retry Logic**: Attempt counts, delays, and backoff factors
- **Circuit Breaker**: Failure thresholds and recovery timeouts
- **Health Checks**: Monitoring intervals and thresholds

See `.env.example` for complete configuration options.

## 🚀 Usage

### Starting the Server

```bash
# Production
npm start

# Development with hot reload
npm run dev

# Development with file watching
npm run dev:watch
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# CI/CD testing (no watch, coverage required)
npm run test:ci
```

### Code Quality

```bash
# Linting
npm run lint              # Check for issues
npm run lint:fix          # Auto-fix issues
npm run lint:check        # Strict checking (CI)

# Formatting
npm run format            # Format code
npm run format:check      # Check formatting

# Security & Dependencies
npm run security:check    # Security audit
npm run deps:check        # Check outdated deps
npm run validate          # Run all checks
```

### Monitoring & Maintenance

```bash
# Health check
npm run health

# Cache management
npm run cache:clear

# Metrics
npm run metrics
```

## 🔧 Development

### Project Structure

```
cyberrisk-upguard-mcp-server/
├── src/                 # Source code
│   ├── api/             # API client modules with caching
│   ├── tools/           # MCP tool definitions
│   │   ├── schemas/     # Centralized validation schemas
│   │   │   ├── index.js # Schema definitions
│   │   │   ├── documentation.md    # Usage guidelines
│   │   │   └── swagger-compliance-guide.md  # Implementation details
│   │   ├── vendors.js   # Vendor management tools
│   │   ├── risks.js     # Risk assessment tools
│   │   └── questionnaires.js # Security questionnaire tools
│   ├── utils/           # Utility functions (retry, cache, health)
│   ├── config/          # Configuration management
│   ├── security/        # Security-related modules
│   └── __tests__/       # Jest test files
├── docs/                # 📚 Documentation (organized)
│   ├── readme.md        # Documentation index
│   ├── quick-start.md   # Quick setup guide
│   ├── implementation-guide.md # Detailed implementation
│   ├── testing-guide.md # Testing framework
│   ├── api-examples.md  # API usage examples
│   └── ...              # Additional documentation
├── scripts/             # 🚀 Utility scripts (organized)
│   ├── readme.md        # Scripts documentation
│   ├── start-stdio.sh   # Unix stdio mode
│   ├── start-http.sh    # Unix HTTP mode
│   ├── start-stdio.ps1  # Windows stdio mode
│   └── start-http.ps1   # Windows HTTP mode
├── examples/            # Usage examples
├── .github/             # CI/CD workflows
├── coverage/            # Test coverage reports
├── logs/                # Application logs
├── docker-compose.yml   # Container orchestration
├── Dockerfile           # Multi-stage container build
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

### Schema Architecture & Validation

The server implements a **hybrid schema approach** that balances consistency, maintainability, and readability:

#### 🎯 Centralized Schemas (High-Value Validation)
Located in `src/tools/schemas/index.js`, these schemas ensure consistency across tools:

```javascript
// Business-critical validation patterns
vendorHostname: z.string().min(1).max(253).regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/)
vendorTier: z.number().int().min(1).max(3)
severity: z.enum(["info", "low", "medium", "high", "critical"])
labels: z.array(z.string().min(1).max(50).regex(/^[a-zA-Z0-9_-]+$/)).max(10)
```

**Used for:**
- Complex validation logic (hostnames, emails, dates)
- Business rules (severity levels, tier constraints)
- Cross-tool consistency (vendor IDs, labels)
- Frequently reused patterns (pagination, date ranges)

#### 📝 Inline Schemas (Tool-Specific Validation)
Simple validations remain inline for immediate readability:

```javascript
// Tool-specific, self-documenting validation
scan_type: z.string().optional().describe('Type of scan results to retrieve')
include_responses: z.boolean().optional().describe('Include questionnaire responses')
```

**Used for:**
- Tool-specific parameters (scan types, report formats)
- Simple validations (basic strings, optional flags)
- Single-use fields (custom tool options)

#### 🔍 Schema Benefits

1. **Consistency**: All vendor hostnames validated identically across 15+ tools
2. **Maintainability**: Business rule changes in one location
3. **Error Quality**: Descriptive validation messages prevent common errors
4. **Type Safety**: Runtime validation prevents invalid API calls
5. **Developer Experience**: Clear parameter expectations and IDE support

#### 📚 Schema Documentation

- **Usage Guidelines**: `src/tools/schemas/documentation.md`
- **Migration Details**: `src/tools/schemas/migration-guide.md` 
- **Best Practices**: When to use centralized vs inline schemas
- **Examples**: Real-world usage patterns and migration strategies

### Adding New Features

1. **Create API Module**: Add endpoint functions in `src/api/`
2. **Define Tools**: Create tool definitions in `src/tools/`
3. **Choose Schema Strategy**: Use centralized schemas for business rules, inline for tool-specific validation
4. **Add Tests**: Write comprehensive tests in `src/__tests__/`
5. **Update Documentation**: Document new features in README
6. **Validate**: Run `npm run validate` to ensure quality

### Testing Strategy

- **Unit Tests**: Mock external dependencies
- **Integration Tests**: Test API interactions
- **Schema Validation**: Test both valid and invalid inputs
- **Coverage Requirements**: 70% minimum across all metrics
- **Security Testing**: Automated vulnerability scanning
- **Performance Testing**: Load testing capabilities

## 🐳 Deployment

### Production Checklist

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Health checks enabled
- [ ] Monitoring configured
- [ ] Log aggregation setup
- [ ] Backup strategies in place

### Container Deployment

The application is designed for container deployment with:

- **Multi-stage builds** for optimized image size
- **Non-root user** for security
- **Health checks** built-in
- **Graceful shutdown** handling
- **Resource limits** respected

### CI/CD Pipeline

Automated pipeline includes:

1. **Code Quality**: Linting, formatting, security checks
2. **Testing**: Unit, integration, and coverage tests
3. **Security**: Dependency and vulnerability scanning
4. **Build**: Docker image creation and registry push
5. **Deploy**: Automated deployment to staging/production
6. **Release**: Automatic release creation and tagging

## 📊 Monitoring

### Health Checks

Built-in health monitoring includes:

- **System Resources**: Memory, CPU, disk usage
- **Application Metrics**: Request counts, error rates
- **API Connectivity**: UpGuard API availability
- **Cache Performance**: Hit rates, eviction counts
- **Circuit Breaker Status**: Service availability

### Metrics

Available metrics:

- Request/response times
- Error rates by endpoint
- Cache hit/miss ratios
- Rate limiting statistics
- Circuit breaker state changes

## 🛡️ Security

### Security Features

- **Input Validation**: Zod schema validation
- **Rate Limiting**: Prevents API abuse
- **Error Handling**: No sensitive data leakage
- **Dependency Scanning**: Automated vulnerability checks
- **Security Linting**: ESLint security plugin
- **Container Security**: Non-root user, minimal base image

### Best Practices

- Regular security audits
- Dependency updates
- Secret management
- Access logging
- Network security

## API Coverage

The server provides access to the following UpGuard CyberRisk API endpoints:

### Risk Management
- `upguard_get_available_risks_v2` - Get all available risk types
- `upguard_get_risk_details` - Get details for a specific risk
- `upguard_get_account_risks` - Get risks for your account
- `upguard_get_account_risks_diff` - Get risk changes over time
- `upguard_get_vendor_risks` - Get risks for a specific vendor
- `upguard_get_vendor_risks_diff` - Get vendor risk changes

### Vendor Management
- `upguard_get_monitored_vendors` - List all monitored vendors
- `upguard_get_vendor_details` - Get detailed vendor information
- `upguard_start_monitoring_vendor` - Start monitoring a new vendor
- `upguard_stop_monitoring_vendor` - Stop monitoring a vendor
- `upguard_update_vendor_tier` - Update vendor tier level
- `upguard_get_vendor_score_history` - Get vendor score history
- `upguard_get_vendor_scan_results` - Get vendor scan results
- `upguard_bulk_vendor_operations` - Perform bulk vendor operations

### Domain Management
- `upguard_get_account_domains` - List account domains
- `upguard_add_domain` - Add domain for monitoring
- `upguard_remove_domain` - Remove domain from monitoring
- `upguard_get_domain_details` - Get domain details
- `upguard_bulk_add_domains` - Add multiple domains
- `upguard_bulk_remove_domains` - Remove multiple domains

### IP Management
- `upguard_get_account_ips` - List account IP addresses
- `upguard_add_ip` - Add IP for monitoring
- `upguard_remove_ip` - Remove IP from monitoring
- `upguard_get_ip_details` - Get IP details
- `upguard_get_ip_ranges` - Get IP ranges
- `upguard_bulk_add_ips` - Add multiple IPs
- `upguard_bulk_remove_ips` - Remove multiple IPs

### Additional Features
- **Breach Monitoring**: Track data breaches and compromised identities
- **Report Generation**: Generate security reports in various formats
- **Webhook Management**: Configure real-time notifications
- **Organization Management**: Manage organization settings
- **Notification System**: Handle security alerts
- **Label Management**: Organize assets with labels
- **Vulnerability Tracking**: Monitor security vulnerabilities
- **Typosquat Detection**: Detect domain typosquatting
- **Questionnaire Management**: Manage security assessments
- **Subsidiary Management**: Track subsidiary organizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Run the validation suite (`npm run validate`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Standards

- **Code Style**: Prettier + ESLint with security plugins
- **Testing**: Minimum 70% coverage required
- **Documentation**: Update README for new features
- **Security**: Run security checks before commits
- **Performance**: Consider caching and resilience patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ **Commercial Use** - Use in commercial projects
- ✅ **Modification** - Modify and distribute modified versions
- ✅ **Distribution** - Distribute original or modified versions
- ✅ **Private Use** - Use privately without restrictions
- ❗ **Liability** - No warranty or liability provided
- ❗ **Attribution** - Must include copyright notice and license

**Built with ❤️ for enterprise security teams**

## 🆘 Support

- **Documentation**: This README and inline code comments
- **Issues**: [GitHub Issues](https://github.com/leroylim/upguard-cyberrisk-mcp-server-nodejs/issues)
- **UpGuard API**: [Official API Documentation](https://cyber-risk.upguard.com/api/docs)
- **MCP Protocol**: [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## 🔄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## Transport Modes

This MCP server supports two transport modes with cross-platform compatibility:

### STDIO Transport (Default)
The traditional mode for command-line integrations and direct process communication.

```bash
# Default STDIO mode
npm start

# Platform-specific explicit STDIO mode
npm run start:stdio      # Windows (PowerShell)
npm run start:stdio:sh   # Linux/macOS (Bash)

# For development with hot reload
npm run dev:stdio
```

### HTTP Streamable Transport
Modern HTTP-based transport that supports both session management and stateless modes.

#### With Session Management (Default for HTTP)
```bash
# Platform-specific HTTP mode
npm run start:http       # Windows (PowerShell)
npm run start:http:sh    # Linux/macOS (Bash)

# For development with hot reload
npm run dev:http
```

#### Stateless Mode
```bash
# HTTP stateless mode (new server instance per request)
npm run start:http-stateless

# Custom port and host
npm run start:http-custom
```

### Cross-Platform Compatibility

#### Windows Users
```powershell
# PowerShell scripts with proper environment handling
npm run start:stdio      # Uses start-stdio.ps1
npm run start:http       # Uses start-http.ps1

# Or run scripts directly
.\start-http.ps1
.\start-stdio.ps1
```

#### Linux/macOS Users
```bash
# Bash scripts with proper environment handling
npm run start:stdio:sh   # Uses start-stdio.sh
npm run start:http:sh    # Uses start-http.sh

# Or run scripts directly (after chmod +x)
./start-http.sh
./start-stdio.sh

# Traditional environment variable approach also works
MCP_TRANSPORT_MODE=http node src/index.js
MCP_TRANSPORT_MODE=stdio node src/index.js
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MCP_TRANSPORT_MODE` | Transport mode: `stdio` or `http` | `stdio` |
| `MCP_HTTP_PORT` | HTTP server port | `3000` |
| `MCP_HTTP_HOST` | HTTP server host | `localhost` |
| `MCP_SESSION_MANAGEMENT` | Enable session management for HTTP | `false` |

### HTTP Endpoints

When running in HTTP mode, the following endpoints are available:

- **POST /mcp** - Main MCP communication endpoint
- **GET /mcp** - Server-to-client notifications (session mode only)
- **DELETE /mcp** - Session termination (session mode only)
- **GET /health** - Health check endpoint

### Testing HTTP Transport

To test the HTTP transport:

1. Start the server: `npm run start:http` (Windows) or `npm run start:http:sh` (Linux/macOS)
2. Test the client: `npm run test:http-client`
3. Or run both together: `npm run demo:http`

### Client Connection Examples

#### STDIO
```javascript
const transport = new StdioClientTransport({
  command: "node",
  args: ["src/index.js"]
});
```

#### HTTP
```javascript
const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/mcp")
);
```

### Session Management vs Stateless

- **Session Management**: Maintains state across requests, supports server-to-client notifications
- **Stateless**: Each request creates a new server instance, better for horizontal scaling

### Transport Selection Guide

**Use STDIO when:**
- Building command-line tools
- Direct process communication needed
- Working with shell scripts
- Integrating with local applications

**Use HTTP when:**
- Remote server deployment
- Web-based integrations
- Multiple concurrent clients
- Need for load balancing
- RESTful API patterns

## Schema Architecture

### Schema Usage and Validation

The server uses a robust schema validation system built on [Zod](https://zod.dev/) for type-safe parameter validation.

#### Centralized Schemas (`src/tools/schemas/index.js`)

Common reusable schemas are defined centrally and used primarily in **prompt definitions**:

```javascript
// Examples of centralized schemas
vendorHostname: z.string()
  .regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, "Invalid hostname format")

severity: z.enum(["info", "low", "medium", "high", "critical"])

labels: z.array(z.string()).max(10, "Maximum 10 labels allowed")

timeRange: z.object({
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional()
})
```

#### Schema Usage Locations

1. **Prompt Definitions** (`src/index.js`):
   - `upguard_get_my_organization_risks` - Uses `schemas.severity`
   - `upguard_monitor_new_vendor` - Uses `schemas.vendorHostname`, `schemas.labels`
   - `upguard_assess_vendor_risks` - Uses `schemas.vendorHostname`, `schemas.timeRange`, `schemas.riskFilters`
   - `upguard_manage_domains` - Uses `schemas.labels`

2. **Individual Tools** (`src/tools/*.js`):
   - Each tool defines its own inline Zod schemas for parameter validation
   - Tools could be improved to reuse centralized schemas

#### Available Schema Types

- **`vendorHostname`** - Validated hostname format for vendors
- **`subsidiaryHostname`** - Validated hostname format for subsidiaries  
- **`labels`** - Array of categorization labels (max 10, alphanumeric + underscore/hyphen)
- **`severity`** - Risk severity levels (info, low, medium, high, critical)
- **`dateYYYYMMDD`** - Date validation in YYYY-MM-DD format
- **`recipient`** - Questionnaire recipient details with email validation
- **`ipAddress`** - IPv4 address validation
- **`pagination`** - Page/limit parameters for paginated results
- **`timeRange`** - Start/end datetime range for queries
- **`riskFilters`** - Complex filtering for risk queries

#### Schema Benefits

✅ **Type Safety** - Compile-time and runtime type checking  
✅ **Input Validation** - Automatic parameter validation with descriptive errors  
✅ **Documentation** - Schema descriptions provide built-in parameter documentation  
✅ **Consistency** - Reusable schemas ensure consistent validation across tools  
✅ **Error Handling** - Clear error messages for invalid inputs

---

**Built with ❤️ for enterprise security teams** 