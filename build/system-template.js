import { iter } from 'es6-iter/iter';

System.register('es6-iter', function() {
  return {
    get iter() { return iter },
    get default() { return iter }
  };
});
