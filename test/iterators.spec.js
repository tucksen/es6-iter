module generators from '../src/iterators'

describe('iterators', () => {
  it('enumerates over all items', () => {
    var count = 0
    var items = [1,2,3]
    var gen = generators.forEach(items, n => count++)

    items.forEach(item =>
      expect(gen.next().value).to.equal(item)
    )
    expect(count).to.equal(3)
  })

  it('filter a set of items', () => {
    var expected  = [2,4]
    var generator = generators.filter([1,2,3,4], n => n % 2 === 0)

    expected.forEach(number =>
      expect(generator.next().value).to.equal(number)
    )
    expect(generator.next().done).to.be.true
  })

  it('grabs a number of items', () => {
    expect(generators.grab(['a','b','c'], 2)).to.deep.equal(['a', 'b'])
  })

  it('grabs a number of items, but fails when not passed a number', () => {
    expect(generators.grab.bind(null, [], 'hi')).to.throw(TypeError)
  })

  it('takes a number of items', () => {
    var items = ['a','b','c']
    var taken = items.slice(0, 2)
    var gen = generators.take(items, 2)

    taken.forEach(letter =>
      expect(gen.next().value).to.equal(letter)
    )
    expect(gen.next().done).to.be.true
  })
})
