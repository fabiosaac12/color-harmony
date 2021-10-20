import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useDidUpdateEffect = (
  fn: EffectCallback,
  dependences: DependencyList,
) => {
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (!firstUpdate.current) {
      return fn();
    } else {
      firstUpdate.current = false;
    }
  }, dependences);
};
