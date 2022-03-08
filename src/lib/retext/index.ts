import { unified } from "unified";
import { Alphabet, AlphaKind } from "../alphabet";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { ugToKhanUz } from "./plugin/ug";

const UgAlphabet = new Alphabet(AlphaKind.Ug);

const processor = unified()
  .use(baseParser, { alphabet: UgAlphabet })
  .use(ugToKhanUz)
  .use(baseCompiler as any);
const result = processor.processSync("123شىرخان asdf");
console.log("the result", result.value);

export function demo() {}
