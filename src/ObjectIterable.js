class ObjectIterable {
  constructor(obj) {
    if (!(this instanceof ObjectIterable)) return new ObjectIterable(obj);

    this._obj = obj;
  }

  *[Symbol.iterator](obj = this._obj) {
    var keys = Object.keys(obj).sort();

    for (var i = 0, l = keys.length; i < l; i++) {
      yield [keys[i], obj[keys[i]]];
    }
  }
}

Object.freeze(ObjectIterable);
Object.freeze(ObjectIterable.prototype);

export { ObjectIterable, ObjectIterable as default };
