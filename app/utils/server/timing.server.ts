export type Timings = Record<
  string,
  Array<{ time: number; start?: never } | { time?: never; start: number }>
>;

export function makeTimings(type: string) {
  const timings: Timings = {
    [type]: [{ start: performance.now() }],
  };
  Object.defineProperty(timings, 'toString', {
    value: function () {
      return getServerTimeHeader(timings);
    },
    enumerable: false,
  });
  return timings;
}

function createTimer(type: string) {
  const start = performance.now();
  return {
    end(timings: Timings) {
      let timingType = timings[type];

      if (!timingType) {
        timingType = timings[type] = [];
      }
      timingType.push({ time: performance.now() - start });
    },
  };
}

export async function time<ReturnType>(
  fn: Promise<ReturnType> | (() => ReturnType | Promise<ReturnType>),
  {
    type,
    timings,
  }: {
    type: string;
    timings?: Timings;
  },
): Promise<ReturnType> {
  const timer = createTimer(type);
  const promise = typeof fn === 'function' ? fn() : fn;
  if (!timings) return promise;

  const result = await promise;

  timer.end(timings);
  return result;
}

export function getServerTimeHeader(timings?: Timings) {
  if (!timings) return '';
  return Object.entries(timings)
    .map(([key, timingInfos], i) => {
      const dur = timingInfos
        .reduce((acc, timingInfo) => {
          const time = timingInfo.time ?? performance.now() - timingInfo.start;
          return acc + time;
        }, 0)
        .toFixed(1);
      return [
        `0${i}_${key.replaceAll(/(:| |@|=|;|,|\/|\\)/g, '_')}`,
        `dur=${dur}`,
      ]
        .filter(Boolean)
        .join(';');
    })
    .join(',');
}

export function combineServerTimings(headers1: Headers, headers2: Headers) {
  const newHeaders = new Headers(headers1);
  newHeaders.append('Server-Timing', headers2.get('Server-Timing') ?? '');
  return newHeaders.get('Server-Timing') ?? '';
}
