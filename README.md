happy parse
------

A safe expression parse that makes you happy.

```
var parse  = require('happy-parse');

var obj = {
    a: {
        b: {
            c: 'jack'
        }
    },
    x: {
        y: function() {
            return "hello";
        }

    }
};

parse('a.b.c', obj);  => 'jack'
parse('a.b.c.e.f', obj); => undefined, won't throw error
parse('x.y()', obj) => 'hello'
parse('t.f()', obj) => undefined, won't throw error

```

Do you feel happier?
