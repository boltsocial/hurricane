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
  lastTimestamp: bigint = BigInt(0);

  constructor(options: HCIDFactoryOptions) {
    this.options = options;
  }

  async pack(
    timestamp: bigint,
    machineId: number,
    processId: number,
    sequence: number,
  ): Promise<HCID> {
    // Create a 64-bit ID
    const id =
      (timestamp << BigInt(23)) +
      (BigInt(machineId) << BigInt(13)) +
      (BigInt(processId) << BigInt(5)) +
      BigInt(sequence);

    return new HCID(id);
  }

  async generate(): Promise<HCID> {
    const timestamp = Date.now() - this.options.offset;

    const machineId = this.options.machineId;
    const processId = this.options.processId;
    const offset = this.options.offset;

    if (this.lastTimestamp !== BigInt(timestamp)) {
      this.options.sequence = 0;
      this.lastTimestamp = BigInt(timestamp);
    } else if (this.options.sequence >= 4096) {
      // Sequence number has reached the maximum value
      // Wait until the next millisecond
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.generate());
        }, 1);
      });
    } else {
      this.options.sequence++;
    }

    const sequence = this.options.sequence;

    return await this.pack(
      BigInt(timestamp - offset),
      machineId,
      processId,
      sequence,
    );
  }
}
