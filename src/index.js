import either from './Main.purs';

export const iffn = maybeFn =>
  typeof maybeFn === 'function'
    ? either.Left.create(maybeFn)
    : either.Right.create(maybeFn);

export const run = (...args) => either.either(fn => fn(...args))(_ => _);

export const { bimap } = either.bifunctorEither;

export default (maybeFn, ...args) => iffn(maybeFn) |> run(...args);
