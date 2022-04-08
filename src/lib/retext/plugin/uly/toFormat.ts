import { visit } from "unist-util-visit";
import { SEPARATE_MARK, TRANSLATIONAL_MARK } from "../../../alphabet";
import { CharNode } from "../../charNode";

const pairChars = ["s", "e", "o", "z", "g", "c", "n"]; // 将可能会和 h 组合生成新字符的组合字符 比如 sh  zh gh

let ignoreConvert = false;
/**
 * uly 格式化
 * @returns
 */
export function ulyToFormat() {
  return (tree) => {
    // 防止缓存
    ignoreConvert = false;
    visit(tree, "CharNode", converter as any);
  };
}

function _handleH(node: CharNode) {
  // 双字符时忽略 h
  const h = node.value.toLowerCase();
  if (
    h === SEPARATE_MARK &&
    pairChars.indexOf(node?._pre?.toLowerCase()) !== -1
  ) {
    node.value = "";
    return;
  }
  /**
   * 因uly 是用 ' 来做的分界符，这里以防万一 ' 和 h 两个都兼容一下子
   */
  // nhg 处理
  if (node.value === "nh") {
    node.value = "n\u{200d}";
  }

  if (node.value === "eh") {
    node.value = "ë";
  }
  if (node.value === "oh") {
    node.value = "ö";
  }
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
  if (node.value === TRANSLATIONAL_MARK) {
    ignoreConvert = !ignoreConvert;
  }

  // ' 符号我们需要处理
  if (node.isAsciiAZ() === false && node.value !== "'") {
    return;
  }

  if (ignoreConvert) {
    return;
  }
  // 合并字符 h
  const nextChar = node._next?.toLowerCase();
  if (
    nextChar === SEPARATE_MARK &&
    pairChars.indexOf(node.value?.toLowerCase()) !== -1
  ) {
    node.value = node.value + nextChar;
    node._value = node.value;
  }
  _handleH(node);

  // replace v to ü
  if (node.value === "v") {
    node.value = "ü";
  }
}
