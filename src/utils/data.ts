import { hashNumberFromString } from "./base"

/**
 * 线性同余，根据seed产生随机数
 */
export const seededRandom = function (seed: number | string, max: number = 1, min: number = 0): number {
  if (typeof seed === 'string') {
    seed = hashNumberFromString(seed)
  }
  const mod = 233280;
  seed = (seed * 9301 + 49297) % mod;
  if (seed < 0) seed += mod; // 确保 seed 为正数
  const rnd = seed / mod;
  return min + rnd * (max - min);
}

/**
 * 根据种子随机获取数组中的元素
 */
export const seededEl = <T>(arr: Readonly<T[]>, seed: number): T => {
  return arr[seed % arr.length];
}

/**
 * 数组洗牌
 */
export const shuffleArray = <T>(array: Readonly<T[]>, seed: number): T[] => {
  const _array = [...array]
  let m = _array.length, t: T, i: number;

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  while (m) {
    i = Math.floor(random() * m--);
    t = _array[m];
    _array[m] = _array[i];
    _array[i] = t;
  }

  return _array;
}

/**
 * 随机canvas噪音
 */
export const randomCanvasNoise = (seed: number) => {
  const noise: number[] = []
  for (let i = 0; i < 10; i++) {
    noise.push(Math.floor(seededRandom(seed++, 255, 0)))
  }
  return noise
}

/**
 * 获取[x, y]，区间[-1, 1]
 */
export const randomWebglNoise = (seed: number): [number, number] => {
  return [seededRandom(seed, 1, -1), seededRandom(seed + 1, 1, -1)]
}

/**
 * 获取随机字体噪音
 */
export const randomFontNoise = (seed: number, mark: string): number => {
  const random = seededRandom((seed + hashNumberFromString(mark)) % Number.MAX_SAFE_INTEGER, 3, 0)
  if ((random * 10) % 1 < 0.9) return 0;
  return Math.floor(random) - 1;
}