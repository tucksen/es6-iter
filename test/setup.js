__karma__.loaded = function() {
  Object.keys(__karma__.files)
    .filter(/.*/.test.bind(/\.spec\.js$/))
    .map(function(n) { return n.replace(/^\/base\//, '').replace(/\.js$/, '') })
    .map(function(n) {
      if (!System.get(n)) throw new Error('Failed to get '+n)
    });

  __karma__.start();
};

