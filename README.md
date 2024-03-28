# Allocation

Distributes a given value based on shares. When the sum of the shares equals 100, it functions akin to percentages.

## Usage

```ts
import { distribute } from "allocation";

const result = distribute(200, [45, 55]); // [90, 110]
```

```ts
import { distribute } from "allocation";
import { BigNumber } from "bignumber.js";

const result = distribute(BigNumber(200), [45, 55]); // [BigNumber(90), BigNumber(110)]
```
