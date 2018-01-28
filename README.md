# y-config

Create public configuration for the project

[![node](https://img.shields.io/node/v/y-config.svg?style=flat-square)](https://www.npmjs.com/package/y-config)
[![David](https://img.shields.io/david/Arylo/y-config.svg?style=flat-square)][REPO]
[![Travis](https://img.shields.io/travis/Arylo/y-config.svg?style=flat-square)](https://travis-ci.org/Arylo/y-config)
[![Author](https://img.shields.io/badge/Author-AryloYeung-blue.svg?style=flat-square)](https://github.com/arylo)
[![license](https://img.shields.io/github/license/Arylo/y-config.svg?style=flat-square)][REPO]

[![NPM](https://nodei.co/npm/y-config.png)](https://nodei.co/npm/y-config/)

## Installation
```bash
npm install --save y-config
```

## Load Module

```javascript
// Without config file
let config = require('y-config');
// Load config file
let config = require('y-config');
config.setConfigPath(...);
// Load Default+Custom config file
let config = require('y-config');
config.setConfigPath(...);
config.setCustomConfigPath(...);
```

## Get Config Data
```javascript
let config = require('y-config');
config.getConfig()
// or
config
```
## Add Config Object
```javascript
let config = require('y-config');
config.module = 'y-config';
config.author = 'AryloYeung';
// {
//   "module": "y-config",
//   "author": "AryloYeung"
// }
config.setConfig({ "author": { "name": "y-config" } });
// {
//   "module": "y-config",
//   "author": {
//     "name": "AryloYeung"
//   }
// }
console.log(config.author);
// "author": {
//   "name": "AryloYeung"
// }
```

[REPO]: https://github.com/Arylo/y-config