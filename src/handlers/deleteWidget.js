'use strict'

module.exports = function factory (dynamoClient, tableName) {
  return async function deleteWidget (event) {
    const dashboardId = event.pathParameters.dashboard_id
    const widgetId = event.pathParameters.widget_id

    /*
     * Gets the current item and filters the list of widgets.
     * Note that this approach is not ideal as it's not atomic.
     * In production like application this mike lead to data loss because of race
     * conditions.
     * In such cases it should be better to use a Map (rather than a List) and
     * index the maps by widget id
     */
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

    const newWidgets = dashboard.widgets.filter((widget) => widget.id !== widgetId)

    const updatedAt = (new Date()).toISOString()

    const updateQuery = {
      TableName: tableName,
      Key: { id: dashboardId },
      UpdateExpression: 'set #widgets = :widgets, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#widgets': 'widgets',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':widgets': newWidgets,
        ':updatedAt': updatedAt
      }
    }

    await dynamoClient.update(updateQuery).promise()

    return {
      statusCode: 200,
      headers: {
        'content-type': 'text/plain'
      },
      body: ''
    }
  }
}
