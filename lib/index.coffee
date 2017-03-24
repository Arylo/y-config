'use strict'

fs = require 'fs'
_  = require 'lodash'

checkFileExist = (path) ->
  path = require('path').resolve process.cwd(), path
  return fs.statSync(path)?.isFile()

checkFileType = (path) ->
  return /\.(json|yml|yaml)$/.test path

getConfigData = (path) ->
  path = require('path').resolve process.cwd(), path
  return switch
    when /\.json$/.test path
      JSON.parse fs.readFileSync path
    when /\.ya?ml/.test path
      require('config-yaml') path
    else
      { }

class Config

  configPath = null
  customConfigPath = null

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
