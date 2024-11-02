import { expect, test } from "bun:test";
import HCIDFactory from "./index";
import ora from "ora";
import cliSpinners from "cli-spinners";

function unique(array: string[]): string[] {
  const arr = new Array<string>();
  for (let i = 0; i < array.length; i++) {
    if (!arr.includes(array[i])) {
      arr.push(array[i]);
    }
  }
  return arr;
}

test("Uniqueness", () => {
  // Generate 100000 ids
  const ids = new Array<string>();

  const HCID = new HCIDFactory({
    machineId: 0,
    processId: 0,
    offset: 0,
    sequence: 0,
  });

  const spinner = ora({
    text: "Generating IDs...",
    spinner: cliSpinners.material,
  }).start();

  for (let i = 0; i < 1000; i++) {
    const id = HCID.generate().toString();
    ids.push(id);
  }

  spinner.text = "Checking uniqueness...";

  // Check if all ids are unique
  expect(ids.length).toBe(1000);

  spinner.succeed("Enough IDs generated");

  const uniqueSpinner = ora({
    text: "Checking uniqueness...",
    spinner: cliSpinners.material,
  }).start();

  // Check if there are no duplicates
  expect(unique(ids).length).toBe(1000); // 1000 unique ids

  uniqueSpinner.succeed("All IDs are unique");
});
