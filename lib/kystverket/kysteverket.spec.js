const should = require('chai').should()
const fetcher = require('./index')
describe('Kystverket Fetcher Module', () => {
  it('should export a function', () => {
    fetcher.should.be.a('function')
  })
})
