# y-config

Create public configuration for the project

[![node][NPM_URL]][NPM_HREF]
[![Travis][TRAVIS_URL]][TRAVIS_HREF]
[![Coveralls][COVERALLS_URL]][COVERALLS_HREF]
[![Known Vulnerabilities][SNYK_URL]][SNYK_HREF]
[![David][DAVID_URL]][DAVID_HREF]
[![Author][AUTHOR_URL]][AUTHOR_HREF]
[![license][LICENSE_URL]][LICENSE_HREF]

## Usage

### Installation

```bash
npm install --save y-config
```
### Import Module

javascript:

```javascript
const Config = require("y-config");
```

typescript:

```typescript
import Config = require("y-config");
```

### Load Config File

```javascript
const config = new Config();
config.addConfigPath('./config.json');
config.addConfigPath('./config.yaml');
```

#### Use JSON parse

```javascript
const config = new Config();
config.addConfigPath('./config', 'json');
```
#### Use YAML parse

```javascript
const config = new Config();
config.addConfigPath('./config', 'yaml');
```

### Add Config Data

```javascript
const config = new Config();
config.addConfig({
  baz: "foo"
});
```

### Export Config

```javascript
const config = new Config();
// ......
config.getConfig();
```

[NPM_URL]: https://img.shields.io/node/v/y-config.svg?style=flat-square&maxAge=600
[NPM_HREF]: https://www.npmjs.com/package/y-config
[TRAVIS_URL]: https://img.shields.io/travis/Arylo/y-config/master.svg?style=flat-square&logo=travis&maxAge=600
[TRAVIS_HREF]: https://travis-ci.org/Arylo/y-config
[COVERALLS_URL]: https://img.shields.io/coveralls/github/Arylo/y-config.svg?style=flat-square&maxAge=600
[COVERALLS_HREF]: https://coveralls.io/github/Arylo/y-config
[SNYK_URL]: https://snyk.io/test/github/Arylo/y-config/badge.svg?style=flat-square&maxAge=600
[SNYK_HREF]: https://snyk.io/test/github/Arylo/y-config
[DAVID_URL]: https://img.shields.io/david/Arylo/y-config.svg?style=flat-square&maxAge=600
[DAVID_HREF]: https://github.com/Arylo/y-config
[AUTHOR_URL]: https://img.shields.io/badge/Author-AryloYeung-blue.svg?style=flat-square&maxAge=7200
[AUTHOR_HREF]: https://github.com/arylo
[LICENSE_URL]: https://img.shields.io/github/license/Arylo/npm-project-init.svg?style=flat-square&maxAge=7200
[LICENSE_HREF]: https://opensource.org/licenses/MIT