import { expect, test } from "bun:test";
import HCIDFactory from "./index";

function unique(array: string[]): string[] {
  const arr = new Array<string>();
  for (let i = 0; i < array.length; i++) {
    if (!arr.includes(array[i])) {
      arr.push(array[i]);
    }
  }
  return arr;
}

test("Uniqueness", async () => {
  // Generate 100000 ids
  const ids = new Array<string>();

  const HCID = new HCIDFactory({
    machineId: 0,
    processId: 0,
    offset: 0,
    sequence: 0,
  });

  for (let i = 0; i < 50000; i++) {
    const id = (await HCID.generate()).toString();
    ids.push(id);
  }

  // Check if all ids are unique
  expect(ids.length).toBe(50000);

  // Check if there are no duplicates
  expect(unique(ids).length).toBe(50000); // 10000 unique ids
});
