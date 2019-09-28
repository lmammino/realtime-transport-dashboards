'use strict'

const uuid = require('uuid/v4')

module.exports = function factory (dynamoClient, tableName) {
  return async function addWidget (event) {
    const dashboardId = event.pathParameters.dashboard_id
    const widgetConfig = event.body ? JSON.parse(event.body) : {}
    const widgetId = uuid()

    const widgetRecord = {
      id: widgetId,
      config: widgetConfig
    }

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
}
