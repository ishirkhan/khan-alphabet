import { unified } from "unified";
import { baseCompiler } from "../../compiler";
import { baseParser } from "../../parser";
import { khanUzToKhan } from "./toKhan";

// khan-uz to khan
const processor = unified()
  .use(baseParser)
  .use(khanUzToKhan)
  .use(baseCompiler as any);
// khan to ug
const toKhan = (text) => processor.processSync(text).toString();

describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "sh,kh",
      result: "shirkhan",
      expect: toKhan("ŝirħan"),
    },
    {
      name: "eh,gh",
      result: "ehsil ishlargha tutush qilduq",
      expect: toKhan("êsil iŝlarĝa tutuŝ qilduq"),
    },
    {
      name: "ch,ng",
      result: "chvshining",
      expect: toKhan("ĉvŝiniñ"),
    },
    {
      name: "wh,zh",
      result: "whazirqi jhornal",
      expect: toKhan("ĥazirqi ĵornal"),
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
      result: "ademh",
      expect: toKhan("ademh"),
    },
    {
      name: "组词作用",
      result: "shirkhan",
      expect: toKhan("ŝirħan"),
    },
    {
      name: "解决语义冲突作用",
      result: "vnhge ehlish",
      expect: toKhan("vnge êliŝ"),
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
      result: "svrxet",
      expect: toKhan("svrxet"),
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
      result: "mehning awazimni vnhge almaqchi",
      expect: toKhan("mêniñ awazimni vnge almaqĉi"),
    },
    {
      name: "n gh, ngh => n+gh",
      result: "bashlanghan",
      expect: toKhan("baŝlanĝan"),
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
      result: "shirkhan /hello world/ deydu",
      expect: toKhan("ŝirħan /hello world/ deydu"),
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
      result: "?;,",
      expect: toKhan("?;,"),
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
