import {program} from "commander";

program.option('--logger <logger>', 'Set the logger mode', 'DEVELOPMENT');

program.parse();

export const option = program.opts();