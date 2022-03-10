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

  test("测试 Alphabet hasChar", () => {
    expect(UgAlphabet.hasChar("ا")).toEqual(true);
    expect(UgAlphabet.hasChar("ش")).toEqual(true);
    expect(UgAlphabet.hasChar("")).toEqual(false);
    expect(UgAlphabet.hasChar("100")).toEqual(false);
    expect(UgAlphabet.hasChar("?")).toEqual(false);
  });

  test("测试 Alphabet getAlpha", () => {
    expect(UgAlphabet.getAlpha("ا").khan).toEqual("a");
    expect(UgAlphabet.getAlpha("ش").khan).toEqual("sh");
    expect(UgAlphabet.getAlpha("").khan).toEqual("");
    expect(UgAlphabet.getAlpha("100").khan).toEqual("100");
    expect(UgAlphabet.getAlpha("?").khan).toEqual("?");
  });

  test("测试 Alphabet getAlpha  大小写", () => {
    const alphabet = new Alphabet(AlphaKind.Khan);
    expect(alphabet.getAlpha("Sh").khan).toEqual("Sh");
    expect(alphabet.getAlpha("SH").khan).toEqual("Sh");
    expect(alphabet.getAlpha("sH").khan).toEqual("sh");
  });
});
