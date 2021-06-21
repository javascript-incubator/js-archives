module Main where

import Data.Bifunctor (class Bifunctor)

data Either a b = Left a | Right b

instance bifunctorEither :: Bifunctor Either where
  bimap f _ (Left l) = Left (f l)
  bimap _ g (Right r) = Right (g r)

either :: forall a b c. (a -> c) -> (b -> c) -> Either a b -> c
either f _ (Left a) = f a
either _ g (Right b) = g b