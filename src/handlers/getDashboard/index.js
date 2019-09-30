'use strict'

const middy = require('@middy/core')
const errorHandler = require('@middy/http-error-handler')
const cors = require('@middy/http-cors')
const getWidgetData = require('./getWidgetData')

module.exports = function factory (dynamoClient, tableName) {
  async function handler (event) {
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

  return middy(handler)
    .use(errorHandler())
    .use(cors({
      getOrigin (incomingOrigin) {
        // enable cors for code sandbox domains such as "https://xxxx.csb.app/"
        if (incomingOrigin && incomingOrigin.match(/https:\/\/([a-z0-9]+).csb.app\/?/i)) {
          return incomingOrigin
        }

        // if it doesn't match codesandbox url return an empty string
        // which will make the cors request fail
        return ''
      }
    }))
}
