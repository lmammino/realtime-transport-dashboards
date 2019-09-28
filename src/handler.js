'use strict'

const AWS = require('aws-sdk')
const getDashboard = require('./handlers/getDashboard')
const createDashboard = require('./handlers/createDashboard')
const addWidget = require('./handlers/addWidget')
const deleteWidget = require('./handlers/deleteWidget')

const { TABLE_NAME } = process.env
const dynamoClient = new AWS.DynamoDB.DocumentClient()

module.exports.getDashboard = getDashboard(dynamoClient, TABLE_NAME)
module.exports.createDashboard = createDashboard(dynamoClient, TABLE_NAME)
module.exports.addWidget = addWidget(dynamoClient, TABLE_NAME)
module.exports.deleteWidget = deleteWidget(dynamoClient, TABLE_NAME)
