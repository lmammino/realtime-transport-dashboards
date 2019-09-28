'use strict'

module.exports = function factory (dynamoClient, tableName) {
  return async function getWidget (event) {
    const dashboardId = event.pathParameters.dashboard_id

    const record = await dynamoClient.get({
      TableName: tableName,
      Key: {
        id: dashboardId
      }
    }).promise()

    console.log('record')

    return {
      statusCode: 200,
      body: JSON.stringify(record)
    }
  }
}
