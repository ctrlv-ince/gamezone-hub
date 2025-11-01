/**
 * Clean Architecture Server
 * Entry point following strict Clean Architecture principles
 *
 * Architecture Layers:
 * 1. Domain Layer: Pure business logic, no framework dependencies
 * 2. Application Layer: Use cases, validators, DTOs, mappers
 * 3. Infrastructure Layer: Frameworks, databases, external services
 * 4. Presentation Layer: HTTP controllers and routes
 *
 * Flow:
 * HTTP Request → Presentation (Controller) → Application (Use Case)
 *             → Domain (Entity/Error) → Infrastructure (Persistence/Providers)
 *             → Response → Presentation (HTTP Response)
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Infrastructure
const { connectDB } = require('./config/database');
const Container = require('./infrastructure/di/Container');
const { errorHandler, asyncHandler } = require('./infrastructure/middleware/ErrorHandlingMiddleware');
const createAuthRoutes = require('./presentation/routes/authRoutes');

// Constants
const { HTTP_STATUS } = require('./config/constants');

// ============================================================================
// INITIALIZATION
// ============================================================================

const app = express();

// Dependency Injection Container
const container = new Container();

// ============================================================================
// MIDDLEWARE
// ============================================================================

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================================================
// DATABASE CONNECTION
// ============================================================================

connectDB();

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Authentication routes with injected dependencies
const authController = container.get('authController');
const authenticate = container.get('authenticationMiddleware');
app.use('/api/auth', createAuthRoutes(authController, authenticate));

// ============================================================================
// 404 HANDLER
// ============================================================================

app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'Route not found'
  });
});

// ============================================================================
// GLOBAL ERROR HANDLER
// ============================================================================

app.use(errorHandler);

// ============================================================================
// SERVER START
// ============================================================================

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         🎮 GameZone Hub Backend Server Started             ║
║                  (Clean Architecture)                       ║
╠════════════════════════════════════════════════════════════╣
║ Server:  http://localhost:${PORT}
║ Environment: ${NODE_ENV}
║ API:     http://localhost:${PORT}/api
║ Health:  http://localhost:${PORT}/api/health
╚════════════════════════════════════════════════════════════╝
  `);
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;