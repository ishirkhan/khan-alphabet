import { unified } from "unified";
import { baseCompiler } from "../../compiler";
import { baseParser } from "../../parser";
import { khanUzToUg } from "./toUg";

const processor = unified()
  .use(baseParser)
  .use(khanUzToUg)
  .use(baseCompiler as any);
// khan-uz to ug
const converter = (text) => processor.processSync(text).toString();
describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "sh,kh",
      expect: "شىرخان",
      result: converter("ŝirħan"),
    },
    {
      name: "eh,gh",
      expect: "ئېسىل ئىشلارغا تۇتۇش قىلدۇق",
      result: converter("êsil iŝlarĝa tutuŝ qilduq"),
    },
    {
      name: "ch,ng",
      expect: "چۈشىنىڭ",
      result: converter("ĉvŝiniñ"),
    },
    {
      name: "wh,zh",
      expect: "ھازىرقى ژورنال",
      result: converter("ĥazirqi ĵornal"),
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
      expect: "ئادەمh",
      result: converter("adem/h/"),
    },
    {
      name: "组词作用",
      expect: "شىرخان",
      result: converter("ŝirħan"),
    },
    {
      name: "解决语义冲突作用",
      expect: "ئۈنگە ئېلىش",
      result: converter("vnge êliŝ"),
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
      expect: "سۈرئەت",
      result: converter("svrxet"),
    },
    {
      name: "辅音开头的单词没有hemze",
      expect: "شىرخان",
      result: converter("ŝirħan"),
    },
    {
      name: "元音开头的单词无需加Hemze",
      expect: "ئادەملەر",
      result: converter("ademler"),
    },
    {
      name: "元音开头带Hemze的单词需正常识别",
      expect: "ئادەملەر",
      result: converter("ademler"),
    },
    {
      name: "符号开头的单词需正确处理Hemze",
      expect: "،ئادەملەر",
      result: converter(",ademler"),
    },
    {
      name: "空白开头的单词需正确处理Hemze",
      expect: " ئادەملەر",
      result: converter(" ademler"),
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
      expect: "مېنىڭ ئاۋازىمنى ئۈنگە ئالماقچى",
      result: converter("mêniñ awazimni vnge almaqĉi"),
    },
    {
      name: "n gh, ngh => n+gh",
      expect: "باشلانغان",
      result: converter("baŝlanĝan"),
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
      expect: "شىرخان hello world دەيدۇ",
      result: converter("ŝirħan /hello world/ deydu"),
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
      expect: "؟؛،",
      result: converter("?;,"),
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
      expect: "ئۈنگە ئېلىش",
      result: converter("vn\u{200d}ge êliŝ"),
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
