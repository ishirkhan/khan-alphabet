import { unified } from "unified";
import { baseCompiler } from "../../compiler";
import { baseParser } from "../../parser";
import { khanToKhanUz } from "./toKhanUz";

// khan to khan-uz
const processor = unified()
  .use(baseParser)
  .use(khanToKhanUz)
  .use(baseCompiler as any);

// khan to ug
const toUz = (text) => processor.processSync(text).toString();

describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "sh,kh",
      expect: toUz("shirkhan"),
      result: "ŝirħan",
    },
    {
      name: "eh,gh",
      expect: toUz("ehsil ishlargha tutush qilduq"),
      result: "êsil iŝlarĝa tutuŝ qilduq",
    },
    {
      name: "ch,ng",
      expect: toUz("chvshining"),
      result: "ĉvŝiniñ",
    },
    {
      name: "wh,zh",
      expect: toUz("whazirqi jhornal"),
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
      expect: toUz("ademh"),
      result: "ademh",
    },
    {
      name: "组词作用",
      expect: toUz("shirkhan"),
      result: "ŝirħan",
    },
    {
      name: "解决语义冲突作用",
      expect: toUz("vnhge ehlish"),
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
      expect: toUz("svrxet"),
      result: "svrxet",
    },
    {
      name: "辅音开头的单词没有hemze",
      expect: toUz("shirkhan"),
      result: "ŝirħan",
    },
    {
      name: "元音开头的单词无需加Hemze",
      expect: toUz("ademler"),
      result: "ademler",
    },
    {
      name: "元音开头带Hemze的单词需正常识别",
      expect: toUz("ademler"),
      result: "ademler",
    },
    {
      name: "符号开头的单词需正确处理Hemze",
      expect: toUz(",ademler"),
      result: ",ademler",
    },
    {
      name: "空白开头的单词需正确处理Hemze",
      expect: toUz(" ademler"),
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
      expect: toUz("mehning awazimni vnhge almaqchi"),
      result: "mêniñ awazimni vnge almaqĉi",
    },
    {
      name: "n gh, ngh => n+gh",
      expect: toUz("bashlanghan"),
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
      expect: toUz("shirkhan /hello world/ deydu"),
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
      expect: toUz("?;,"),
      result: "?;,",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("大小写区分", () => {
  const cases = [
    {
      name: "Shirkhan",
      expect: toUz("Shirkhan"),
      result: "Ŝirħan",
    },
    {
      name: "SHirkhan",
      expect: toUz("SHirkhan"),
      result: "Ŝirħan",
    },
    {
      name: "sHirkhan",
      expect: toUz("sHirkhan"),
      result: "ŝirħan",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
