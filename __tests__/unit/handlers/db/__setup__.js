const fs = require('fs')
const {Client} = require('pg')
process.env.PGHOST = 'locahost';
process.env.PGUSERNAME = 'app_user'
process.env.PGPASSWORD = 'app_password'
process.env.PGPORT = '5432'
process.env.PGDATABASE = 'postgres'

const client = new Client();

client.query(fs.readFileSync('setup.sql'));