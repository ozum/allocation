# Allocation

Distributes a given value based on shares. When the sum of the shares equals 100, it functions akin to percentages.

| Supported                 | Exact Calculation |
| ------------------------- | ----------------- |
| Native JS floating points | No                |
| bignumber.js              | Yes               |
| decimal.js                | Yes               |

## Usage with Floating Point Numbers

```ts
import { distribute } from "allocation";

const result = distribute(200, [45, 55]); // [90, 110]
```

## Usage with External Libraries

```ts
import { distribute } from "allocation";
import { BigNumber } from "bignumber.js";

const result = distribute(BigNumber(200), [45, 55]); // [BigNumber(90), BigNumber(110)]
```

## Exact Calculations

Floating point numbers (JS native numbers) are not suitable for exact calculations.

See the below example:

```ts
const shares = [49.9, 49.9, 0.2];
const result = distribute(100, shares); // [49.9, 49.9, 0.20000000000000284]
```

Sometimes when the results are rounded they seem exact, but they are not, different inputs may result in inexact calculations even when rounding.

```ts
const shares = [49.9, 49.9, 0.2];
const result = distribute(100, shares, { scale: 2 }); // [49.9, 49.9, 0.2] WARNING: Seems OK, but it is not.
```

Use external numeric libraries where exact calculations are needed. (i.e. monetary calculations)

```ts
import { BigNumber } from "bignumber.js";

const shares = [49.9, 49.9, 0.2];
const result = distribute(BigNumber(100), shares); // [BigNumber(49.9), BigNumber(49.9), BigNumber(0.2)]
```

## API

**distribute**(`value`, `shares`, `{ scale }`): [`Numeric`](README.md#numeric)[]

This function distributes a given `BigNumber.js` or `Decimal.js` value based on shares.
When the sum of the shares equals 100, it functions akin to percentages.

#### Parameters

| Name     | Type                                           | Description                                                |
| :------- | :--------------------------------------------- | :--------------------------------------------------------- |
| `value`  | [`Numeric`](README.md#numeric)                 | is the total value to distribute.                          |
| `shares` | (`number` \| [`Numeric`](README.md#numeric))[] | is shares (weights) to distribute.                         |
| `scale`  | `number`                                       | Number of digits after decimal point to round the results. |
