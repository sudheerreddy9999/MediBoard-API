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
import SwaggerUi from 'swagger-ui-express';
import OpenApi from './utility/swagger.utility.js';

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
    console.info('Database connected sucessfully');
  } catch (error) {
    console.error(` database connection faild with ${error.message}`)
  }
};
const StartServer = () => {
  try {
    app.listen(AppConfig.PORT, () => {
      console.info(`${AppConfig.APPNAME} is listening on port ${AppConfig.PORT}`);
    });
  } catch (error) {
    console.error(`Error while starting server ${error.message}`);
    process.exit(-1);
  }
};
databaseConnection();
StartServer();
