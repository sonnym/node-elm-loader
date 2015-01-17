Node Elm Loader
===============

A simple way to interoperate between [Elm](http://elm-lang.org/) and [NodeJS](http://nodejs.org/).
Useful for sharing code between display and model logic, which holding it together with the rich
Node ecosystem, for example, building your client-side components and minifying them with the rest
of your assets!

Installation
------------

You will need to already have the Elm platform installed on your system. Please find the relevant
instructions [here](http://elm-lang.org/Install.elm) and a NodeJS development environment for v0.10.x.

Then, simply add `elm-loader` as a dependency in your `package.json` or run `npm -g elm-loader`.

Usage
-----

First, write a simple module in Elm and expose a port! Due to a current
[bug](https://github.com/elm-lang/elm-compiler/issues/856) in the compiler, you need to supply a
dummy `main` function. Once this is resolved, it will be possible to proceed without the boilerplate.

``` Elm
module TickingPort where

import Signal
import Signal ((<~), Signal)

import Time

import Text
import Graphics.Element (Element)
main : Element
main = Text.asText "main"

port messageOut : Signal String
port messageOut = Signal.map toString (Time.every Time.second)
```

Next, wire import your module into Node!

``` JavaScript
var path = require("path");
var Elm = require("elm-loader");

var compiledCode = Elm(path.resolve(__dirname, "ticking_port.elm"), __dirname);

compiledCode.emitter.on("messageOut", function(message) {
  console.log(message)
});
```

Watch it tick!

```
$ node test.js
1418683956865
1418683957870
1418683958873
1418683959874
1418683960875
^C
```

You can also access the `ports` property, rather than the `emitter` on the object
returned by the top level factory function and subscribe as you would with a
[typical setup](http://elm-lang.org/learn/Ports.elm).

Caveats
-------

The loader supports conventional CamelCase filenames for the Elm modules they contain.
If you prefer to split thw words in your filenames with underscores, they will automatically
be inflected to infer the module they contain, e.g. `ticking_port.elm` will correspond to the
`TickingPort` module above.

If you are defining ports *into* Elm, you also need to supply a second argument to the factory
function to define the defaults for those functions, e.g.

```Javascript
var echoPort = Elm(path.resolve(__dirname, "fixtures/echo_port.elm"), "fixtures", {
  messageIn: ""
});
```

Example
-------

To try it out, clone this repository, run `npm link` and then run `node example/test.js`!
