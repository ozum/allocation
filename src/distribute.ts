import type { BigNumber } from "bignumber.js";
import type { Decimal } from "decimal.js";

/** Object types supported by this library. */
export type Numeric = BigNumber | Decimal;

/** Options */
export interface Options {
  scale?: number | undefined;
}

function round(number: number, scale: number): number {
  const power = 10 ** scale;
  return Math.round(Number((Math.abs(number) * power).toPrecision(15))) / power;
}

function fraction<T extends Numeric>(value: T, divider: T | number, multiplier: T | number): T {
  return "multipliedBy" in value
    ? (value.dividedBy(divider as never).multipliedBy(multiplier as never) as T)
    : (value.dividedBy(divider as never).times(multiplier as never) as T);
}

function distributeNumber(value: number, shares: number[], options: Options): number[] {
  const { scale } = options;
  const totalShares = shares.reduce((sum, share) => sum + share, 0);
  let sumDistribution = 0;

  return shares.map((share, i) => {
    const amount = i === shares.length - 1 ? value - sumDistribution : (value / totalShares) * share;
    const rounded = scale === undefined ? amount : round(amount, scale);
    sumDistribution += rounded;
    return rounded;
  });
}

function distributeDecimal(value: Numeric, shares: (Numeric | number)[], options: Options): Numeric[] {
  const { scale } = options;
  const totalShares = shares.reduce((sum: Numeric, share) => sum.plus(share as never), value.minus(value as never));
  let sumDistribution = value.minus(value as never);

  return shares.map((share, i) => {
    const amount = i === shares.length - 1 ? value.minus(sumDistribution as never) : fraction(value, totalShares, share);
    const rounded = scale === undefined ? amount : amount.decimalPlaces(scale);
    sumDistribution = sumDistribution.plus(rounded as never);
    return rounded;
  }) as Numeric[];
}

/**
 * This function distributes a given value based on shares.
 * When the sum of the shares equals 100, it functions akin to percentages.
 *
 * @param value is the total value to distribute.
 * @param shares is shares (weights) to distribute.
 * @param scale if specified, all results are rounded up to the given number of decimal places.
 * @returns distributed results.
 *
 * @example
 * const result = distribute(200, [45, 55]); // [90, 110]
 */
export function distribute(value: number, shares: number[], options?: Options): number[];
/**
 * This function distributes a given `BigNumber.js` or `Decimal.js` value based on shares.
 * When the sum of the shares equals 100, it functions akin to percentages.
 *
 * @param value is the total value to distribute.
 * @param shares is shares (weights) to distribute.
 * @param scale if specified, all results are rounded up to the given number of decimal places.
 * @returns distributed results.
 *
 * @example
 * const resultB = distribute(BigNumber(200), [45, 55]); // [BigNumber(90), BigNumber(110)]
 * const resultD = distribute(new Decimal(200), [45, 55]); // [new Decimal(90), new Decimal(110)]
 */
export function distribute(value: Numeric, shares: (Numeric | number)[], options?: Options): Numeric[];
export function distribute<T extends Numeric | number>(value: T, shares: (Numeric | number)[], options: Options = {}): T[] {
  const result =
    typeof value === "number" ? distributeNumber(value, shares as number[], options) : distributeDecimal(value, shares, options);
  return result as T[];
}
