# Contributing to GoCine

First off, thank you for considering contributing to **GoCine**! 🎬

Every contribution matters — whether it's fixing a bug, improving documentation, or proposing a new feature. This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guides](#style-guides)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior by opening an issue.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating a bug report, please check [existing issues](https://github.com/eldhoaby/GoCineApp/issues) to avoid duplicates.

When filing a bug report, include:
- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs. **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node.js version)

### ✨ Suggesting Features

Feature requests are welcome! Please provide:
- **Clear description** of the proposed feature
- **Use case** explaining why this feature would be useful
- **Possible implementation** approach (optional)

### 🔧 Code Contributions

1. Look for issues tagged with `good first issue` or `help wanted`
2. Comment on the issue to let others know you're working on it
3. Follow the development workflow below

---

## Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/GoCineApp.git
cd GoCineApp

# 3. Add upstream remote
git remote add upstream https://github.com/eldhoaby/GoCineApp.git

# 4. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 5. Create environment files
# Copy .env.example and fill in your values
cp .env.example backend/.env
cp .env.example frontend/.env

# 6. Start development servers
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## Branch Naming Convention

Use the following format for branch names:

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/add-search-filter` |
| Bug Fix | `fix/description` | `fix/payment-error-handling` |
| Documentation | `docs/description` | `docs/update-api-docs` |
| Refactor | `refactor/description` | `refactor/booking-service` |
| Hotfix | `hotfix/description` | `hotfix/auth-token-expiry` |

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, semicolons, etc.) |
| `refactor` | Code refactoring (no feature change or bug fix) |
| `test` | Adding or updating tests |
| `chore` | Build process or auxiliary tool changes |
| `perf` | Performance improvements |

### Examples

```bash
feat(booking): add QR code to e-ticket PDF
fix(payment): handle Razorpay callback timeout
docs(readme): update deployment instructions
refactor(api): extract validation middleware
```

---

## Pull Request Process

1. **Create a branch** from `main` following the naming convention
2. **Make your changes** with clear, atomic commits
3. **Test your changes** locally (both frontend and backend)
4. **Update documentation** if your changes affect the API or setup process
5. **Push your branch** and create a Pull Request
6. **Fill out the PR template** completely
7. **Request a review** and address any feedback

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code changes completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings or errors introduced
- [ ] Changes tested locally

---

## Style Guides

### JavaScript / React

- Use **ES6+ syntax** (arrow functions, destructuring, template literals)
- Use **functional components** with React Hooks
- Follow **ESLint** configuration in the project
- Use **meaningful variable and function names**
- Keep components **small and focused**

### CSS / Styling

- Use **Tailwind CSS** utility classes as the primary styling approach
- Use **Material UI** components for complex UI elements
- Follow **mobile-first** responsive design principles
- Maintain **consistent spacing** and visual hierarchy

### Git

- Write **clear, descriptive commit messages**
- Keep commits **atomic** — one logical change per commit
- **Rebase** your branch on `main` before creating a PR
- **Squash** minor fixup commits before merging

---

## 🎉 Thank You!

Your contributions help make GoCine better for everyone. We appreciate your time and effort!

If you have questions, feel free to open an issue or reach out through the repository.
