const { Pool } = require('pg')
const { RDS } = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const pool = () => {
    const signerOptions = {
        region: process.env.REGION,
        hostname: process.env.PGHOST,
        port: Number(process.env.PGPORT),
        username: process.env.PGUSER,
    };
    const signer = new RDS.Signer(signerOptions)
    const token = signer.getAuthToken({
        username: process.env.PGUSER
    });
    return new Pool({
        host: signerOptions.hostname,
        port: signerOptions.port,
        user: signerOptions.username,
        database: process.env.PGDATABASE,
        password: token,
        ssl: {
            cert: fs.readFileSync(path.resolve(__dirname, '../../config/cert.pem'))
        }
    });
}
module.exports = pool;