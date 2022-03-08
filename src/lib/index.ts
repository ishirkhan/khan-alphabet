export enum AlphaKind {
  Ug = "Ug",
  Uly = "Uly",
  Khan = "Khan",
  KhanUz = "KhanUz",
}

export const UG_CHARS = [
  "ئ",
  "ا",
  "ە",
  "ې",
  "ى",
  "و",
  "ۇ",
  "ۆ",
  "ۈ",
  "ب",
  "پ",
  "ت",
  "ج",
  "چ",
  "خ",
  "د",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "غ",
  "ق",
  "ف",
  "ك",
  "گ",
  "ڭ",
  "ل",
  "م",
  "ن",
  "ھ",
  "ۋ",
  "ي",
];
export const UG_VOWELS = ["ا", "ە", "ې", "ى", "و", "ۇ", "ۆ", "ۈ"];
export const ULY_CHARS = [
  "\u{200d}",
  "a",
  "e",
  "ë",
  "i",
  "o",
  "u",
  "ö",
  "ü",
  "b",
  "p",
  "t",
  "j",
  "ch",
  "x",
  "d",
  "r",
  "z",
  "zh",
  "s",
  "sh",
  "gh",
  "q",
  "f",
  "k",
  "g",
  "ng",
  "l",
  "m",
  "n",
  "h",
  "w",
  "y",
];
export const KHAN_CHARS = [
  "x",
  "a",
  "e",
  "eh",
  "i",
  "o",
  "u",
  "oh",
  "v",
  "b",
  "p",
  "t",
  "j",
  "ch",
  "kh",
  "d",
  "r",
  "z",
  "jh",
  "s",
  "sh",
  "gh",
  "q",
  "f",
  "k",
  "g",
  "ng",
  "l",
  "m",
  "n",
  "wh",
  "w",
  "y",
];
export const KHAN_UZ_CHARS = [
  "x",
  "a",
  "e",
  "ê",
  "i",
  "o",
  "u",
  "ô",
  "v",
  "b",
  "p",
  "t",
  "j",
  "ĉ",
  "ħ",
  "d",
  "r",
  "z",
  "ĵ",
  "s",
  "ŝ",
  "ĝ",
  "q",
  "f",
  "k",
  "g",
  "ñ",
  "l",
  "m",
  "n",
  "ĥ",
  "w",
  "y",
];

export type IAlpha = {
  kind: AlphaKind;
  ug: string;
  uly: string;
  khan: string;
  khanUz: string;
  vowels: boolean;
  hemze: boolean;
};
export class Alpha implements IAlpha {
  ug!: string;
  uly!: string;
  khan!: string;
  khanUz!: string;
  vowels!: boolean;
  hemze!: boolean;
  kind: AlphaKind = AlphaKind.Ug;
  constructor(alpha: IAlpha) {
    this.kind = alpha.kind;
    this.ug = alpha.ug;
    this.uly = alpha.uly;
    this.khan = alpha.khan;
    this.khanUz = alpha.khanUz;
    this.vowels = alpha.vowels;
    this.hemze = alpha.hemze;
  }

  get_char(kind: AlphaKind | undefined = undefined) {
    if (!kind) {
      kind = this.kind;
    }
    switch (kind) {
      case AlphaKind.Ug:
        return this.ug;
      case AlphaKind.Uly:
        return this.uly;
      case AlphaKind.Khan:
        return this.khan;
      case AlphaKind.KhanUz:
        return this.khanUz;
    }
  }
}

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
