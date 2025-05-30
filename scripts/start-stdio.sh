#!/bin/bash

# Shell script to start the MCP server in STDIO mode
# This is the default mode for command-line integrations

export MCP_TRANSPORT_MODE="stdio"
echo "Starting UpGuard CyberRisk MCP Server in STDIO mode..."
echo "Environment: MCP_TRANSPORT_MODE=$MCP_TRANSPORT_MODE"
echo "Server will communicate via standard input/output"
echo ""

node src/index.js 