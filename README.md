# <img src="public/toptastelogo.png" alt="App Icon" width="30" height="30"/> Top Taste Server - REST API

Top Taste Server is a robust backend built with Express and TypeScript. It leverages the power of Express for API development and TypeScript for adding type safety and enhancing the development experience. This server is configured with essential middleware and tools for security, CORS, environment variable management among others.

## Features

- **Express Framework**: Utilizes Express for fast, unopinionated, minimalist web framework capabilities.
- **TypeScript Support**: Employs TypeScript to bring static typing to JavaScript, enhancing code quality and reliability.
- **Security Middleware**: Integrated with `express-jwt` and `bcrypt` for handling authentication and password hashing securely.
- **CORS Ready**: Uses the `cors` middleware to enable Cross-Origin Resource Sharing options.
- **Environment Variable Management**: Configured with `dotenv` for managing environment variables in development and production.
- **Logging**: Incorporates `morgan` for HTTP request logging.
- **Code Quality Tools**: Includes ESLint, Prettier, and Husky for linting, formatting, and enforcing code standards via git hooks.
- **Development Efficiency**: Setup with `nodemon` and `ts-node` for efficient development workflows, automatically restarting the server upon file changes.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- MongoDB [(Follow the installation)](#mongodb-installation)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cramosp/top-taste-server.git
```

2. Navigate to the project directory:

```bash
cd top-taste-server
```

3. Create an `.env` file in the root directory, to set up the environment variables needed for the app.
   To generate the `TOKEN_SECRET` you can execute in your terminal `openssl rand -base64 32`.

```
# You can generate a secret executing in your terminal:
# openssl rand -base64 32
TOKEN_SECRET=<paste-your-secret-token-here>

# Frontend URL:
ORIGIN=http://localhost:3000
```

4. Install NPM packages:

```bash
npm install
```

5. Run the development server:

```bash
npm run dev
```

### Available scripts

In the project directory, you can run:

- `npm run build`: Compiles TypeScript files to JavaScript in the dist directory.
- `npm run start`: Starts the compiled server from the dist directory.
- `npm run dev`: Runs the server in development mode with hot reload.
- `npm run lint`: Formats the TypeScript files using Prettier.
- `npm run lint`: Lints the TypeScript files using ESLint.
- `npm run lint:fix`: Lints the TypeScript files and fixes fixable issues.
- `npm run prepare`: Sets up Husky for managing Git hooks. (At the moment I am only using `pre-commit` hook to run the linters)

### MongoDB Installation

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. Here are the basic steps to install MongoDB:

#### For Windows:

1. Download the MongoDB Community Server from the [official MongoDB website](https://www.mongodb.com/try/download/community).
2. Run the installer and follow the installation wizard. Choose the "Complete" setup type.
3. Add MongoDB's bin folder to the System Environment Variables Path.
4. Create a directory for MongoDB data, e.g., `C:\data\db`.
5. Start MongoDB by running `mongod` in the command prompt.

#### For macOS:

1. The easiest way to install MongoDB on a Mac is using [Homebrew](https://brew.sh/):
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
