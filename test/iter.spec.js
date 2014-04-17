import iter from '../src/iter'
import ObjectIterable from '../src/ObjectIterable'

describe('iter', () => {

  it('throws TypeError when passed in object isn\'t an iterable, generator, or an object that inherits from Object.prototype or null', () => {
    expect(iter.bind(iter, /.*/)).to.throw(TypeError)
    expect(iter.bind(iter, '')).to.throw(TypeError)
    expect(iter.bind(iter, null)).to.throw(TypeError)
    expect(iter.bind(iter, (new class {}))).to.throw(TypeError)
  })

  // FIXME: Figure out how to enable generators in testing environments and not
  // transpile a generator function to pass in a real one
  it.skip('converts a generator function to an iterable by calling it', () => {

  })

  it('converts a plain object to an iterable', () => {
    expect(iter.isIterable(iter({})._iterable)).to.be.true
  })

  it('returns an array from a iterable', () => {
    var array = iter.array({
      [Symbol.iterator]: () => ({ next: B=> ({ done: true, value: void(0) }) })
    })

    expect(Array.isArray(array)).to.be.true
    expect(array.length).to.equal(0)
  })

  it('returns the iterable object', () => {
    var array = []

    expect(iter(array).iterable()).to.equal(array)
  })

  it('returns the first item in an iterable object', () => {
    var array = [1]

    expect(iter(array).first()).to.equal(1)
  })

  it('forEach iterates over an iterable', () => {
    var array = [1,2]
    var copy  = []

    iter(array).forEach(value => copy.push(value))

    expect(copy).to.deep.equal(array)
  })

  it('filters an iterable', () => {
    var array = [1,'hum',2,'ho',3]
    var isString = test => typeof test === 'string'

    expect(iter(array).filter(isString).array()).to.deep.equal(['hum', 'ho'])
  })

  it('iterates over an iter as an iterable', () => {
    for (var val of iter(['hi'])) {
      expect(val).to.equal('hi')
    }
  })

  it('throws when attempted to directly extend it', () => {
    expect(() => { iter.wont = 'work' }).to.throw()
    expect(() => { iter.prototype.doesnt = 'either' }).to.throw()
  })

  it('allows extensions by calling the extend static method', () => {
    var list = [1,2,3]
    var extended = iter.extend({
      funkytown() { return new extended(this.iterable()) }
    })

    expect(extended(list).funkytown().iterable()).to.equal(list)
    expect(extended.funkytown(list).iterable()).to.equal(list)
  })

  it('allows extensions by extending the class', () => {
    var list = [1,2,3]

    class extended extends iter {
      constructor(...args) {
        if (!(this instanceof extended)) return new extended(...args)
        super(...args)
      }

      funkytown() { return new extended(this.iterable()) }
    }

    iter.staticify(extended)

    expect(extended(list).funkytown().iterable()).to.equal(list)
    expect(extended.funkytown(list).iterable()).to.equal(list)
  })
})
