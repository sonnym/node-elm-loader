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
