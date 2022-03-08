import { AlphaKind } from "./alpha";
import { Alphabet } from "./alphabet";

const UgAlphabet = new Alphabet();

describe("测试 Alphabet", () => {
  test("测试 Alphabet 用例字段", () => {
    expect(UgAlphabet.kind).toEqual(AlphaKind.Ug);
    expect(UgAlphabet.table.length).toEqual(33);
  });

  test("测试 Alphabet getTable", () => {
    expect(UgAlphabet.getTable().length).toEqual(33);
  });

  test("测试 Alphabet getMap", () => {
    let map = UgAlphabet.getMap();
    expect(Object.keys(map).length).toEqual(33);
    expect(Object.keys(map)[5]).toEqual("و");

    expect(Object.keys(UgAlphabet.getMap(AlphaKind.Khan))[26]).toEqual("ng");
  });

  test("测试 Alphabet getHemze", () => {
    let map = UgAlphabet.getMap();
    expect(UgAlphabet.getHemze().ug).toEqual("ئ");
    expect(UgAlphabet.getHemze().khan).toEqual("x");
  });
});
