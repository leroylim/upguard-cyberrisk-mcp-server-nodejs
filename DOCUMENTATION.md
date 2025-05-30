# 📚 UpGuard CyberRisk MCP Server - Documentation Guide

This document provides a comprehensive guide to the documentation system implemented for the UpGuard CyberRisk MCP Server.

## 🎯 Overview

The UpGuard CyberRisk MCP Server features a state-of-the-art documentation generation system that automatically creates comprehensive, multi-format documentation from source code. The system extracts real tool definitions and schema information to generate professional-grade documentation suitable for developers, API consumers, and stakeholders.

## 📊 Documentation Statistics

- **🔧 67 API Tools** documented across 13 categories
- **📋 22 Schema Definitions** with Zod validation
- **🔗 54 Tools with Schemas** (80% schema coverage)
- **🌐 8 Documentation Formats** generated automatically
- **📄 387KB Total Documentation** with comprehensive examples
- **✅ 98% Quality Score** from automated validation

## 🛠️ Available Commands

### Core Documentation Commands

```bash
# Complete documentation pipeline (recommended)
npm run docs:all          # Extract + Generate + Export + Test + Validate

# Individual workflows
npm run docs:complete     # Extract + Generate + Export
npm run docs:full         # Extract + Generate + HTML
npm run docs:build-real   # Extract + Generate

# Individual steps
npm run docs:extract      # Extract tools from source code
npm run docs:generate     # Generate OpenAPI and Markdown
npm run docs:html         # Generate HTML documentation
npm run docs:export       # Export to Postman/Insomnia/Summary

# Testing and validation
npm run docs:test         # Test generated documentation
npm run docs:validate     # Validate documentation quality

# Utility commands
npm run docs:clean        # Clean generated files
npm run docs:build        # Generate with mock fallback
```

## 📄 Generated Documentation Formats

### 1. **📊 Interactive Documentation Hub** (`index.html`)
- **Purpose**: Central navigation and overview
- **Features**: Statistics dashboard, format navigation, responsive design
- **Size**: 7.0KB
- **Usage**: Open in browser for documentation portal

### 2. **🚀 Swagger UI** (`swagger.html`)
- **Purpose**: Interactive API testing and exploration
- **Features**: Try-it-out functionality, real-time testing, authentication support
- **Size**: 3.8KB
- **Usage**: Test API endpoints directly in browser

### 3. **📚 Redoc** (`redoc.html`)
- **Purpose**: Professional, clean API documentation
- **Features**: Beautiful layout, comprehensive schema docs, mobile-responsive
- **Size**: 594B (loads content from CDN)
- **Usage**: Share with stakeholders and developers

### 4. **📖 Markdown Documentation** (`API.md`)
- **Purpose**: Human-readable documentation with examples
- **Features**: Copy-paste examples, authentication guides, categorized endpoints
- **Size**: 37KB, 2,216 lines
- **Usage**: Include in repositories, wikis, and documentation sites

### 5. **🔧 OpenAPI Specification** (`openapi.json`)
- **Purpose**: Machine-readable API specification
- **Features**: OpenAPI 3.0 compliant, comprehensive schemas, validation rules
- **Size**: 195KB, 6,543 lines
- **Usage**: Generate client SDKs, import into tools, API validation

### 6. **📮 Postman Collection** (`postman-collection.json`)
- **Purpose**: Ready-to-import Postman collection
- **Features**: Pre-configured requests, environment variables, authentication
- **Size**: 77KB, 2,408 lines
- **Usage**: Import into Postman for immediate API testing

### 7. **🔮 Insomnia Workspace** (`insomnia-workspace.json`)
- **Purpose**: Ready-to-import Insomnia workspace
- **Features**: Organized requests, environment setup, authentication headers
- **Size**: 54KB, 1,603 lines
- **Usage**: Import into Insomnia for API development

### 8. **📊 API Summary** (`api-summary.json`)
- **Purpose**: Quick reference and statistics
- **Features**: Tool categorization, schema mapping, coverage metrics
- **Size**: 14KB, 398 lines
- **Usage**: Integration with other tools, quick reference

## 🏗️ System Architecture

### Documentation Generation Pipeline

```
Source Code (src/tools/*.js)
    ↓
Tool Extraction (scripts/extract-tools-direct.js)
    ↓
Schema Loading (src/tools/schemas/index.js)
    ↓
Documentation Generation (scripts/generate-docs.js)
    ↓
HTML Generation (scripts/generate-html-docs.js)
    ↓
Export Generation (scripts/export-docs.js)
    ↓
Testing & Validation (scripts/test-docs.js, scripts/validate-docs.js)
```

### Key Components

1. **Tool Extraction Engine**
   - Direct source code parsing using regex
   - Schema reference resolution
   - Category classification
   - Metadata extraction

2. **Documentation Generator**
   - OpenAPI 3.0 specification generation
   - Zod-to-OpenAPI schema conversion
   - Markdown documentation creation
   - Example generation

3. **HTML Documentation System**
   - Swagger UI integration with custom styling
   - Redoc integration for professional docs
   - Responsive documentation hub
   - Statistics and navigation

4. **Export System**
   - Postman collection generation
   - Insomnia workspace creation
   - API summary compilation
   - Multi-format support

5. **Testing & Validation Framework**
   - File existence and integrity checks
   - OpenAPI compliance validation
   - Documentation quality scoring
   - Coverage analysis

## 📋 Tool Categories

### 🛡️ Risk Management (10 tools)
- `upguard_get_available_risks_v2` - Get available risk types
- `upguard_get_account_risks` - Get account-level risks
- `upguard_get_vendor_risks` - Get vendor-specific risks
- `upguard_get_risk_details` - Get detailed risk information
- And 6 more risk management tools...

### 🏢 Vendor Management (16 tools)
- `upguard_list_monitored_vendors` - List all monitored vendors
- `upguard_get_vendor_details` - Get vendor information
- `upguard_add_vendor` - Add new vendor for monitoring
- `upguard_update_vendor` - Update vendor information
- And 12 more vendor management tools...

### 🌐 Domain Management (9 tools)
- `upguard_get_vendor_domains` - Get vendor domains
- `upguard_get_domain_details` - Get domain information
- `upguard_add_vendor_domain` - Add domain to vendor
- And 6 more domain management tools...

### 🔍 IP Management (5 tools)
- `upguard_get_vendor_ips` - Get vendor IP addresses
- `upguard_get_ip_details` - Get IP information
- And 3 more IP management tools...

### 📊 Report Generation (7 tools)
- `upguard_generate_vendor_report` - Generate vendor reports
- `upguard_get_report_status` - Check report status
- And 5 more reporting tools...

### 🚨 Breach Monitoring (2 tools)
- `upguard_get_data_breaches` - Get breach information
- `upguard_get_breach_details` - Get detailed breach data

### ⚡ Bulk Operations (6 tools)
- `upguard_bulk_add_vendors` - Bulk vendor addition
- `upguard_bulk_update_vendors` - Bulk vendor updates
- And 4 more bulk operation tools...

### 🔗 Webhook Management (5 tools)
- `upguard_list_webhooks` - List configured webhooks
- `upguard_create_webhook` - Create new webhook
- And 3 more webhook tools...

### 📋 Additional Categories
- **Questionnaire Management** (1 tool)
- **Typosquat Detection** (1 tool)
- **Label Management** (1 tool)
- **Notification Management** (1 tool)
- **General** (3 tools)

## 🔧 Schema Definitions

The system includes 22 comprehensive Zod schema definitions:

### Core Schemas
- `vendorHostname` - Validated hostname format
- `vendorId` - Vendor identifier validation
- `labels` - Categorization labels (max 10)
- `pagination` - Pagination parameters
- `dateRange` - Date range validation

### Data Type Schemas
- `email` / `emailArray` - Email validation
- `ipAddress` - IP address validation
- `dateTimeISO` / `dateYYYYMMDD` - Date format validation
- `severity` - Risk severity levels

### Business Logic Schemas
- `questionnaireId` / `questionnaireStatus` - Questionnaire handling
- `bulkOperationType` - Bulk operation types
- `vendorTier` - Vendor classification
- `riskFilters` - Risk filtering options

## 🚀 CI/CD Integration

### GitHub Actions Workflow (`.github/workflows/docs.yml`)

**Triggers:**
- Push to main/master branches
- Changes to tool files or documentation scripts
- Manual workflow dispatch

**Process:**
1. Extract tools from source code
2. Generate all documentation formats
3. Run comprehensive testing
4. Deploy to GitHub Pages
5. Create downloadable artifacts

**Outputs:**
- GitHub Pages deployment with interactive documentation
- Artifact packages with 30-day retention
- Automated quality validation reports

## 📈 Quality Metrics

### Validation Scores
- **OpenAPI Compliance**: 100/100 (100%)
- **Documentation Coverage**: 100% (67/67 tools)
- **Documentation Quality**: 95/100 (95%)
- **Overall Score**: 195/200 (98%)

### Coverage Statistics
- **Tools Documented**: 67/67 (100%)
- **Tools with Schemas**: 54/67 (80%)
- **Schema Definitions**: 22 comprehensive schemas
- **Categories Covered**: 13 functional categories

## 🛠️ Development Workflow

### Adding New Tools

1. **Create Tool Implementation**
   ```javascript
   // In appropriate category file (e.g., src/tools/vendors.js)
   server.tool('new_tool_name', 'Description', {
     param1: schemas.vendorHostname,
     param2: schemas.labels.optional()
   }, async (args) => {
     // Implementation
   });
   ```

2. **Add Schema Definitions** (if needed)
   ```javascript
   // In src/tools/schemas/index.js
   const newSchema = z.string().min(1).max(100);
   module.exports = { ...existing, newSchema };
   ```

3. **Update Documentation**
   ```bash
   npm run docs:all
   ```

4. **Validate Changes**
   ```bash
   npm run docs:test
   npm run docs:validate
   ```

### Schema Enhancement

The system automatically converts Zod schemas to OpenAPI format with support for:
- String constraints (min/max length, regex patterns)
- Number constraints (min/max values, integer types)
- Enum definitions
- Array and object types
- Optional and union types
- Date and email formats

## 🌐 Usage Examples

### For Developers
```bash
# Generate complete documentation
npm run docs:all

# Quick development cycle
npm run docs:extract && npm run docs:generate

# Test specific format
npm run docs:html && open docs/generated/index.html
```

### For API Consumers
1. **Browse Interactive Docs**: Open `docs/generated/index.html`
2. **Test APIs**: Use `docs/generated/swagger.html`
3. **Import Collections**: Use `postman-collection.json` or `insomnia-workspace.json`
4. **Read Documentation**: View `docs/generated/API.md`

### For Integration
1. **Use OpenAPI Spec**: Import `openapi.json` into tools
2. **Generate SDKs**: Use OpenAPI generators with the spec
3. **API Validation**: Use the spec for request/response validation

## 🔍 Troubleshooting

### Common Issues

**Schema Conversion Warnings**
```
[WARN] Failed to convert schema recipient: def.shape is not a function
```
- **Cause**: Complex Zod schema types not fully supported
- **Solution**: Enhanced schema conversion in `extract-tools-direct.js`
- **Impact**: Minimal - basic schema information still extracted

**Missing Documentation Files**
- **Solution**: Run `npm run docs:extract` first
- **Check**: Ensure source files exist in `src/tools/`

**Validation Failures**
- **Check**: Run `npm run docs:validate` for detailed analysis
- **Fix**: Address specific issues reported by validation

### Performance Optimization

- **Large Projects**: Use `docs:extract` separately for faster iterations
- **CI/CD**: Cache `node_modules` and `docs/extracted-tools.json`
- **Development**: Use `docs:generate` for quick updates

## 📚 Best Practices

### Documentation Quality
1. **Comprehensive Descriptions**: Write clear, detailed tool descriptions
2. **Schema Definitions**: Define schemas for all tool parameters
3. **Examples**: Include realistic examples in schemas
4. **Categories**: Organize tools into logical categories

### Maintenance
1. **Regular Updates**: Run `npm run docs:all` after tool changes
2. **Quality Checks**: Use `npm run docs:validate` before releases
3. **Testing**: Verify all formats with `npm run docs:test`
4. **Version Control**: Commit generated docs for deployment

### Integration
1. **CI/CD**: Include documentation generation in build pipelines
2. **Deployment**: Use GitHub Pages or similar for hosting
3. **Distribution**: Share Postman/Insomnia collections with teams
4. **Monitoring**: Track documentation quality metrics

## 🎯 Future Enhancements

### Potential Improvements
1. **PDF Generation**: Add PDF export capability
2. **Interactive Examples**: Live API testing in documentation
3. **Version Comparison**: Compare API versions side-by-side
4. **Localization**: Multi-language documentation support
5. **Analytics**: Track documentation usage and effectiveness

### Advanced Features
1. **Custom Themes**: Branded documentation themes
2. **Plugin System**: Extensible documentation generators
3. **Real-time Updates**: Live documentation updates
4. **Integration Testing**: Automated API testing from docs

---

## 📞 Support

- **Documentation Issues**: Check validation output and troubleshooting guide
- **Feature Requests**: Submit GitHub issues with enhancement label
- **Integration Help**: Refer to usage examples and best practices
- **Quality Questions**: Review validation metrics and recommendations

**Generated by UpGuard CyberRisk MCP Server Documentation System v1.3.0** 