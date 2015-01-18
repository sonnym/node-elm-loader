module Failing where

import Text
import Graphics.Element (Element)

main : Element
main = Text.asText "main"

port uninitialized : Signal String
