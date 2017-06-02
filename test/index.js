'use strict';

let config = require('../');

describe('Config Test.', function () {

  beforeEach(function () {
    config.clear();
    config.clearConfigCwd();
    config.clearConfigPath();
    config.clearCustomConfigPath();
  });

  it('Default.', function () {
    config.should.be.an.Object();
    config.should.have.properties([
      'getConfig', 'setConfig',
      'clear', 'clearConfigPath', 'clearCustomConfigPath',
      'getConfigPath', 'getCustomConfigPath',
      'setConfigPath', 'setCustomConfigPath',
      'reload'
    ]);
  });

  describe('Empty Config.', function () {

    it('Direct Assign.', function () {
      config.aa = 'Test';
      config.should.have.property('aa', 'Test');
      config.getConfig().should.have.property('aa', 'Test');
    });

    it('Clear Config', function () {
      config.it3223 = 'Test';
      config.clear().should.be.True();
      config.getConfig().should.have.not.property('it3223');
    });

    it('Reload Config', function () {
      config.test322 = 'Test';
      config.reload().should.be.True();
      config.getConfig().should.have.property('test322');
    });

  });

  describe('Wrong Config Path.', function () {

    it('Set Config Folder', function (done) {
      config.once('err', function (msg) {
        msg.should.be.a.String();
        done();
      });
      config.setConfigPath('./config/').should.be.False();
    });

    it('Set Custom Config Folder', function (done) {
      config.once('err', function (msg) {
        msg.should.be.a.String();
        done();
      });
      config.setCustomConfigPath('./config/').should.be.False();
    });

  });

  describe('Load JSON Config', function () {

    it('Absolute Path', function () {
      let path = `${__dirname}/assets/config.sample.json`;
      config.setConfigPath(path).should.be.True();
      config.getConfigPath().should.eql(path);
      config.getConfig().should.have.properties({
        type: 'JSON',
        mode: 'r+',
        comment: 'JSON Sample'
      });
    });

    it('Relative Path', function () {
      let path = 'test/assets/config.sample.json';
      config.setConfigPath(path).should.be.True();
      config.getConfigPath().should.eql(path);
      config.getConfig().should.have.properties({
        type: 'JSON',
        mode: 'r+',
        comment: 'JSON Sample'
      });
    });

    it('Reload Config', function () {
      let path = 'test/assets/config.sample.json';
      config.setConfigPath(path).should.be.True();
      config.author = 'AryloYeung';
      config.reload().should.be.True();
      config.getConfig().should.have.not.property('author');
    });

  });

  describe('Load Custom JSON Config', function () {

    beforeEach(function () {
      let path = 'test/assets/config.sample.json';
      config.setConfigPath(path);
    });

    it('Absolute Path', function () {
      let path = `${__dirname}/assets/config.custom.json`;
      config.setCustomConfigPath(path).should.be.True();
      config.getCustomConfigPath().should.eql(path);
      config.getConfig().should.have.properties({
        type: 'JSON',
        mode: 'w+',
        comment: 'JSON Sample'
      });
    });

    it('Relative Path', function () {
      let path = 'test/assets/config.custom.json';
      config.setCustomConfigPath(path).should.be.True();
      config.getCustomConfigPath().should.eql(path);
      config.getConfig().should.have.properties({
        type: 'JSON',
        mode: 'w+',
        comment: 'JSON Sample'
      });
    });

  });

});
