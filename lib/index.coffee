'use strict'

fs = require 'fs'
_  = require 'lodash'

DEBUG = false
events = require('events')
ee = new events.EventEmitter()

configCwd = null
configPath = null
customConfigPath = null

errorEmit = (errmsg) ->
  process.stderr.write "#{errmsg}\n" if DEBUG
  return ee.emit 'err', errmsg

checkPathExist = (filepath) ->
  cwd = configCwd ? process.cwd()
  path = require('path').resolve cwd, filepath
  bool = fs.existsSync(path)
  errorEmit "'#{path}' is not exist." if !bool
  return bool

checkFileType = (filepath) ->
  bool = /\.(json|yml|yaml)$/.test filepath
  errorEmit "'#{filepath}' is not an existing file." if !bool
  return bool

getConfigData = (filepath) ->
  cwd = configCwd ? process.cwd()
  path = require('path').resolve cwd, filepath
  return switch
    when /\.json$/.test path
      try
        JSON.parse fs.readFileSync path
      catch error
        errorEmit "'#{path}' is not a valid JSON file."
    when /\.ya?ml/.test path
      try
        require('config-yaml') path
      catch error
        errorEmit "'#{path}' is not a valid YAML file."
    else
      { }

class Config

  # ####################
  #
  # Debug Function
  #
  # ####################
  getDebug = -> DEBUG

  setDebug = (bool=false) ->
    return false if not isBoolean bool
    DEBUG = bool
    return true

  # ####################
  #
  # Event Function
  #
  # ####################
  on: (event, cb) ->
    ee.on(event, cb)
  once: (event, cb) ->
    ee.once(event, cb)

  # ####################
  #
  # Config Function
  #
  # ####################
  getConfig: ->
    obj = { }
    for own key, value of @
      obj[key] = value
      continue
    return obj

  setConfig: (obj) ->
    return false if not _.isObject obj
    _obj = { }
    for own key, value of obj
      obj[key] = value
      continue
    for own key, value of (_.merge @, _obj)
      @[key] = value
      continue
    return true

  # ####################
  #
  # Path Function
  #
  # ####################
  clearConfigCwd: ->
    configCwd = null
    return @reload()

  getConfigCwd: -> return configCwd

  setConfigCwd: (cwd) ->
    cwd = require('path').resolve process.cwd(), cwd
    return false if cwd is configCwd
    return false if not checkPathExist(cwd)
    configCwd = cwd
    return @reload()

  clearConfigPath: ->
    configPath = null
    return @reload()

  clearCustomConfigPath: ->
    customConfigPath = null
    return @reload()

  getConfigPath: -> return configPath

  getCustomConfigPath: -> return customConfigPath

  setConfigPath: (filepath='') ->
    return false if not checkFileType(filepath)
    return false if not checkPathExist(filepath)
    configPath = filepath
    return @reload()

  setCustomConfigPath: (filepath='') ->
    return false if not checkFileType(filepath)
    return false if not checkPathExist(filepath)
    return false if not configPath?
    customConfigPath = filepath
    return @reload()

  # ####################
  #
  # Data Function
  #
  # ####################
  clear: ->
    for own key of @
      delete @[key]
    @:: = Config::
    return true

  reload: ->
    return true if not configPath?
    @clear()
    _obj = getConfigData configPath
    for own key, value of (_.merge @, _obj)
      @[key] = value
      continue
    if customConfigPath?
      _obj = getConfigData customConfigPath
      for own key, value of (_.merge @, _obj)
        @[key] = value
        continue
    return true

module.exports = new Config()
