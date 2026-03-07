const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully');
  } catch (error) {
    console.error('✗ Unable to connect to database:', error.message);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await testConnection();

    app.listen(PORT, HOST, () => {
      console.log('═══════════════════════════════════════════════════════════════');
      console.log('  Result Institute Training Management System - API Server');
      console.log('═══════════════════════════════════════════════════════════════');
      console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  Server:      http://${HOST}:${PORT}`);
      console.log(`  API Docs:    http://${HOST}:${PORT}/api/health`);
      console.log('═══════════════════════════════════════════════════════════════');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await sequelize.close();
  process.exit(0);
});

startServer();
