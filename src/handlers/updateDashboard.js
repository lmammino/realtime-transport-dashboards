'use strict'

module.exports = function factory (dynamoClient, tableName) {
  return async function createDashboard (event) {
    const dashboardConfig = event.body ? JSON.parse(event.body) : {}
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
}
