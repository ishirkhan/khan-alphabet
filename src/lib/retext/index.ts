import { unified } from "unified";
import { baseCompiler } from "./compiler";
import { baseParser } from "./parser";
import { khanToKhanUz } from "./plugin/khan";
import { ugToKhanUz } from "./plugin/ug";
import { ulyToKhanUz } from "./plugin/uly";
import { khanUzToKhan, khanUzToUg, khanUzToUly } from "./plugin/khan_uz";

export function khanTextToKhanUz(text: string) {
  return unified()
    .use(baseParser)
    .use(khanToKhanUz)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}

export function ugTextToKhanUz(text: string) {
  return unified()
    .use(baseParser)
    .use(ugToKhanUz)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}

export function ulyTextToKhanUz(text: string) {
  return unified()
    .use(baseParser)
    .use(ulyToKhanUz)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}

// 桥梁
export function khanUzTextToUg(text: string) {
  return unified()
    .use(baseParser)
    .use(khanUzToUg)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}

export function khanUzTextToKhan(text: string) {
  return unified()
    .use(baseParser)
    .use(khanUzToKhan)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}

export function khanUzTextToUly(text: string) {
  return unified()
    .use(baseParser)
    .use(khanUzToUly)
    .use(baseCompiler as any)
    .processSync(text)
    .toString();
}
