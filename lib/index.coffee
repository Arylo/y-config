'use strict'

fs = require 'fs'
_  = require 'lodash'

DEBUG = false
events = require('events')
ee = new events.EventEmitter()

errorEmit = (errmsg) ->
  console.error errmsg if DEBUG
  return ee.emit 'err', errmsg

checkFileExist = (path) ->
  path = require('path').resolve process.cwd(), path
  bool = fs.statSync(path)?.isFile()
  errorEmit "'#{path}' is not an existing file." if !bool
  return bool

checkFileType = (path) ->
  bool = /\.(json|yml|yaml)$/.test path
  errorEmit "'#{path}' is not an existing file." if !bool
  return bool

getConfigData = (path) ->
  path = require('path').resolve process.cwd(), path
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

  configPath = null
  customConfigPath = null

  on: (event, cb) ->
    ee.on(event, cb)
  once: (event, cb) ->
    ee.once(event, cb)

  getDebug = -> DEBUG

  setDebug = (bool=false) ->
    return false if not isBoolean bool
    DEBUG = bool
    return true

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

  clear: ->
    for own key of @
      delete @[key]
    @:: = Config::
    return true

  clearConfigPath: ->
    configPath = null
    return @reload()

  clearCustomConfigPath: ->
    customConfigPath = null
    return @reload()

  getConfigPath: -> return configPath

  getCustomConfigPath: -> return customConfigPath

  setConfigPath: (path='') ->
    return false if not checkFileType(path)
    return false if not checkFileExist(path)
    configPath = path
    return @reload()

  setCustomConfigPath: (path='') ->
    return false if not checkFileType(path)
    return false if not checkFileExist(path)
    return false if not configPath?
    customConfigPath = path
    return @reload()

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
