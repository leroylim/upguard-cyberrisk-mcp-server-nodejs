#!/usr/bin/env pwsh

# PowerShell script to start the MCP server in STDIO mode
# This is the default mode for command-line integrations

$env:MCP_TRANSPORT_MODE = "stdio"
Write-Host "Starting UpGuard CyberRisk MCP Server in STDIO mode..."
Write-Host "Environment: MCP_TRANSPORT_MODE=$env:MCP_TRANSPORT_MODE"
Write-Host "Server will communicate via standard input/output"
Write-Host ""

node src/index.js 