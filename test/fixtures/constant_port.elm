module ConstantPort where

import Signal
import Signal ((<~), Signal)

import Time

import Text
import Graphics.Element (Element)
main : Element
main = Text.asText "main"

port messageOut : Signal String
port messageOut = Signal.sampleOn (Time.every Time.second) (Signal.constant "test from elm")
