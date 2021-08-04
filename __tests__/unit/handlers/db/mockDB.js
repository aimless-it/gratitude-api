jest.mock('../../../../src/handlers/db/config')
const pool = require('../../../../src/handlers/db/config');
const { Pool } = require('pg');
const JestMock = require('jest-mock');
require('dotenv').config()
let db;
const mock = () => {
    const db = new Pool();
    pool.mockImplementation(() => db);
}

const done = async () => {
   await db.end();
   console.log('pool has closed');
}

module.exports = {
    mock,
    done
}