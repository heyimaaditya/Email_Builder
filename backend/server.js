import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './src/config/index.js'; 
import apiRoutes from './src/api/index.js'; 
import agendaService from './src/services/agenda.service.js'; 

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use(express.json()); // Parse JSON body

// Database Connection
mongoose.connect(config.mongodbUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Initialize Agenda
agendaService.initializeAgenda()
  .then(() => console.log('Agenda initialized and started'))
  .catch(err => console.error('Failed to initialize Agenda:', err));

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Email Flow Builder Backend');
});


// Basic Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const startServer = async () => {

  await agendaService.agenda.on('ready', () => {
      app.listen(config.port, () => {
          console.log(`Server running on port ${config.port}`);
      });
  });

  agendaService.agenda.on('error', (err) => {
       console.error('Agenda error during server startup:', err);
     
       process.exit(1);
  });
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully.');
  await agendaService.agenda.stop();
  await mongoose.disconnect();
  console.log('MongoDB and Agenda disconnected.');
  process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully.');
    await agendaService.agenda.stop();
    await mongoose.disconnect();
    console.log('MongoDB and Agenda disconnected.');
    process.exit(0);
});