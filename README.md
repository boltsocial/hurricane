# Hurricane

> Unique and scalable ID format

Like a real hurricane, this ID format is unique across the globe and scalable to any size.

## Inspiration

This project is inspired by Twitter(X)'s Snowflake ID format and Sony's Sonyflake.

## Specification

- 64-bit bigint
- 41 bits for time in 2 milliseconds increments since the custom epoch/origin (Midnight, July 4, 2024)
- 10 bits for a machine id
- 12 bits for a sequence number
