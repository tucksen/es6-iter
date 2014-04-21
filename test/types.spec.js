module types from '../src/types'

describe('types', () => {
  var gen = eval('(function(){ return function*(){} })()')
  var noop = () => {};

  it('knows an native generator', () => {
    expect(types.isGenerator(gen)).to.be.true
  })

  it('knows an iterable object', () => {
    var areIterable =
        [ [], ({[Symbol.iterator](){}}), ({'@@iterator'(){}}) ]

    var notIterable =
        [ /.*/, ({}), false, true, (function(){}), null, undefined ]

    areIterable.forEach(test => expect(types.isIterable(test)).to.be.true)
    notIterable.forEach(test => expect(types.isIterable(test)).to.be.false)
  })

  it('knows an iterator', () => {
    expect(types.isIterator({ next(){} })).to.be.true
  })

  it('gets an iterator function', () => {
    expect(types.getIteratorFunction(gen)).to.equal(gen)
    expect(types.getIteratorFunction({[Symbol.iterator]:noop})).to.equal(noop)
    expect(types.getIteratorFunction({'@@iterator':noop})).to.equal(noop)
    expect(types.getIteratorFunction({})).to.be.null
  })

  // FIXME: No idea how to property test this. I would need to run different
  // tests in different browsers and then observe that outcome. Lots of work,
  // little payoff.
  it.skip('sets an iterator function', () => {
  })
})
