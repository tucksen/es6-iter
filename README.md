iter
====

  Iter is a functional helper library for ES6 iterables. It's API is similiar to
Underscore JS, with a few key differences. First it'll Iterate over any ES6
iterable or iterator, or any transpiled iterable or iterator from the Traceur
ES6 Transpiler. Second, it's lazy by default...

Getting Started
===============

In NodeJS
---------
  In your project directory run:
    npm install --save es6-iter
  
  Start your Node program with the command line argument --harmony. Then use it
like so:
    var iter = require('es6-iter').iter;

    // A convoluted way to print 'Hello World'
    iter(function*() { yield 'hello world!' })
      .forEach(function(string) {
        console.log(string);
      })
      .array();

In the Browser
--------------

### Installing It
  If you have Bower installed, in your project directory run:

    bower install es6-iter

  If you have Git installed, in your project directory run:

    git clone https://github.com/jdt/es6-iter
  
  Otherwise find the download repo button on this page and save it to your
project directory.

### Consuming It

#### Inside an ES6 JS File

  Loading Iter in any ES6 environment is the simplest way to get the library.

    import iter from 'es6-iter/src/iter';
    console.log(iter([1,2,3]).array()); // Prints 1, 2, 3

#### With System Polyfill from Traceur

  You can load Iter as a script that injects it's packages into the System
polyfill used by Traceur. This is the suggested way to consume Iter in an ES5
JS environment given you have to load the Traceur runtime as a dependency to
Iter. To do this you include the runtime and bundled script in your HTML page:

    <script src="es6-iter/node_modules/traceur/bin/traceur-runtime.js"></script>
    <script src="es6-iter/out/system/iter.js"></script>
    <script>
      (function() {
        console.log(iter([1,2,3]).array()); // Prints 1, 2, 3
      })();
    </script>

#### With AMD

  Add iter and traceur-runtime to your requirejs config as a package:

    requirejs.config({
      paths: {
        'traceur': 'es6-iter/node_modules/traceur/bin/traceur-runtime'
      },
      packages: [
        { name: 'iter', main: 'index.js', location: 'es6-iter/out/amd', }
      ]
    })

  Use it in any of your modules like so:

    define(['iter'], function(iter) {
      iter = iter.iter;

      // Prints 1, 2, 3
      console.log(iter([1,2,3]).array());
    })
