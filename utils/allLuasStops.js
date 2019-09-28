'use strict'

const { getStops } = require('public-transport-ireland/luas')

async function main () {
  const stops = await getStops()
  console.log(' code\tline\t\tname')
  console.log(' ----\t----\t\t----')
  stops.forEach(stop => console.log(`${String(stop.code).padStart(5)}\t${stop.line}\t${stop.name}`))
}

main()
