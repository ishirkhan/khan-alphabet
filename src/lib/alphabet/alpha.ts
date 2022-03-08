export enum AlphaKind {
  Ug = "Ug",
  Uly = "Uly",
  Khan = "Khan",
  KhanUz = "KhanUz",
}

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
