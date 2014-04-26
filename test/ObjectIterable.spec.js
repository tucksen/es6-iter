module types from '../src/types'
import ObjectIterable from '../src/ObjectIterable'

describe('ObjectIterable', () => {
  it('iterates over an object', () => {
    var object = { hey: 'how', goes: 'it' }
    var iterable = new ObjectIterable(object)
    var iterator = types.getIteratorFunction(iterable).call(iterable)

    expect(iterator.next()).to.deep.equal({done: false, value: ['goes', 'it']})
    expect(iterator.next()).to.deep.equal({done: false, value: ['hey', 'how']})
    expect(iterator.next()).to.deep.equal({done: true, value: undefined })
  })
})
