'use strict'

const getWidgetData = require('./getWidgetData')

module.exports = function factory (dynamoClient, tableName) {
  return async function getWidget (event) {
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

    const expandedWidget = await Promise.all(
      dashboard.widgets.map(async (widget) => {
        const realtimeInfo = await getWidgetData(widget.config)
        return Object.assign({}, widget, { realtimeInfo })
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(Object.assign({}, dashboard, { widgets: expandedWidget }))
    }
  }
}
