'use strict';
import PropertiesReader from 'properties-reader';

//let filePropertyPath = './config/env/config.properties';

let filePropertyPath = '/etc/secrets/config.properties'

const properties = PropertiesReader(filePropertyPath);

export default properties;
