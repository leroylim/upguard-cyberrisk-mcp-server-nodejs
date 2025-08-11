# Dependency Manifest

This document provides a clear list of all external dependencies, their versions, and their primary purpose.

## 1. Production Dependencies

The following dependencies are required for the application to run in a production environment:

| Dependency | Version | Purpose |
| --- | --- | --- |
| `@modelcontextprotocol/sdk` | `^1.11.3` | The Model Context Protocol SDK. |
| `axios` | `^1.9.0` | A promise-based HTTP client for the browser and node.js. |
| `dotenv` | `^16.5.0` | A zero-dependency module that loads environment variables from a `.env` file into `process.env`. |
| `express` | `^4.21.2` | A fast, unopinionated, minimalist web framework for node. |
| `zod` | `^3.23.8` | A TypeScript-first schema declaration and validation library. |

## 2. Development Dependencies

The following dependencies are only required for development and testing:

| Dependency | Version | Purpose |
| --- | --- | --- |
| `@playwright/test` | `^1.52.0` | A framework for end-to-end testing. |
| `artillery` | `^2.0.23` | A modern, powerful, and easy-to-use load testing and functional testing toolkit. |
| `eslint` | `^8.0.0` | A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. |
| `eslint-config-prettier` | `^9.0.0` | An ESLint config that disables rules that conflict with Prettier. |
| `eslint-plugin-jest` | `^27.0.0` | An ESLint plugin for Jest. |
| `eslint-plugin-node` | `^11.1.0` | An ESLint plugin for Node.js. |
| `eslint-plugin-security` | `^2.1.0` | An ESLint plugin for security-related issues. |
| `husky` | `^8.0.0` | A tool that makes it easy to use git hooks. |
| `jest` | `^29.0.0` | A delightful JavaScript Testing Framework with a focus on simplicity. |
| `lint-staged` | `^15.0.0` | A tool to run linters against staged git files. |
| `nodemon` | `^3.0.0` | A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. |
| `prettier` | `^3.0.0` | An opinionated code formatter. |
| `rimraf` | `^5.0.10` | A deep deletion module for node (like `rm -rf`). |
| `supertest` | `^6.3.0` | A high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent. |
| `swagger-ui-dist` | `^5.22.0` | A distribution of Swagger UI. |
