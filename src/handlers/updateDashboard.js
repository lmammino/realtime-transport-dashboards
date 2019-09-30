'use strict'

const middy = require('@middy/core')
const errorHandler = require('@middy/http-error-handler')
const jsonParser = require('@middy/http-json-body-parser')
const validator = require('@middy/validator')
const inputSchema = require('./schemas/createAndUpdateDashboard')

module.exports = function factory (dynamoClient, tableName) {
  async function handler (event) {
    const dashboardConfig = event.body
    const dashboardId = event.pathParameters.dashboard_id
    const updatedAt = (new Date()).toISOString()

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

    const name = dashboardConfig.name ? dashboardConfig.name : 'unnamed-dashboard'

    const updateQuery = {
      TableName: tableName,
      Key: { id: dashboardId },
      UpdateExpression: 'set #name = :name, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':name': name,
        ':updatedAt': updatedAt
      },
      ReturnValues: 'ALL_NEW'
    }

    const resp = await dynamoClient.update(updateQuery).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(resp.Attributes)
    }
  }

  return middy(handler)
    .use(errorHandler())
    .use(jsonParser())
    .use(validator({
      inputSchema
    }))
}
