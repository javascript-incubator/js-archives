import either from './Main.purs';

const runiffn = (maybeFn, ...args) =>
  (typeof maybeFn === 'function'
    ? either.Left.create(maybeFn)
    : either.Right.create(maybeFn)) |> either.either(fn => fn(...args))(_ => _);

export const iffn = maybeFn =>
  typeof maybeFn === 'function'
    ? either.Left.create(maybeFn)
    : either.Right.create(maybeFn);

export const { bimap } = either.bifunctorEither;

export const run = (...args) => either.either(fn => fn(...args))(_ => _);

export default runiffn;
