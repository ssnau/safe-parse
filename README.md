happy parse
------

A safe expression parse that makes you happy.

install
-----

```
npm install happy-parse
```

Usage
---

```javascript
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

// parse a string into a safe function and then provide a context for it.
parse('a.b.c')(obj);  => 'jack'
parse('a.b.c.e.f')(obj); => undefined, won't throw error
parse('x.y()')(obj) => 'hello'
var f = parse('t.f()');
f(obj) => undefined, won't throw error
var p = {
  t: {
   f: function () { return "farm" }
  }
};
// re-use f to execute on object `p`
f(p) => 'farm"

// a more simple style
var $eval = parse.eval;
$eval(obj, 'a.b.c'); => 'jack'
$eval(obj, 'a.b.c.e.f'); => undefined, won't throw error
$eval(obj, 'x.y()') => 'hello'
$eval(obj, 't.f()') => undefined, won't throw error
```

Do you feel happier?

