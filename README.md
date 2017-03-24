# y-config

Create public configuration for the project

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](https://travis-ci.org/Arylo/y-config)
[![Build Status](https://travis-ci.org/Arylo/y-config.svg?branch=master)](https://travis-ci.org/Arylo/y-config)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![NPM](https://nodei.co/npm/y-config.png)](https://nodei.co/npm/y-config/)

## Installation
```bash
npm install --save y-config
npm install --save-dev y-config
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
config.module = 'author';
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
```
