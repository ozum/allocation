allocation

# allocation

## Table of contents

### Interfaces

- [Options](interfaces/Options.md)

### Type Aliases

- [Numeric](README.md#numeric)

### Functions

- [distribute](README.md#distribute)

## Type Aliases

### Numeric

Ƭ **Numeric**: `BigNumber` \| `Decimal`

Object types supported by this library.

#### Defined in

distribute.ts:5

## Functions

### distribute

▸ **distribute**(`value`, `shares`, `options?`): `number`[]

This function distributes a given value based on shares.
When the sum of the shares equals 100, it functions akin to percentages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | is the total value to distribute. |
| `shares` | `number`[] | is shares (weights) to distribute. |
| `options?` | [`Options`](interfaces/Options.md) | - |

#### Returns

`number`[]

distributed results.

**`Example`**

```ts
const result = distribute(200, [45, 55]); // [90, 110]
```

#### Defined in

distribute.ts:61

▸ **distribute**(`value`, `shares`, `options?`): [`Numeric`](README.md#numeric)[]

This function distributes a given `BigNumber.js` or `Decimal.js` value based on shares.
When the sum of the shares equals 100, it functions akin to percentages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Numeric`](README.md#numeric) | is the total value to distribute. |
| `shares` | (`number` \| [`Numeric`](README.md#numeric))[] | is shares (weights) to distribute. |
| `options?` | [`Options`](interfaces/Options.md) | - |

#### Returns

[`Numeric`](README.md#numeric)[]

distributed results.

**`Example`**

```ts
const resultB = distribute(BigNumber(200), [45, 55]); // [BigNumber(90), BigNumber(110)]
const resultD = distribute(new Decimal(200), [45, 55]); // [new Decimal(90), new Decimal(110)]
```

#### Defined in

distribute.ts:75
