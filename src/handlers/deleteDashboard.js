'use strict'

const middy = require('@middy/core')

module.exports = function factory (dynamoClient, tableName) {
  async function handler (event) {
    const dashboardId = event.pathParameters.dashboard_id

    const deleteQuery = {
      TableName: tableName,
      Key: { id: dashboardId }
    }

    await dynamoClient.delete(deleteQuery).promise()

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/plain'
      },
      body: ''
    }
  }

  return middy(handler)
}
