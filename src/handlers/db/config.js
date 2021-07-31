const { Pool } = require('pg')
const { RDS } = require('aws-sdk')

const signerOptions = {
    region: process.env.REGION,
    hostname: process.env.PGHOST,
    port: process.env.PGPORT,
    username: process.env.PGUSER
};
const signer = new RDS.Signer(signerOptions)
const token = signer.getAuthToken({
    username: process.env.PGUSER
});
const pool = new Pool({
    host: signerOptions.hostname,
    port: signerOptions.port,
    user: signerOptions.username,
    database: process.env.PGDATABASE,
    password: token
});

module.exports = pool;