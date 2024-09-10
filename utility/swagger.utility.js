import swaggerUI from 'swagger-ui-express';

import yaml from 'yaml';

import fs from 'fs';

import AppConfig from '../config/app/app.config.js';
let swaggerDocument;
if (fs.existsSync(AppConfig.OPENAPIPATH)) {
  swaggerDocument = yaml.parse(fs.readFileSync(AppConfig.OPENAPIPATH, 'utf8'));
} else {
  console.error("Open API file doesn't exist in ", AppConfig.OPENAPIPATH);
}
const OpenApi = {
  serve: swaggerUI.serve,

  docPath: swaggerUI.setup(swaggerDocument),
};
export default OpenApi;
