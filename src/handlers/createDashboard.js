'use strict'

const uuid = require('uuid/v4')

module.exports = function factory (dynamoClient, tableName) {
  return async function createDashboard (event) {
    const dashboardId = uuid()
    const creationTime = (new Date()).toISOString()
    const record = {
      id: dashboardId,
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
      body: JSON.stringify(params)
    }
  }
}
