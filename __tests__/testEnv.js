const NodeEnvironment = require('jest-environment-node');
const pool = require('../src/handlers/db/config');
const { Pool } = require('pg')
require('dotenv').config()

class TestEnv extends NodeEnvironment {
    mock;
    constructor(config, context) {
        super(config, context)
        this.mock = new Pool();
    }

    async setup() {
        console.log('running setup');
        pool = this.mock;
        await super.setup();
    }

    async teardown() {
        console.log('running teardown')
        await this.mock.end();
        await super.teardown()
    }

    getVmContext() {
        return super.getVmContext()
    }

    runScript(script){
        super.runScript(script)
    }


}

module.exports = TestEnv;