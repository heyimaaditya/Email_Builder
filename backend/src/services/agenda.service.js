import Agenda from 'agenda';
import config from '../config/index.js';
import emailJob from '../jobs/email.job.js';;

const agenda = new Agenda({
  db: { address: config.mongodbUri, collection: 'agendaJobs' },
  processEvery: '10 seconds', 
  maxConcurrency: 20,
  defaultConcurrency: 5,
  defaultLockLifetime: 10000 
});

const initializeAgenda = async () => {
  // Define jobs
  emailJob.register(agenda);

  // Start Agenda
  agenda.on('ready', () => {
    console.log('Agenda is ready.');
    agenda.start();
  });

  agenda.on('error', (err) => {
    console.error('Agenda connection error:', err);
    // Process error here
  });

  // Wait for Agenda to connect
  await agenda.start();
};

const scheduleEmail = async (when, data) => {
  console.log(`Scheduling email job "${emailJob.JOB_NAME}" for ${when}...`);
  const job = await agenda.schedule(when, emailJob.JOB_NAME, data);
  console.log(`Job scheduled with ID: ${job.attrs._id}`);
  return job;
};

export default {
  initializeAgenda,
  scheduleEmail,
  agenda 
};