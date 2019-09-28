'use strict'

const { getStops } = require('public-transport-ireland/dublin-bus')

async function main () {
  const stops = await getStops()
  console.log(' code\tdescription')
  console.log(' ----\t-----------')
  stops.forEach(stop => console.log(`${String(stop.code).padStart(5)}\t${stop.description}`))
}

main()
