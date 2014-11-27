import Random (range)

module RandomPort where

port messageOut : Signal Int
port messageOut = Random.range 1 10 (every (500 millisecond))
