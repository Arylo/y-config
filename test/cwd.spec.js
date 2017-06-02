'use strict';

const path = require('path');

let config = require('../');

describe('Config Test.', function () {

  describe('CWD Function', () => {

    beforeEach(function () {
      config.clear();
      config.clearConfigCwd();
      config.clearConfigPath();
      config.clearCustomConfigPath();
    });

    it('Default', () => {
      config.should.have.properties([
        'clearConfigCwd',
        'getConfigCwd',
        'setConfigCwd'
      ]);
    });

    it('Miss Config File', () => {
      config.setConfigCwd(__dirname).should.be.True();
      config.setConfigPath('./config.json').should.be.False();
    });

    it('Set Relative Path', () => {
      config.setConfigCwd('./test').should.be.True();
      config.getConfigCwd().should.eql(path.resolve(process.cwd(), './test'));
    });

    it('Set Absolute Path', () => {
      config.setConfigCwd(`${__dirname}/assets`).should.be.True();
      config.getConfigCwd().should.eql(path.resolve(__dirname, './assets'));
    });

    it('Load JSON Config', () => {
      config.setConfigCwd(`${__dirname}/assets`).should.be.True();
      config.setConfigPath('config.sample.json').should.be.True();
      config.getConfig().should.have.properties({
        type: 'JSON',
        mode: 'r+',
        comment: 'JSON Sample'
      });
      config.should.have.properties({
        type: 'JSON',
        mode: 'r+',
        comment: 'JSON Sample'
      });
    });

    it('Clear', () => {
      config.setConfigCwd(__dirname).should.be.True();
      config.clearConfigCwd().should.be.True();
      const should = require('should');
      should(config.getConfigCwd()).eql(null);
    });

  });

});
