const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

require('dotenv').config({
  path: path.join(__dirname, './../../.env'),
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não carregada');
}

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

module.exports = prisma;