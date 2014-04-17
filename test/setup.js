__karma__.loaded = function() {};

Object.keys(__karma__.files)
  .filter(/.*/.test.bind(/\.spec\.js$/))
  .map(function(n) { return n.replace(/^\/base\//, '').replace(/\.js$/, '') })
  .forEach(function(n) {
    System.get(n)
  });

__karma__.start();
