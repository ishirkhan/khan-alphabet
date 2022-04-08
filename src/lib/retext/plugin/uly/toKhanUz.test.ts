import { unified } from "unified";
import { baseCompiler } from "../../compiler";
import { baseParser } from "../../parser";
import { ulyToKhanUz } from "./toKhanUz";

// khan to khan-uz
const processor = unified()
  .use(baseParser)
  .use(ulyToKhanUz)
  .use(baseCompiler as any);

// khan to ug
const toUz = (text) => processor.processSync(text).toString();

describe("双字符测试 sh eh,oh,gh,ng,zh", () => {
  const cases = [
    {
      name: "sh",
      result: toUz("shirxan"),
      expect: "ŝirħan",
    },
    {
      name: "eh,gh",
      result: toUz("ehsil ishlargha tutush qilduq"),
      expect: "êsil iŝlarĝa tutuŝ qilduq",
    },
    {
      name: "ch,ng",
      result: toUz("chvshining"),
      expect: "ĉvŝiniñ",
    },
    {
      name: "zh",
      result: toUz("hazirqi zhornal"),
      expect: "ĥazirqi ĵornal",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

// 只能组词用，不能单独使用,有语义冲突作用
describe("h 字符规则测试", () => {
  const cases = [
    {
      name: "单独出现不做转换",
      result: toUz("ademh"),
      expect: "ademĥ",
    },
    {
      name: "组词作用",
      result: toUz("shirxan"),
      expect: "ŝirħan",
    },
    {
      name: "解决语义冲突作用",
      result: toUz("vn'ge ehlish"),
      expect: "vn\u{200d}ge êliŝ",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

describe("Hemze 规则测试", () => {
  const cases = [
    {
      name: "单词中间,元音前面的的 ' 当做Hemze",
      result: toUz("svr'et"),
      expect: "svrxet",
    },
    {
      name: "辅音开头的单词没有hemze",
      result: toUz("shirxan"),
      expect: "ŝirħan",
    },
    {
      name: "元音开头的单词无需加Hemze",
      result: toUz("ademler"),
      expect: "ademler",
    },
    {
      name: "元音开头带Hemze的单词需正常识别",
      result: toUz("ademler"),
      expect: "ademler",
    },
    {
      name: "符号开头的单词需正确处理Hemze",
      result: toUz(",ademler"),
      expect: ",ademler",
    },
    {
      name: "空白开头的单词需正确处理Hemze",
      result: toUz(" ademler"),
      expect: " ademler",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

describe("n g ng gh 语义冲突", () => {
  const cases = [
    {
      name: "n g ng",
      result: toUz("mehning awazimni vn'ge almaqchi"),
      expect: "mêniñ awazimni vn\u{200d}ge almaqĉi",
    },
    {
      name: "n gh, ngh => n+gh",
      result: toUz("bashlanghan"),
      expect: "baŝlanĝan",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

describe("终止符 '/' 测试", () => {
  const cases = [
    {
      name: "终止符包围的内容不做转换",
      result: toUz("shirxan /hello world/ deydu"),
      expect: "ŝirħan /hello world/ deydu",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

describe("标点符号", () => {
  const cases = [
    {
      name: "三个符号需要转移",
      result: toUz("?;,"),
      expect: "?;,",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

describe("大小写区分", () => {
  const cases = [
    {
      name: "Shirxan",
      result: toUz("Shirxan"),
      expect: "Ŝirħan",
    },
    {
      name: "SHirxan",
      result: toUz("SHirxan"),
      expect: "Ŝirħan",
    },
    {
      name: "sHirxan",
      result: toUz("sHirxan"),
      expect: "ŝirħan",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});

// 为了消除khan-uz的基础上编写Khan 内容时出现的 khanuz 的n+g被khan 识别成ng的语义冲突，khan-uz 的n+g 都改成 n+ 0x200d+g 的字符
describe("n+g 特例", () => {
  const cases = [
    {
      name: "n+g",
      expect: "vn\u{200d}ge êliŝ",
      result: toUz("vnhge ehlish"),
    },
    {
      name: "n+g",
      expect: "vn\u{200d}ge êliŝ",
      result: toUz("vn'ge ehlish"),
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});
