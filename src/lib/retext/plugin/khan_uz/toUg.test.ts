import { khanUzToUg } from ".";
import { unified } from "unified";
import { baseCompiler } from "../../compiler";
import { baseParser } from "../../parser";

const processor = unified()
  .use(baseParser)
  .use(khanUzToUg)
  .use(baseCompiler as any);

// khan-uz to ug
const convert = (text) => processor.processSync(text).toString();
describe("双字符测试 sh,kh eh,gh,ch,ng,zh,wh", () => {
  const cases = [
    {
      name: "ŝirħan êlipbesi ŝirħanniñ turmuŝ we /english digendek / ħizmet iĥtiyaji vĉvn yasap ĉiqilĝan êlipbedur.",
      expect: convert(
        "ŝirħan êlipbesi ŝirħanniñ turmuŝ we /this area will not be convertted / ħizmet iĥtiyaji vĉvn yasap ĉiqilĝan êlipbedur."
      ),
      result:
        "شىرخان ئېلىپبەسى شىرخاننىڭ تۇرمۇش ۋە this area will not be convertted  خىزمەت ئىھتىياجى ئۈچۈن ياساپ چىقىلغان ئېلىپبەدۇر.",
    },
  ];

  cases.forEach((item) => {
    test(item.name, () => {
      expect(item.expect).toEqual(item.result);
    });
  });
});
