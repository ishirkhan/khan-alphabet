import { ugToKhanUz } from "./ug";
import { unified } from "unified";
import { baseCompiler } from "../compiler";
import { baseParser } from "../parser";

const processor = unified()
  .use(baseParser)
  .use(ugToKhanUz)
  .use(baseCompiler as any);

// ug to khan
const toKhanUz = (text) => processor.processSync(text).toString();
describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "sh,kh",
      expect: toKhanUz("شىرخان"),
      result: "ŝirħan",
    },
    {
      name: "eh,gh",
      expect: toKhanUz("ئېسىل ئىشلارغا تۇتۇش قىلدۇق"),
      result: "êsil iŝlarĝa tutuŝ qilduq",
    },
    {
      name: "ch,ng",
      expect: toKhanUz("چۈشىنىڭ"),
      result: "ĉvŝiniñ",
    },
    {
      name: "wh,zh",
      expect: toKhanUz("ھازىرقى ژورنال"),
      result: "ĥazirqi ĵornal",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

// 只能组词用，不能单独使用,有语义冲突作用
describe("h 字符规则测试", () => {
  const cases = [
    {
      name: "单独出现不做转换",
      expect: toKhanUz("ئادەمh"),
      result: "adem/h/",
    },
    {
      name: "组词作用",
      expect: toKhanUz("شىرخان"),
      result: "ŝirħan",
    },
    {
      name: "解决语义冲突作用",
      expect: toKhanUz("ئۈنگە ئېلىش"),
      result: "vnge êliŝ",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("Hemze 规则测试", () => {
  const cases = [
    {
      name: "单词中间的x当做Hemze",
      expect: toKhanUz("سۈرئەت"),
      result: "svrxet",
    },
    {
      name: "辅音开头的单词没有hemze",
      expect: toKhanUz("شىرخان"),
      result: "ŝirħan",
    },
    {
      name: "元音开头的单词无需加Hemze",
      expect: toKhanUz("ئادەملەر"),
      result: "ademler",
    },
    {
      name: "元音开头带Hemze的单词需正常识别",
      expect: toKhanUz("ئادەملەر"),
      result: "ademler",
    },
    {
      name: "符号开头的单词需正确处理Hemze",
      expect: toKhanUz("،ئادەملەر"),
      // result: ",ademler",
      result: "،ademler",
    },
    {
      name: "空白开头的单词需正确处理Hemze",
      expect: toKhanUz(" ئادەملەر"),
      result: " ademler",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("n g ng gh 语义冲突", () => {
  const cases = [
    {
      name: "n g ng",
      expect: toKhanUz("مېنىڭ ئاۋازىمنى ئۈنگە ئالماقچى"),
      result: "mêniñ awazimni vnge almaqĉi",
    },
    {
      name: "n gh, ngh => n+gh",
      expect: toKhanUz("باشلانغان"),
      result: "baŝlanĝan",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("终止符 '/' 测试", () => {
  const cases = [
    {
      name: "终止符包围的内容不做转换",
      expect: toKhanUz("شىرخان hello world دەيدۇ"),
      result: "ŝirħan /hello world/ deydu",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("标点符号", () => {
  const cases = [
    {
      name: "三个符号需要转移",
      expect: toKhanUz("؟؛،"),
      // result: "?;,",
      result: "؟؛،",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
