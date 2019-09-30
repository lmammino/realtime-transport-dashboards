'use strict'

const middy = require('@middy/core')
const errorHandler = require('@middy/http-error-handler')
const jsonParser = require('@middy/http-json-body-parser')
const validator = require('@middy/validator')
const uuid = require('uuid/v4')
const inputSchema = require('./schemas/createAndUpdateDashboard')

module.exports = function factory (dynamoClient, tableName) {
  async function handler (event) {
    const dashboardConfig = event.body
    const dashboardId = uuid()
    const creationTime = (new Date()).toISOString()
    const record = {
      id: dashboardId,
      name: dashboardConfig.name ? dashboardConfig.name : 'unnamed-dashboard',
      createdAt: creationTime,
      updatedAt: creationTime,
      widgets: []
    }

    const params = {
      TableName: tableName,
      Item: record
    }

    await dynamoClient.put(params).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(record)
    }
  }

  return middy(handler)
    .use(errorHandler())
    .use(jsonParser())
    .use(validator({
      inputSchema
    }))
}
