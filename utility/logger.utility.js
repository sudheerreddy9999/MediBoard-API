import pino from 'pino';

// Custom timestamp function for IST
const istTimestamp = () => {
  const now = new Date();
  const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').substring(0, 19);
  return `,"time":"${istTime}"`;
};

// Create Pino logger
const logger = pino({
  level: 'info', // Ensure the logging level is set to 'info' or lower to capture 'error' messages
  timestamp: istTimestamp
});


export default logger;
