module EchoPort where

import Signal
import Signal ((<~), Signal)

import Text
import Graphics.Element (Element)
main : Element
main = Text.asText "main"

port messageIn : Signal String

port messageOut : Signal String
port messageOut = toString <~ (Signal.merge (Signal.constant "") messageIn)
