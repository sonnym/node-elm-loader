Elm.ConstantPort = Elm.ConstantPort || {};
Elm.ConstantPort.make = function (_elm) {
   "use strict";
   _elm.ConstantPort = _elm.ConstantPort || {};
   if (_elm.ConstantPort.values)
   return _elm.ConstantPort.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ConstantPort";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var messageOut = Native.Ports.portOut("messageOut",
   Native.Ports.outgoingSignal(function (v) {
      return v;
   }),
   Signal.constant("test from elm"));
   _elm.ConstantPort.values = {_op: _op};
   return _elm.ConstantPort.values;
};