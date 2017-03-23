'use strict'

fs = require 'fs'

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

  CONFIG: { }

  getConfig: ->
    return @CONFIG

  clear: ->
    @CONFIG = { }
    configPath = null
    customConfigPath = null
    return true

  clearConfigPath: ->
    configPath = null
    return @reload()

  clearCustomConfigPath: ->
    customConfigPath = null
    return @reload()

  getConfigPath: -> return configPath

  getCustomConfigPath: -> return customConfigPath

  setConfigPath: (path) ->
    return false if not checkFileType(path)
    return false if not checkFileExist(path)
    configPath = path
    return @reload()

  setCustomConfigPath: (path) ->
    return false if not checkFileType(path)
    return false if not checkFileExist(path)
    return false if not configPath?
    customConfigPath = path
    return @reload()

  reload: ->
    return true if not configPath?
    @CONFIG = getConfigData configPath
    if customConfigPath?
      _obj = getConfigData customConfigPath
      @CONFIG = require('lodash').merge @CONFIG, _obj
    return true

module.exports = new Config()
