'use strict'

const { getStations } = require('public-transport-ireland/irish-rail')

async function main () {
  const stops = await getStations()
  console.log(' code\tdescription')
  console.log(' ----\t-----------')
  stops.forEach(stop => console.log(`${String(stop.code).padStart(5)}\t${stop.name}`))
}

main()
