module EchoPort where

import Signal
import Signal ((<~), Signal)

import String

import Text
import Graphics.Element (Element)
main : Element
main = Text.asText "main"

port messageIn : Signal String

port messageOut : Signal String
port messageOut = messageIn
