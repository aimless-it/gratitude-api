jest.mock('../../../../src/handlers/db/config')
const pool = require('../../../../src/handlers/db/config');
const { Pool } = require('pg');
const JestMock = require('jest-mock');
require('dotenv').config()
let db;
const mock = () => {
    db = new Pool();
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

// to pass test coverage
describe('fake test so jest doesnt yell at config file', () => {
    it('should pass', () => {
        expect(true).toBeTruthy();
    })
})