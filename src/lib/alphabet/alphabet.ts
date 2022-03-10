import { Alpha, AlphaKind, IAlpha } from "./alpha";
import {
  KHAN_CHARS,
  KHAN_UZ_CHARS,
  UG_CHARS,
  UG_VOWELS,
  ULY_CHARS,
} from "./constants";

export type AlphabetMap = { [key: string]: Alpha };

export class Alphabet {
  public table: Alpha[] = [];
  public map: AlphabetMap = {};

  constructor(public kind: AlphaKind = AlphaKind.Ug) {
    UG_CHARS.forEach((char, index) => {
      const alpha = new Alpha({
        kind: kind,
        ug: UG_CHARS[index],
        uly: ULY_CHARS[index],
        khan: KHAN_CHARS[index],
        khanUz: KHAN_UZ_CHARS[index],
        vowels: UG_VOWELS.includes(char),
        hemze: index === 0,
      });
      this.table.push(alpha);
    });

    this.map = this.getMap(kind);
  }

  getTable() {
    return this.table;
  }
  getMap(keyKind: AlphaKind | undefined = undefined) {
    if (!keyKind) {
      keyKind = this.kind;
    }
    const alphabetMap: AlphabetMap = {};
    this.table.forEach((alpha) => {
      alphabetMap[alpha.getChar(keyKind)] = alpha;
    });

    return alphabetMap;
  }

  getHemze() {
    return this.table[0];
  }

  hasChar(tChar: string) {
    return tChar.toLowerCase() in this.map;
  }

  getAlpha(tChar: string) {
    const lowered = tChar.toLowerCase();
    let alpha: IAlpha;

    if (this.hasChar(lowered)) {
      alpha = JSON.parse(JSON.stringify(this.map[lowered])); // 做一次深拷贝
    } else {
      let a: IAlpha = {
        kind: this.kind,
        ug: tChar,
        uly: tChar,
        khan: tChar,
        khanUz: tChar,
        vowels: false,
        hemze: false,
      };

      alpha = new Alpha(a);
    }
    if (typeof tChar !== "string") return alpha;
    if (this.kind === AlphaKind.Ug) return alpha;
    /**
     * 处理一下大小写  sh,sH -> s. Sh,SH -> S
     */
    if (tChar.charAt(0).toLowerCase() !== tChar.charAt(0)) {
      alpha.khanUz =
        alpha.khanUz.charAt(0).toUpperCase() + alpha.khanUz.slice(1);
      alpha.khan = alpha.khan.charAt(0).toUpperCase() + alpha.khan.slice(1);
      alpha.uly = alpha.uly.charAt(0).toUpperCase() + alpha.uly.slice(1);
    }
    return alpha;
  }
}
