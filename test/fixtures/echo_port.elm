module EchoPort where

port messageIn : Signal String

port messageOut : Signal String
port messageOut = messageIn
