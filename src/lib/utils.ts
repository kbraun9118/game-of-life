import { onDestroy } from "svelte";
import type { Map } from "./types";

/**
 * Utility function for creating a range of numbers
 *
 * @param from start inclusive
 * @param to end exclusive
 * @returns array representation of range
 */
export function range(from: number, to: number): number[] {
  return Array.from({ length: to - from }, (v, k) => k + from);
}

export function ticker(func: () => void) {
  let interval: number | undefined;
  let delay = 1000;

  const start = () => {
    stop();
    interval = setInterval(func, delay);
  };

  const stop = () => {
    if (interval !== undefined) {
      clearInterval(interval);
      interval = undefined;
    }
  };

  const increase = () => {
    delay *= 0.5;
    if (interval !== undefined) start();
  };

  const decrease = () => {
    delay *= 2;
    if (interval !== undefined) start();
  };

  onDestroy(() => {
    stop();
  });

  return { start, stop, increase, decrease };
}

export function tick(map: Map, maxX: number, maxY: number) {
  const alive = map
    .flatMap((r, y) => r.map((b, x) => ({ x, y, b })))
    .filter(({ b }) => b);

  const deadNeighbors: { [key: number]: Set<number> } = alive
    .flatMap(({ x, y }) => neighbors(x, y, maxX, maxY))
    .filter(({ x, y }) => !map[y][x])
    .reduce((acc, { x, y }) => {
      if (acc[x]) {
        acc[x].add(y);
      } else {
        acc[x] = new Set([y]);
      }
      return acc;
    }, {} as { [key: number]: Set<number> });

  const toKill = alive.filter(({ x, y }) => {
    let ns = neighbors(x, y, maxX, maxY).filter(({ x, y }) => map[y][x]);
    return ns.length < 2 || ns.length > 3;
  });

  const toLive = [];

  for (const x in deadNeighbors) {
    for (const y of deadNeighbors[x]) {
      let ns = neighbors(+x, y, maxX, maxY).filter(({ x, y }) => map[y][x]);
      if (ns.length === 3) {
        toLive.push({ x: +x, y });
      }
    }
  }

  toKill.forEach(({ x, y }) => (map[y][x] = false));
  toLive.forEach(({ x, y }) => (map[y][x] = true));
}

function neighbors(x: number, y: number, maxX: number, maxY: number) {
  const ns = [];
  for (let i = -1; i < 2; i++) {
    let nx = x + i;
    if (nx < 0 || nx >= maxX) continue;
    for (let j = -1; j < 2; j++) {
      let ny = y + j;
      if ((i == 0 && j == 0) || ny < 0 || ny >= maxY) continue;
      ns.push({ x: nx, y: ny });
    }
  }
  return ns;
}
