# Backend development with Node.js, GraphQL

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/ruhit07/node-graphql.git
cd node-graphql
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env.development

# open .env.development and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
npm run dev
```

## Environment Variables

The environment variables can be found and modified in the `.env.development` file. They come with these default values:

```bash
# Node environment
NODE_ENV=development
# Port number
PORT=3900

# URL of the Mongo DB
MONGODB_URL=mongodb://localhost:27017/inventory

# JWT secret key
JWT_SECRET=gsdhgfhdgshgh4g54b5s4fg5
# JWT token expires
JWT_EXPIRE=30d
```
