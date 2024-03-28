import { BigNumber } from "bignumber.js";
import { Decimal } from "decimal.js";
import { distribute } from "./distribute.js";

const shares = [49.9, 49.9, 0.2];
const expectedBigNumber = [49.9, 49.9, 0.2].map((d) => BigNumber(d));
const expectedDecimal = [49.9, 49.9, 0.2].map((d) => new Decimal(d));

describe("distribute()", () => {
  it("should distribute primitive values", () => {
    const result = distribute(100, shares);
    const expectedNumber = [49.9, 49.9, 0.200_000_000_000_002_84]; // Floats are not suitable for exact calculations.
    expect(result).toStrictEqual(expectedNumber);
  });

  it("should distribute negative primitive values", () => {
    const result = distribute(-100, shares);
    const expectedNumber = [49.9, 49.9, 0.200_000_000_000_002_84].map((d) => d * -1); // Floats are not suitable for exact calculations.
    expect(result).toStrictEqual(expectedNumber);
  });

  it("should distribute and round primitive values", () => {
    const result = distribute(100, shares, { scale: 2 });
    const expectedNumber = [49.9, 49.9, 0.2]; // Floats are not suitable for exact calculations.
    expect(result).toStrictEqual(expectedNumber);
  });

  it("should distribute Decimal.js values", () => {
    const result = distribute(new Decimal(100), shares);
    expect(result).toStrictEqual(expectedDecimal);
  });

  it("should distribute BigNumber.js values", () => {
    const result = distribute(BigNumber(100), shares);
    expect(result).toStrictEqual(expectedBigNumber);
  });

  it("should distribute and scale BigNumber.js values", () => {
    const result = distribute(BigNumber(100), shares, { scale: 2 });
    expect(result).toStrictEqual(expectedBigNumber);
  });

  it("should distribute BigNumber.js values with decimal shares", () => {
    const result = distribute(
      BigNumber(100),
      shares.map((d) => new Decimal(d)),
    );
    expect(result).toStrictEqual(expectedBigNumber);
  });
});
