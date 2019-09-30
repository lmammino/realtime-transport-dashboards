'use strict'

const middy = require('@middy/core')
const errorHandler = require('@middy/http-error-handler')
const jsonParser = require('@middy/http-json-body-parser')
const validator = require('@middy/validator')
const uuid = require('uuid/v4')
const inputSchema = require('./schemas/addAndUpdateWidget')

module.exports = function factory (dynamoClient, tableName) {
  async function handler (event) {
    const dashboardId = event.pathParameters.dashboard_id
    const { Item: dashboard } = await dynamoClient.get({
      TableName: tableName,
      Key: {
        id: dashboardId
      }
    }).promise()

    if (!dashboard) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Dashboard not found' })
      }
    }

    const widgetRecord = event.body
    widgetRecord.id = uuid()
    widgetRecord.name = widgetRecord.name ? widgetRecord.name : 'unnamed-widget'

    const updatedAt = (new Date()).toISOString()

    const updateQuery = {
      TableName: tableName,
      Key: { id: dashboardId },
      UpdateExpression: 'set #widgets = list_append(#widgets, :widgetRecord), #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#widgets': 'widgets',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':widgetRecord': [widgetRecord],
        ':updatedAt': updatedAt
      }
    }

    await dynamoClient.update(updateQuery).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(widgetRecord)
    }
  }

  return middy(handler)
    .use(errorHandler())
    .use(jsonParser())
    .use(validator({
      inputSchema
    }))
}
