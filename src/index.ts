/**
 * ### HCIDFactoryOptions
 *
 * @property {Number} machineId - The machine identifier (0-1023)
 * @property {Number} processId - The process identifier (0-255)
 *
 * @property {Number} offset - The offset of the timestamp, defaults to 0
 *
 * @property {Number} sequence - The sequence number (0-4095), defaults to 0
 */

type HCIDFactoryOptions = {
  machineId: number;
  processId: number;
  offset: number;
  sequence: number;
};

class HCID {
  id: bigint;

  constructor(id: bigint) {
    this.id = id;
  }

  toString(): string {
    return this.id.toString();
  }
}

export default class HCIDFactory {
  options: HCIDFactoryOptions;

  constructor(options: HCIDFactoryOptions) {
    this.options = options;
  }

  pack(
    timestamp: bigint,
    machineId: number,
    processId: number,
    sequence: number,
  ): HCID {
    // Create a 64-bit ID
    const id =
      (timestamp << BigInt(23)) +
      (BigInt(machineId) << BigInt(13)) +
      (BigInt(processId) << BigInt(5)) +
      BigInt(sequence);

    return new HCID(id);
  }

  generate(): HCID {
    const timestamp = Date.now() - this.options.offset;
    const machineId = this.options.machineId;
    const processId = this.options.processId;
    const offset = this.options.offset;

    if (this.options.sequence > 4095) {
      this.options.sequence = 0;
    } else {
      this.options.sequence++;
    }

    const sequence = this.options.sequence;

    return this.pack(
      BigInt(timestamp - offset),
      machineId,
      processId,
      sequence,
    );
  }
}
