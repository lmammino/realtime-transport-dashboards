'use strict'

const uuid = require('uuid/v4')
const AWS = require('aws-sdk')

const { TABLE_NAME } = process.env
const DB = new AWS.DynamoDB.DocumentClient()

async function createDashboard (event) {
  const dashboardId = uuid()
  const creationTime = (new Date()).toISOString()
  const record = {
    id: dashboardId,
    createdAt: creationTime,
    updatedAt: creationTime,
    widgets: []
  }

  const params = {
    TableName: TABLE_NAME,
    Item: record
  }

  await DB.put(params).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(params)
  }
}

async function addWidget (event) {
  const dashboardId = event.pathParameters.dashboard_id
  const widgetConfig = event.body ? JSON.parse(event.body) : {}
  const widgetId = uuid()

  const widgetRecord = {
    id: widgetId,
    config: widgetConfig
  }

  const updatedAt = (new Date()).toISOString()

  const updateQuery = {
    TableName: TABLE_NAME,
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

  await DB.update(updateQuery).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(widgetRecord)
  }
}

module.exports = {
  createDashboard,
  addWidget
}
