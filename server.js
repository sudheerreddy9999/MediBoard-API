'use strict';
/**
 * @module Ecma2015
 * @constant {AppConfig}
 */
import express from 'express';
import AppConfig from './config/app/app.config.js';
import cors from 'cors';
import helmet from 'helmet';
import cron from 'node-cron';
import pgsql from './config/database/database.config.js';
import Router from './routes/index.routes.js';
import OpenApi from './utility/swagger.utility.js';
import logger from './utility/logger.utility.js';
import customUtility from './utility/custom.utility.js';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', OpenApi.serve, OpenApi.docPath);

app.get('/health', async (req, res) => {
  let dbStatus;
  try {
    logger.info('Health check initiated for db');
    await pgsql.authenticate();
    dbStatus = 'healthy';
  } catch (error) {
    dbStatus = 'unhealthy';
    logger.error(` database connection faild with ${error.message}`);
  }
  const timestamp = customUtility.istTimestamp();
  const message = dbStatus === 'healthy' ? 'OK' : 'NOT OK';
  const healthCheck = {
    uptime: process.uptime(),
    message,
    timestamp,
    dbStatus: dbStatus,
  };
  logger.info(`Health check status completed and overall status is ${message}`);
  return res.status(200).json({ status: healthCheck });
});

app.use(Router);

const databaseConnection = async () => {
  try {
    await pgsql.authenticate();
    logger.info('Database connected sucessfully');
    //console.info('Database connected sucessfully');
  } catch (error) {
    logger.error(` database connection faild with ${error.message}`);
  }
};

const StartServer = () => {
  try {
    app.listen(AppConfig.PORT || 3000, () => {
      logger.info(`${AppConfig.APPNAME} is listening on port ${AppConfig.PORT}`);
    });
  } catch (error) {
    logger.error(`Error while starting server ${error.message}`);
    process.exit(-1);
  }
};
cron.schedule('*/50 * * * * *', async () => {
  logger.info('Running the scheduled task...');
  await pgsql.authenticate();
  logger.info('scheduled task Completed');
});
databaseConnection();
StartServer();
