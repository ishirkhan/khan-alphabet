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
      result: toUz("shirkhan"),
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
      name: "wh,zh",
      result: toUz("whazirqi jhornal"),
      expect: "ĥazirqi ĵornal",
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
      result: toUz("ademh"),
      expect: "ademh",
    },
    {
      name: "组词作用",
      result: toUz("shirkhan"),
      expect: "ŝirħan",
    },
    {
      name: "解决语义冲突作用",
      result: toUz("vnhge ehlish"),
      expect: "vn\u{200d}ge êliŝ",
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
      result: toUz("svrxet"),
      expect: "svrxet",
    },
    {
      name: "辅音开头的单词没有hemze",
      result: toUz("shirkhan"),
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
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("n g ng gh 语义冲突", () => {
  const cases = [
    {
      name: "n g ng",
      result: toUz("mehning awazimni vnhge almaqchi"),
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
      expect(item.expect).toEqual(item.result);
    });
  });
});

describe("终止符 '/' 测试", () => {
  const cases = [
    {
      name: "终止符包围的内容不做转换",
      result: toUz("shirkhan /hello world/ deydu"),
      expect: "ŝirħan /hello world/ deydu",
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
      result: toUz("?;,"),
      expect: "?;,",
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
      result: toUz("Shirkhan"),
      expect: "Ŝirħan",
    },
    {
      name: "SHirkhan",
      result: toUz("SHirkhan"),
      expect: "Ŝirħan",
    },
    {
      name: "sHirkhan",
      result: toUz("sHirkhan"),
      expect: "ŝirħan",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
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
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
