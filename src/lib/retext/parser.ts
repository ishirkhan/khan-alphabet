import { Processor } from "unified";
import { Alphabet, AlphaKind, TRANSLATIONAL_MARK } from "../alphabet";
import { CharNode } from "./charNode";

export type Options = {
  alphabet: Alphabet;
};

export function baseParser(this: Processor, options: Options) {
  const { alphabet } = options;

  let ignoreConvert = false;
  /**
   *
   * @param {string} value
   * @returns
   */
  let parser;
  switch (alphabet.kind) {
    case AlphaKind.Ug:
      parser = (value: string) => {
        ignoreConvert = false;
        return {
          type: "RootNode",
          children: Array.from(value).map((char, index) => {
            const node = new CharNode(char, index, value, alphabet, false);
            if (node.isAscii() && ignoreConvert === false) {
              ignoreConvert = true;
            } else if (ignoreConvert === true && node.isAscii() === false) {
              ignoreConvert = false;
            }

            node.ignoreConver = ignoreConvert;
            return node;
          }),
        };
      };
      break;
    case AlphaKind.Uly:
    case AlphaKind.Khan:
    case AlphaKind.KhanUz:
      parser = (value: string) => {
        ignoreConvert = false;
        return {
          type: "RootNode",
          children: Array.from(value).map((char, index) => {
            if (char === TRANSLATIONAL_MARK) {
              ignoreConvert = !ignoreConvert;
            }
            return new CharNode(char, index, value, alphabet, ignoreConvert);
          }),
        };
      };
      break;
  }
  Object.assign(this, { Parser: parser });
}
