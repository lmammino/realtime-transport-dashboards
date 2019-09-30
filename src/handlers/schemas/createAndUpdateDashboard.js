// createDashboard and updateDashboard
//
// example input event:
// { "body": {"name":"my-dashboard"} }
module.exports = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: [],
      properties: {
        name: {
          type: 'string'
        }
      }
    }
  }
}
