import { unified } from "unified";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { ugToKhanUz } from "./plugin/ug";

const processor = unified()
  .use(baseParser)
  .use(ugToKhanUz)
  .use(baseCompiler as any);
// const result = processor.processSync("123 شىرخان asdf  ئادەم"); //ئادەمh
const result = processor.processSync("ئادەمh");
console.log("the result", result.value);

export function demo() {}
