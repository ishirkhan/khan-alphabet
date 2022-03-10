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
      expect: "shirkhan",
      result: toKhan("ŝirħan"),
    },
    {
      name: "eh,gh",
      expect: "ehsil ishlargha tutush qilduq",
      result: toKhan("êsil iŝlarĝa tutuŝ qilduq"),
    },
    {
      name: "ch,ng",
      expect: "chvshining",
      result: toKhan("ĉvŝiniñ"),
    },
    {
      name: "wh,zh",
      expect: "whazirqi jhornal",
      result: toKhan("ĥazirqi ĵornal"),
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
      expect: "ademh",
      result: toKhan("ademh"),
    },
    {
      name: "组词作用",
      expect: "shirkhan",
      result: toKhan("ŝirħan"),
    },
    {
      name: "解决语义冲突作用",
      expect: "vnhge ehlish",
      result: toKhan("vnge êliŝ"),
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
      expect: "svrxet",
      result: toKhan("svrxet"),
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
      expect: "mehning awazimni vnhge almaqchi",
      result: toKhan("mêniñ awazimni vnge almaqĉi"),
    },
    {
      name: "n gh, ngh => n+gh",
      expect: "bashlanghan",
      result: toKhan("baŝlanĝan"),
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
      expect: "shirkhan /hello world/ deydu",
      result: toKhan("ŝirħan /hello world/ deydu"),
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
      expect: "?;,",
      result: toKhan("?;,"),
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
      expect: "Shirkhan",
      result: toKhan("Ŝirħan"),
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
      expect: "vnhge ehlish",
      result: toKhan("vn\u{200d}ge êliŝ"),
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
