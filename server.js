'use strict';
/**
 * @module Ecma2015
 * @constant {AppConfig}
 */
import express from 'express';
import AppConfig from './config/app/app.config.js';
import cors from 'cors';
import helmet from 'helmet';
import pgsql from './config/database/database.config.js';
import Router from './routes/index.routes.js';
import OpenApi from './utility/swagger.utility.js';
import logger from './utility/logger.utility.js';
import fs from 'fs'
import path from 'path';

const app = express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/api-docs",OpenApi.serve,OpenApi.docPath);

app.use(Router);

const databaseConnection = async () => {
  try {
    await pgsql.authenticate();
    logger.info('Database connected sucessfully')
    //console.info('Database connected sucessfully');
  } catch (error) {
    logger.error(` database connection faild with ${error.message}`)
  }
};


// Specify the directory you want to check (replace 'your_directory_here' with the actual folder name)
const directoryPath = path.join(process.cwd(), '/'); // Adjust if needed

// Read the files in the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Unable to scan directory:', err);
        return;
    }
    // List all files in the directory
    console.log('Files in directory:', directoryPath);
    files.forEach(file => {
        console.log(file);
    });
});

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


databaseConnection();
StartServer();
