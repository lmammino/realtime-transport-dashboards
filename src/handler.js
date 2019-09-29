'use strict'

const AWS = require('aws-sdk')
const getDashboard = require('./handlers/getDashboard')
const updateDashboard = require('./handlers/updateDashboard')
const deleteDashboard = require('./handlers/deleteDashboard')
const createDashboard = require('./handlers/createDashboard')
const addWidget = require('./handlers/addWidget')
const updateWidget = require('./handlers/updateWidget')
const deleteWidget = require('./handlers/deleteWidget')

const { TABLE_NAME } = process.env
const dynamoClient = new AWS.DynamoDB.DocumentClient()

module.exports.getDashboard = getDashboard(dynamoClient, TABLE_NAME)
module.exports.updateDashboard = updateDashboard(dynamoClient, TABLE_NAME)
module.exports.deleteDashboard = deleteDashboard(dynamoClient, TABLE_NAME)
module.exports.createDashboard = createDashboard(dynamoClient, TABLE_NAME)
module.exports.addWidget = addWidget(dynamoClient, TABLE_NAME)
module.exports.updateWidget = updateWidget(dynamoClient, TABLE_NAME)
module.exports.deleteWidget = deleteWidget(dynamoClient, TABLE_NAME)
