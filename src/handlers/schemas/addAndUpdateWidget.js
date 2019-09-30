// addWidgetd and updateWidget
//
// examples of input event:
// {
//   "body":{
//     "name": "Luas Dominick Inbound",
//     "config": {
//       "type": "luas",
//       "parameters": {
//         "code": "DOM",
//         "direction": "Inbound" // optional
//       }
//     }
//   }
// }
module.exports = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['config'],
      properties: {
        name: {
          type: 'string'
        },
        config: {
          type: 'object',
          required: ['type', 'parameters'],
          properties: {
            type: {
              type: 'string',
              enum: ['luas', 'dublinBus', 'irishRail']
            },
            parameters: {
              type: 'object',
              required: ['code'],
              properties: {
                code: {
                  type: 'string'
                },
                direction: {
                  type: 'string',
                  enum: [
                    // luas
                    'Inbound',
                    'Outbound',
                    // irish rail
                    'Northbound',
                    'Southbound',
                    'To Ballina',
                    'To Westport',
                    'To Dublin Heuston',
                    'To Galway',
                    'To Cork',
                    'To Portlaoise',
                    'To Limerick',
                    'To Waterford',
                    'To Limerick Junction',
                    'To Ennis',
                    'To Mallow',
                    'To Tralee',
                    'To Midleton',
                    'To Cobh'
                  ]
                }
              }
            }
          }
        }
      }
    }
  }
}
