import {
  punctuation,
  whiteSpace,
  numerical,
} from "parse-latin/lib/expressions";

import type { Node } from "unist";

export class CharNode implements Node {
  public type: string = "CharNode";
  public _value: string = "";
  public _pre: string = "";
  public _next: string = "";
  constructor(public value: string, public index: number, public text: string) {
    this._value = value;
    this._pre = text[index - 1];
    this._next = text[index + 1];
  }

  isAscii() {
    return /[\x00-\xFFêëôöüĉžŝĝñĥħĵ]/.test(this._value);
  }

  isAsciiAZ() {
    return /[a-zA-Zêëôöüĉžŝĝñĥħĵ]/.test(this._value);
  }

  isPunctuation(tchar: string | undefined = undefined) {
    if (tchar) {
      return punctuation.test(tchar);
    }
    return punctuation.test(this._value);
  }

  isWhiteSpace() {
    return whiteSpace.test(this._value);
  }

  isNumber() {
    return numerical.test(this._value);
  }
  // getAlpha() {
  //   return this.alphabet.map[this._value];
  // }

  // replaceTo(alphaKind: AlphaKind | undefined = undefined) {
  //   if (!alphaKind) {
  //     alphaKind = this.alphabet.kind;
  //   }
  //   const alpha = this.getAlpha();
  //   if (!alpha) return;
  //   this.value = alpha.getChar(alphaKind);
  // }
}
