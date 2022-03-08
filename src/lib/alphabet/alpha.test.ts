import { Alpha, AlphaKind, IAlpha } from "./alpha";

const alpha = new Alpha({
  kind: AlphaKind.Ug,
  ug: "u",
  uly: "l",
  khan: "k",
  khanUz: "h",
  vowels: true,
  hemze: true,
} as IAlpha);

describe("测试 Alpha", () => {
  test("测试 Alpha 用例字段", () => {
    expect(alpha.kind).toEqual(AlphaKind.Ug);
    expect(alpha.ug).toEqual("u");
    expect(alpha.uly).toEqual("l");
    expect(alpha.khan).toEqual("k");
    expect(alpha.khanUz).toEqual("h");
    expect(alpha.vowels).toEqual(true);
    expect(alpha.hemze).toEqual(true);
  });

  test("测试Alpha get_char 方法", () => {
    expect(alpha.get_char()).toEqual("u");
    expect(alpha.get_char(AlphaKind.KhanUz)).toEqual("h");
  });
});
