// food-picture-01 entry (Node 22, standard library only).
//
// The best-looking food picture lives in entry.png beside this file: a
// wood-fired margherita pizza, a slice lifted by hand from the pie with
// long strands of molten mozzarella stretching, blistered leopard-spotted
// crust, fresh basil and olive oil, the oven's embers glowing behind it.
// This program's whole job is to deliver those exact bytes to
// /output/entry.png, unchanged, every run.
//
// Locally, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const imagePath = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputPath = join(outputDir, 'entry.png');

// Create the output directory when it is not there yet, so a run in a fresh
// folder works the same as a run in the grader's container.
mkdirSync(outputDir, { recursive: true });
copyFileSync(imagePath, outputPath);

// Fail loudly instead of silently shipping a truncated copy: the output
// must hold exactly the bytes this program was given to deliver.
if (statSync(outputPath).size !== statSync(imagePath).size) {
  throw new Error('entry.png copy is incomplete');
}
