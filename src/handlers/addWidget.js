'use strict'

const uuid = require('uuid/v4')

module.exports = function factory (dynamoClient, tableName) {
  return async function addWidget (event) {
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

    const widgetRecord = event.body ? JSON.parse(event.body) : {}
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
}
