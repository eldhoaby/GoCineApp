# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | ✅ Currently supported |

## Reporting a Vulnerability

We take the security of GoCine seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include a detailed description of the vulnerability
4. Provide steps to reproduce the issue
5. Include the potential impact assessment

### What to Expect

- **Acknowledgment** within 48 hours of your report
- **Assessment** of the vulnerability within 1 week
- **Resolution timeline** communicated based on severity
- **Credit** given to the reporter (unless anonymity is requested)

### Security Best Practices for Contributors

- Never commit `.env` files or API keys to the repository
- Use environment variables for all sensitive configuration
- Keep dependencies updated to patch known vulnerabilities
- Follow the principle of least privilege for database access
- Validate and sanitize all user inputs
- Use parameterized queries to prevent injection attacks

## Scope

This security policy applies to the GoCine application codebase, including:

- Frontend React application
- Backend Express API server
- Database schemas and queries
- Payment gateway integrations
- Authentication and authorization flows
