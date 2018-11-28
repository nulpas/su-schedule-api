import portScan from 'portscanner';
import dotEnv from 'dotenv';
dotEnv.config();

// const env = process.env.NODE_ENV || 'development';
// const config = require(`${__dirname}/src/db/config/config.json`)[env];
// const host = (process.env.CHECK_PORT_DOCKER === 'docker') ? config.host : 'localhost' ;
const host = 'localhost';

const portStatusPromise = portScan.checkPortStatus(process.env.CHECK_PORT_PORT, host);
portStatusPromise.then(status => {
  if (status === 'open') {
    console.log(host, process.env.CHECK_PORT_PORT, status); /* eslint-disable-line no-console */
  }
});
