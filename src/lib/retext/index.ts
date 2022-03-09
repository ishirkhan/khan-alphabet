import { unified } from "unified";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { khanToKhanUz } from "./plugin/khan";
const processor = unified()
  .use(baseParser)
  .use(khanToKhanUz)
  .use(baseCompiler as any);
const result = processor.processSync(
  "shirkhan ShirKhan SHirkHan /english/ ehlipbesi vnhge ehlish"
);
console.log("the result", result.value);

export function demo() {}
