/**
 * Returns an array of items from the items iterable.
 *
 * @param {Iterable} items
 * @method array
 * @returns Array
 */
export function array(items) {
  return [ for (item of items) item ];
}

/**
 * Enumerates over items in an Iterable, calling the callback (with "this" set
 * to the context) for each item of the iterable, then yields each item in turn.
 *
 * @param {Iterable} items iterated over
 * @param {Function} cb called for each item
 * @param {Object} context applied to each cb
 * @returns Generator
 */
export function* forEach(items, cb, context) {
  for (var item of items) {
    cb.call(context, item);
    yield item;
  }
}

/**
 * Enumerates over items in an Iterable, calling the callback (with "this" set
 * to the context) for each item of the iterable, and yielding that item every
 * time the cb returns a "truthy" value.
 *
 * @param {Iterable} items iterated over
 * @param {Function} cb called for each item
 * @param {Object} context applied to each cb
 * @returns Generator
 */
export function* filter(items, cb, context) {
  for (var item of items) {
    if (cb.call(context, item)) {
      yield item;
    }
  }
}

/**
 * Grabs amount of items from an Iterable, returning an array of them.
 *
 * @param {Iterable} items
 * @param {Integer} amount
 * @returns Array
 */
export function grab(items, amount) {
  return array(take(items, amount));
}

/**
 * Takes items from an Iterable, yielding the given amount.
 *
 * @param {Iterable} items
 * @param {Integer} amount
 * @returns Generator
 */
export function* take(items, amount) {
  amount = Math.floor(amount);

  if (isNaN(amount)) {
    throw new TypeError('Expected amount to be an integer');
  }

  for (var item of items) {
    if (amount <= 0) break;

    amount -= 1;
    yield item;
  }
}
