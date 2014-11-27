module ConstantPort where

port messageOut : Signal String
port messageOut = constant "test from elm"
