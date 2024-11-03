# Hurricane

> Unique and scalable ID format

Like a real hurricane, this ID format is unique across the globe and scalable to any size.

## Installation

```sh
# npm
npm install @boltsocial/hurricane
# yarn
yarn add @boltsocial/hurricane
# pnpm
pnpm add @boltsocial/hurricane
# bun
bun install @boltsocial/hurricane
```

## Usage

```ts
import { Hurricane } from "@boltsocial/hurricane";

const idFactory = new Hurricane();

const id = idFactory.generate();

console.log(id.toString());
```

## Inspiration

This project is inspired by Twitter(X)'s Snowflake ID format and Sony's Sonyflake.

## Specification

- 64-bit bigint
- 41 bits for time in 2 milliseconds increments since the custom epoch/origin (Midnight, July 4, 2024)
- 10 bits for a machine id
- 12 bits for a sequence number ~ 4096 possible IDs per machine per millisecond
- 1 bit to reserve for signed int
