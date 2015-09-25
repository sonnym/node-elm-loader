module TickingPort where

import Time
import Html exposing (text)

main = text "placeholder"

port messageOut : Signal String
port messageOut = Signal.map toString (Time.every Time.second)
