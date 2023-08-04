import * as fflate from 'fflate'
import fs from 'fs'

describe('keepa', () => {
  it('decode product details from browser cache', () => {
    const cacheContent = fs.readFileSync('./data/keepaCache_exported_data.json')
    // you can see asins in Developer Tools => Application => IndexedDB => keepaCache => cache
    // choose asin of interest
    const asinIndex = 0
    const keepaCache = JSON.parse(cacheContent.toString())
    const asinUnit8Array = Uint8Array.from(Object.values(keepaCache.cache[asinIndex]))
    const asinContent = fflate.strFromU8(fflate.inflateSync(asinUnit8Array))
    // deserialize the content to get a Product object
    // https://keepa.com/#!discuss/t/product-object/116
    const asin = JSON.parse(asinContent)
    expect(asin.title).toStrictEqual(
      'Ultimate Artisan Banneton Bread Proofing Basket Set of 2 - Round & Oval Rattan Proofing Baskets, Dough Scraper, Recipe Book - Sourdough Bread Baking Supplies - Perfect Bread Making Tools and Supplies',
    )
  })
})
