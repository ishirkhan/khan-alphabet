import { unified } from "unified";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { khanUzToKhan } from "./plugin/khan_uz";

const processor = unified()
  .use(baseParser)
  .use(khanUzToKhan)
  .use(baseCompiler as any);
const result = processor.processSync("vnge êliŝ");
console.log("the result", result.value);

export function demo() {}
