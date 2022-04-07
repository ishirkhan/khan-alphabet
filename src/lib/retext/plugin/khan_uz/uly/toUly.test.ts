import { unified } from "unified";
import { baseCompiler } from "../../../compiler";
import { baseParser } from "../../../parser";
import { khanUzToUly } from "./";

// khan-uz to uly
const processor = unified()
  .use(baseParser)
  .use(khanUzToUly)
  .use(baseCompiler as any);
// khan to ug
const toUly = (text) => processor.processSync(text).toString();

describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "sh,kh",
      expect: "shirxan",
      result: toUly("ŝirħan"),
    },
    {
      name: "eh,gh",
      expect: "ësil ishlargha tutush qilduq",
      result: toUly("êsil iŝlarĝa tutuŝ qilduq"),
    },
    {
      name: "ch,ng",
      expect: "chüshining",
      result: toUly("ĉvŝiniñ"),
    },
    {
      name: "h,zh",
      expect: "hazirqi zhornal",
      result: toUly("ĥazirqi ĵornal"),
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
      expect: "ademh",
      result: toUly("ademh"),
    },
    {
      name: "组词作用",
      expect: "shirxan",
      result: toUly("ŝirħan"),
    },
    {
      name: "解决语义冲突作用",
      expect: "ün'ge ëlish",
      result: toUly("vnge êliŝ"),
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
      name: "单词中间的x当做Hemze",
      expect: "sür'et",
      result: toUly("svrxet"),
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
      expect: "mëning awazimni ün'ge almaqchi",
      result: toUly("mêniñ awazimni vnge almaqĉi"),
    },
    {
      name: "n gh, ngh => n+gh",
      expect: "bashlanghan",
      result: toUly("baŝlanĝan"),
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
      expect: "shirxan /hello world/ deydu",
      result: toUly("ŝirħan /hello world/ deydu"),
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
      expect: "?;,",
      result: toUly("?;,"),
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
      expect: "Shirxan",
      result: toUly("Ŝirħan"),
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
      expect: "ün'ge ëlish",
      result: toUly("vn\u{200d}ge êliŝ"),
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.result).toEqual(item.expect);
    });
  });
});
