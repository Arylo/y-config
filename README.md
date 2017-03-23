# y-config

Create public configuration for the project

[![Build Status](https://travis-ci.org/Arylo/y-config.svg?branch=master)](https://travis-ci.org/Arylo/y-config)

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
config.getConfig()
// or
config.CONFIG
```
