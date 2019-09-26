'use strict'

const uuid = require('uuid/v4')
const AWS = require('aws-sdk')

const { TABLE_NAME } = process.env
const DB = new AWS.DynamoDB.DocumentClient()

async function createDashboard (event) {
  const id = uuid()
  const record = {
    id,
    createdAt: (new Date()).toISOString(),
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

module.exports = {
  createDashboard
}
