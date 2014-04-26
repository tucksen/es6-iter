import ObjectIterable from '../src/ObjectIterable'

describe('ObjectIterable', () => {
  it('iterates over an object', () => {
    var object = { hey: 'how', goes: 'it' }
    var iterator = new ObjectIterable(object)[Symbol.iterator]()

    expect(iterator.next()).to.deep.equal({done: false, value: ['goes', 'it']})
    expect(iterator.next()).to.deep.equal({done: false, value: ['hey', 'how']})
    expect(iterator.next()).to.deep.equal({done: true, value: undefined })
  })
})
