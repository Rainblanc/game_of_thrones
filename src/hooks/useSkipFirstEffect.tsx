import { useEffect, useRef } from 'react';

const useSkipFirstEffect = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    effect();
  }, deps);
};

export default useSkipFirstEffect;
