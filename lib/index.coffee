'use strict';

fs = require 'fs'

class Config
  OBJ = { }
  configPath = null
  configCustomPath = null

  checkFileExist = (path) ->
    return fs.stat(path).isFile()

  checkFileType = (path) ->
    return /\.(json|yml|yaml)$/.test path

  getConfigData = (path) ->
    return switch
      when /\.json$/.test path
        JSON.parse fs.readFileSync path
      when /\.ya?ml/.test path
        require('config-yaml') path
      else
        { }

  constructor: ->
    return OBJ

  clear: ->
    OBJ = { }
    configPath = null
    configCustomPath = null
    return true

  clearConfigPath: ->
    configPath = null
    return @reload()

  clearConfigCustomPath: ->
    configCustomPath = null
    return @reload()

  getConfigPath: -> return configPath

  getConfigCustomPath: -> return configCustomPath

  setConfigPath: (path) ->
    return false if not checkFileExist(path)
    return false if not checkFileType(path)
    configPath = path
    return @reload()

  setConfigCustomPath: (path) ->
    return false if not configPath?
    return false if not checkFileExist(path)
    return false if not checkFileType(path)
    configCustomPath = path
    return @reload()

  reload: ->
    return true if not configPath?
    OBJ = getConfigData configPath
    if configCustomPath?
      _obj = getConfigData configCustomPath
      OBJ = require('lodash').merge OBJ, _obj
    return true

module.exports = Config
