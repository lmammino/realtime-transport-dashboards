'use strict'

const dublinBus = require('public-transport-ireland/dublin-bus')
const irishRail = require('public-transport-ireland/irish-rail')
const luas = require('public-transport-ireland/luas')

async function getWidgetData ({ type, parameters }) {
  if (type === 'dublinBus') {
    return getDublinBusData(parameters)
  }

  if (type === 'irishRail') {
    return getIrishRailData(parameters)
  }

  if (type === 'luas') {
    return getLuasData(parameters)
  }

  throw new Error(`Invalid widget type. Found "${type}", expected "dublinBus", "irishRail" or "luas"`)
}

async function getDublinBusData (params) {
  return dublinBus.getRealTimeInfo(params.code)
}

async function getIrishRailData (params) {
  return irishRail.getRealTimeInfo(params.code, params.direction)
}

async function getLuasData (params) {
  return luas.getRealTimeInfo(params.code, params.direction)
}

module.exports = getWidgetData
