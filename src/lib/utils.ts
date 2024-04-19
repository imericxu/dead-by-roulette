import { type Route } from "next";

/**
 * Type guard for enums.
 */
export function isEnumValue<T extends Record<string, string>>(
  obj: Readonly<T>,
  value: string,
): value is T[keyof T] {
  return Object.values(obj).includes(value);
}

/**
 * Check that `child` is a subroute of `parent`.
 */
export function isSubRouteOf(parent: Route, child: Route): boolean {
  return child.startsWith(parent);
}

/**
 * Add return query to a route if it exists.
 */
export function buildReturnUrl(route: Route, returnUrl: string | null): Route {
  return returnUrl === null ? route : `${route}?return=${returnUrl}`;
}

/**
 * Pick a random element from an array.
 *
 * Uses Math.random() to generate a random index.
 */
export function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Pick n random elements from an array without replacement.
 *
 * Uses the Fisher-Yates shuffle algorithm on an array of indices to avoid
 * copying or shifting elements.
 */
export function pickNRandomWithoutReplacement<T>(
  arr: readonly T[],
  count: number,
): T[] {
  if (count > arr.length) {
    throw new Error("Cannot pick more elements than in the array.");
  }

  // Use indices to avoid copying the array.
  const indices: number[] = Array.from({ length: arr.length }, (_, i) => i);
  const result: T[] = [];

  // Use swap to avoid shifting elements.
  for (let i = 0; i < count; ++i) {
    const index: number = Math.floor(Math.random() * (indices.length - i));
    result.push(arr[indices[index]]);
    indices[index] = indices[indices.length - 1 - i];
  }

  return result;
}