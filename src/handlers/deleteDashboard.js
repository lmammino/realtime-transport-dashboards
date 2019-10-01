'use strict'

module.exports = function factory (dynamoClient, tableName) {
  return async function deleteDashboard (event) {
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
}
