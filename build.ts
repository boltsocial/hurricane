import Bun, { $ } from "bun";
import tsconfig from "./tsconfig.json";
import cliSpinners from "cli-spinners";
import ora from "ora";
import chalk from "chalk";

function bigError(text: string, width: number) {
  console.log("\n");
  console.log(chalk.bgRedBright(" ".repeat(width)));
  console.log(
    chalk.bgRedBright(
      " ".repeat(width / 2 - Math.round(text.length / 2)) +
        " " +
        chalk.bold(text) +
        " " +
        " ".repeat(width / 2 - Math.round(text.length / 2) - 1),
    ),
  );
  console.log(chalk.bgRedBright(" ".repeat(width)));
  console.log("\n");
}

// Lint

async function lint() {
  const lintSpinner = ora({
    text: "Linting...",
    spinner: cliSpinners.material,
  }).start();

  const start = Date.now();

  const lint = await $`bun lint`.quiet();

  const end = Date.now();

  if (lint.exitCode === 0) {
    lintSpinner.succeed("Lint completed in " + chalk.bold(end - start) + "ms");
  } else {
    console.clear();
    bigError("Lint Error", 20);
    lintSpinner.stop();
    console.error(lint.stderr);
  }
}

async function build() {
  const buildSpinner = ora({
    text: "Building...",
    spinner: cliSpinners.material,
  }).start();

  try {
    const start = Date.now();

    await Bun.build({
      entrypoints: ["src/index.ts"],
      outdir: tsconfig.compilerOptions.outDir,
      minify: true,
    });

    await $`bun build:declaration`.quiet();

    const end = Date.now();

    buildSpinner.succeed(
      "Build completed in " + chalk.bold(end - start) + "ms",
    );
  } catch (error) {
    console.clear();
    bigError("Build Error", 40);
    buildSpinner.stop();
    console.error(error);
  }
}

async function rollup() {
  const rollupSpinner = ora({
    text: "Rolling up...",
    spinner: cliSpinners.material,
  }).start();

  const start = Date.now();

  await $`bunx rollup dist/index.js --file dist/index.cjs --format cjs`.quiet();

  const end = Date.now();

  rollupSpinner.succeed(
    "Rollup completed in " + chalk.bold(end - start) + "ms",
  );
}

async function main() {
  lint().then(build).then(rollup);
}

main();
