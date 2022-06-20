#!/usr/bin/env node

const transformer = require("hermes-profile-transformer").default;
const { writeFileSync } = require("fs");
const path = require("path");
const { argv } = require("process");

const hermesCpuProfilePath = argv[2];
const outputPath = argv[3];
const sourceMapPath = undefined;
const sourceMapBundleFileName = undefined;

if (!hermesCpuProfilePath || !outputPath) {
  console.log(
    "usage: npx @reeywhaar/hermes-profile-transformer %input.cpuprofile% %output.json%"
  );
  process.exit(0);
}

async function main() {
  try {
    const ip = path.resolve(hermesCpuProfilePath);
    const op = path.resolve(outputPath);

    const events = await transformer(
      // profile path is required
      ip,
      // source maps are optional
      sourceMapPath,
      sourceMapBundleFileName
    );

    return writeFileSync(op, JSON.stringify(events, null, 2), "utf-8");
  } catch (e) {
    console.log(err);
    process.exit(1);
  }
}

main();
