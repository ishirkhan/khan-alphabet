import { visit } from "unist-util-visit";
import { Alphabet, AlphaKind } from "../../../alphabet";
import { CharNode } from "../../charNode";

const alphabet = new Alphabet(AlphaKind.KhanUz);

let ignoreConvert = false;
/**
 * khan 字母换母语
 * @returns
 */
export function khanUzToUg() {
  return (tree) => {
    ignoreConvert = false;
    visit(tree, "CharNode", converter as any);
  };
}

function converter(
  node: CharNode,
  _index: number,
  _parent: { children: CharNode[] }
) {
  if (node.isWhiteSpace() || node.isNumber()) {
    return;
  }
  if (node.value === "/") {
    ignoreConvert = !ignoreConvert;
    node.value = node.value.replace("/", "");
    node._value = node.value;
    return;
  }
  // 不做处理
  if (!alphabet.hasChar(node.value) || ignoreConvert) {
    return;
  }

  // 开始转换
  const currentNodeAlpha = alphabet.getAlpha(node.value);
  node.value = currentNodeAlpha.ug;
  // 补充 hemze
  if (
    currentNodeAlpha.vowels &&
    (node._pre === undefined ||
      node._pre === " " ||
      node.isPunctuation(node._pre))
  ) {
    node.value = alphabet.getHemze().ug + node.value;
  }
}
