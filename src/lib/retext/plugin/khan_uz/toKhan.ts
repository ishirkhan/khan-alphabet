import { visit } from "unist-util-visit";
import { Alphabet, AlphaKind, SEPARATE_MARK } from "../../../alphabet";
import { CharNode } from "../../charNode";

const alphabet = new Alphabet(AlphaKind.KhanUz);

/**
 * khan-uz 转换 khan
 * @returns
 */
export function khanUzToKhan() {
  return (tree) => {
    visit(tree, "CharNode", converter as any);
  };
}
function converter(
  node: CharNode,
  _index: number,
  _parent: { children: CharNode[] }
) {
  // 不处理
  if (node.isWhiteSpace() || node.isNumber()) {
    return;
  }
  if (node.value === "\u{200d}") {
    node.value = "h";
  }

  if (alphabet.hasChar(node.value) === false) {
    return;
  }

  // 处理 n+g 在一起的情况
  if (node._pre && node._pre === "n" && node.value === "g") {
    node.value = SEPARATE_MARK + node.value;
  }
  node.value = alphabet.getAlpha(node.value).khan;
}
