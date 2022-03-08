import { AlphaKind } from "./alpha";
import { Alphabet } from "./alphabet";

const UgAlphabet = new Alphabet();

describe("测试 Alphabet", () => {
  test("测试 Alphabet 用例字段", () => {
    expect(UgAlphabet.kind).toEqual(AlphaKind.Ug);
    expect(UgAlphabet.table.length).toEqual(33);
  });

  test("测试 Alphabet get_table", () => {
    expect(UgAlphabet.get_table().length).toEqual(33);
  });

  test("测试 Alphabet get_map", () => {
    let map = UgAlphabet.get_map();
    expect(Object.keys(map).length).toEqual(33);
    expect(Object.keys(map)[5]).toEqual("و");

    expect(Object.keys(UgAlphabet.get_map(AlphaKind.Khan))[26]).toEqual("ng");
  });

  test("测试 Alphabet get_hemze", () => {
    let map = UgAlphabet.get_map();
    expect(UgAlphabet.get_hemze().ug).toEqual("ئ");
    expect(UgAlphabet.get_hemze().khan).toEqual("x");
  });
});
