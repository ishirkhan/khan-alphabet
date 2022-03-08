import {
  punctuation,
  whiteSpace,
  numerical,
} from "parse-latin/lib/expressions";
import { Alphabet, AlphaKind, UG_CHARS } from "../alphabet";

export class CharNode {
  public type: string = "CharNode";
  protected _value: string = "";
  constructor(
    public value: string,
    public index: number,
    public word: string,
    public alphabet: Alphabet,
    public ignoreConver: boolean = false
  ) {
    this._value = value;
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

  isUgChar() {
    return UG_CHARS.includes(this.value);
  }

  getAlpha() {
    return this.alphabet.map[this._value];
  }

  replaceTo(alphaKind: AlphaKind | undefined = undefined) {
    if (!alphaKind) {
      alphaKind = this.alphabet.kind;
    }
    const alpha = this.getAlpha();
    if (!alpha) return;
    this.value = alpha.getChar(alphaKind);
  }
}
