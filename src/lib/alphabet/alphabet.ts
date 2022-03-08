import { Alpha, AlphaKind } from "./alpha";
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
  }

  get_table() {
    return this.table;
  }
  get_map(keyKind: AlphaKind | undefined = undefined) {
    if (!keyKind) {
      keyKind = this.kind;
    }
    const alphabetMap: AlphabetMap = {};
    this.table.forEach((alpha) => {
      alphabetMap[alpha.get_char(keyKind)] = alpha;
    });

    return alphabetMap;
  }
  get_hemze() {
    return this.table[0];
  }
}
