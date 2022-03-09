import {
  punctuation,
  whiteSpace,
  numerical,
} from "parse-latin/lib/expressions";

import type { Node } from "unist";

export class CharNode implements Node {
  public type: string = "CharNode";
  protected _value: string = "";
  protected _pre: string = "";
  protected _next: string = "";
  constructor(public value: string, public index: number, public text: string) {
    this._value = value;
    this._pre = text[index - 1];
    this._next = text[index + 1];
  }

  isAscii() {
    return /[\x00-\xFFêëôöüĉžŝĝñĥħĵ]/.test(this.value);
  }

  isAsciiAZ() {
    return /[a-zA-Zêëôöüĉžŝĝñĥħĵ]/.test(this.value);
  }

  isPunctuation() {
    return punctuation.test(this.value);
  }

  isWhiteSpace() {
    return whiteSpace.test(this.value);
  }

  isNumber() {
    return numerical.test(this.value);
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
