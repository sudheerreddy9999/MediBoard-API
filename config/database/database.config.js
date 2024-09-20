'use strict';
import properties from '../index.config.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: properties.get('db.pgsql.dialect'),
  host: properties.get('db.pgsql.host'),
  username: properties.get('db.pgsql.username'),
  password: properties.get('db.pgsql.password') || process.env.DB_PASSWORD,
  database: properties.get('db.pgsql.database'),
  port: properties.get('db.pgsql.port'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // This is typically needed if the server uses self-signed SSL certificates
    },
  },
  pool: {
    max: 10,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
});
export default sequelize;
