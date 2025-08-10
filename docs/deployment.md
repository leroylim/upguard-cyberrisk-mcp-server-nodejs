# Deployment Guide

This document provides a detailed, step-by-step guide for deploying the UpGuard CyberRisk MCP Server to a production environment.

## 1. Prerequisites

Before you can deploy the application, you will need the following:

*   A server with Node.js 18+ installed.
*   An UpGuard CyberRisk API key.
*   A domain name for the application (optional).

## 2. Configuration

The application is configured through environment variables. The following environment variables are required:

*   `UPGUARD_API_KEY`: Your UpGuard API key.

The following environment variables are optional:

*   `MCP_TRANSPORT_MODE`: The transport mode to use. Can be `stdio` or `http`. Defaults to `stdio`.
*   `MCP_HTTP_PORT`: The port to use for the HTTP transport. Defaults to `3000`.
*   `MCP_HTTP_HOST`: The host to use for the HTTP transport. Defaults to `localhost`.
*   `LOG_LEVEL`: The log level to use. Can be `error`, `warn`, `info`, `http`, `verbose`, `debug`, or `silly`. Defaults to `info`.

## 3. Deployment Strategies

There are several ways to deploy the application. The following are some of the most common deployment strategies:

### 3.1. Docker

The easiest way to deploy the application is to use Docker. A `Dockerfile` is provided in the root of the repository. To build the Docker image, run the following command:

```bash
docker build -t upguard-mcp-server .
```

To run the Docker container, run the following command:

```bash
docker run -d \
  --name upguard-mcp-server \
  -p 3000:3000 \
  -e UPGUARD_API_KEY=<your_api_key> \
  upguard-mcp-server
```

### 3.2. Systemd

If you are not using Docker, you can use a process manager, such as `systemd`, to run the application. The following is an example of a `systemd` service file:

```ini
[Unit]
Description=UpGuard CyberRisk MCP Server
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/upguard-cyberrisk-mcp-server/src/index.js
Restart=always
User=nobody
Group=nogroup
Environment=UPGUARD_API_KEY=<your_api_key>

[Install]
WantedBy=multi-user.target
```

### 3.3. PM2

Another option is to use a process manager, such as `pm2`. To install `pm2`, run the following command:

```bash
npm install -g pm2
```

To start the application with `pm2`, run the following command:

```bash
pm2 start src/index.js --name upguard-mcp-server
```

## 4. Security Considerations

When deploying the application to a production environment, it is important to take the following security considerations into account:

*   **HTTPS:** If you are using the HTTP transport, you should use a reverse proxy, such as Nginx or Apache, to terminate SSL/TLS. This will ensure that the communication between the client and the server is encrypted.
*   **Firewall:** You should use a firewall to restrict access to the server. Only the ports that are required for the application to function should be open.
*   **Least Privilege:** The application should be run with the least amount of privileges possible. This will help to mitigate the impact of a security breach.
