import { Config } from './test.d';
import config = require('y-config');

config.clear();

config.test = 'test';
config.bar = 'foo';

config.anything = null;

export = config as Config;
