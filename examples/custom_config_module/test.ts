import { NewObject } from './test.d';
import config = require('y-config');

config.test = 'test';
config.bar = 'foo';

export = <NewObject>config.getConfig();
