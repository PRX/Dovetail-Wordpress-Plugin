import { useEffect, useRef } from 'react';

export function useInterval<T = any> (
  callback: () => Promise<T>,
  fnCondition: (r:T) => boolean,
  delay: number,
  deps?: any[]
) {
  const savedCallback = useRef<typeof callback>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id: NodeJS.Timeout;
    const tick = async () => {
      try {
        const response =
          typeof savedCallback.current === 'function' &&
          (await savedCallback.current());
        if (fnCondition(response)) {
          id = setTimeout(tick, delay);
        } else {
          clearTimeout(id);
        }
      } catch (e) {
        console.error(e);
      }
    };
    tick();
    return () => id && clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};
