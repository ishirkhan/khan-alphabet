import { Processor } from "unified";
import { CharNode } from "./charNode";

export function baseParser(this: Processor) {
  let parser = (text: string) => {
    return {
      type: "RootNode",
      children: Array.from(text).map((char, index) => {
        return new CharNode(char, index, text);
      }),
    };
  };

  Object.assign(this, { Parser: parser });
}
