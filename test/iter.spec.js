module types from '../src/types'

import iter from '../src/iter'
import ObjectIterable from '../src/ObjectIterable'
import { Iterator, Options } from '../src/iter'

describe('iter', () => {
  var generator = eval('(function() { return function*(){}})()')
  var iterator = new Iterator(() => ({ done: true, value: undefined }))
  var iterNow = iter.bind(null, new Options(null, false));

  it('allows extensions by calling the extend static method', () => {
    var extended = iter.extend({
      funkytown() { return new extended(types.getIteratorFunction(this)) }
    })
    var list  = [1,2,3]
    var tests = [ extended(list).funkytown(), extended.funkytown(list) ]

    tests.forEach(test =>
      expect([ for (n of test) n ]).to.deep.equal(list)
    )
  })

  it('allows extensions by extending the class', () => {
    class extended extends iter {
      constructor(...args) {
        if (!(this instanceof extended)) return new extended(...args)
        return super(...args)
      }

      funkytown() { return new extended(this.iterator()) }
    }
    iter.staticify(extended)

    var list  = [1,2,3]
    var tests = [ extended(list).funkytown(), extended.funkytown(list) ]

    tests.forEach(test =>
      expect([ for (n of test) n ]).to.deep.equal(list)
    )
  })

  it('accepts an iterator object', () => {
    expect(() => iter(iterator)).to.not.throw()
  })

  it('accepts a traceur generated generator function', () => {
    var funky  = function*() { yield 1; yield 2; }
    var funked = [ for (num of iter(funky)) num ]

    expect(funked).to.deep.equal([1, 2])
  })

  it('accepts a generator function', () => {
    expect(() => iter(generator)).to.not.throw()
  })

  //FIXME: Native comprehension is only supported in firefox so we're nixing it
  //var comprehension = eval('(for (num of [1,2,3]) num)');
  it.skip('accepts an generator comprehension', () => {
  })

  it('accepts a function that returns an iterator', () => {
    expect(() => iter(() => iterator)).to.not.throw()
  })

  it('accepts an iterable', () => {
    expect(() => iter({ '@@iterable': () => iterator})).to.not.throw()
  })

  it('accepts a plain object', () => {
    expect(() => iter({})).to.not.throw()
    expect(() => iter(Object.create(null))).to.not.throw()
  })

  it('accepts Arrays/Maps/Sets', () => {
    expect(() => iter([])).to.not.throw()
    // FIXME
    //expect(() => iter(new Map)).to.not.throw()
    //expect(() => iter(new Set)).to.not.throw()
  })

  it('converts a plain object to an iterable', () => {
    var index = 0

    for (var [key, val] of iter({ '0': '0', '1': '1' })) {
      expect([key, val]).to.deep.equal([ index, index ].map(n => '' + n))
      index++
    }
  })

  it('copies an iterable', () => {
    var arr = ['a','b','c']
    var copied = iter(arr).copy()
    var copy = types.getIteratorFunction(copied).call(copied)

    arr.forEach((num) =>
      expect(copy.next().value).to.equal(num)
    )
    expect(copy.next().done).to.equal(true)
  })

  it('throws a TypeError when passed an object that cannot be coerced to an iterator', () => {
    // FIXME: Strings should be enumerable in the near future
    ['', /.*/, null, undefined, (new class {}), (() => {})].forEach(test =>
      expect(() => iter(test)).to.throw(TypeError)
    )
  })

  it('throws when attempting to directly extend it', () => {
    expect(() => { iter.wont = 'work' }).to.throw()
    expect(() => { iter.prototype.doesnt = 'either' }).to.throw()
  })
})
