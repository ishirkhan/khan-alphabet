import { unified } from "unified";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { khanUzToUg } from "./plugin/khan_uz";

const processor = unified()
  .use(baseParser)
  .use(khanUzToUg)
  .use(baseCompiler as any);
const result = processor.processSync(
  "ŝirħan êlipbesi ŝirħanniñ turmuŝ we /english digendek / ħizmet iĥtiyaji vĉvn yasap ĉiqilĝan êlipbedur."
);
console.log("the result", result.value);

export function demo() {}
