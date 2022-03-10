import { visit } from "unist-util-visit";
import {
  Alphabet,
  AlphaKind,
  SEPARATE_MARK,
  TRANSLATIONAL_MARK,
} from "../../../alphabet";
import { CharNode } from "../../charNode";

const alphabet = new Alphabet(AlphaKind.Khan);

let ignoreConvert = false;
/**
 * khan 转换 khan-uz
 * @returns
 */
export function khanToKhanUz() {
  return (tree) => {
    // 防止缓存
    ignoreConvert = false;
    visit(tree, "CharNode", converter as any);
  };
}

function _handleNG(node: CharNode) {
  // n+g n+gh
  const nnext = node.text[node.index + 2];
  if (node.value === "n" && node._next?.toLowerCase() === "g") {
    if (nnext && nnext.toLowerCase() === SEPARATE_MARK) {
      // n+gh
      node.value = "n";
    } else {
      node.value = "ng";
    }
  }

  if (
    node._pre?.toLowerCase() === "n" &&
    node.value === "g" &&
    node._next?.toLowerCase() !== "h"
  ) {
    node.value = ""; // 因为 n+g 时 n 已经和g合并了。所以可以去掉g
  }
}

function _handleH(node: CharNode) {
  // 忽略 h
  if (node.value.toLowerCase() === SEPARATE_MARK) {
    node.value = "";
  }
  // nhg 处理
  if (node.value === "nh") {
    node.value = "n";
  }
}

function _handleUpperCase(node: CharNode) {
  if (node._value.length === 2 && node._value !== node._value.toLowerCase()) {
    node.value = node.value.toUpperCase();
  }
}

function _replaceChar(node: CharNode) {
  if (alphabet.hasChar(node.value) === false) {
    return;
  }
  node.value = alphabet.getAlpha(node.value).khanUz;
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

  if (node.isAsciiAZ() === false) {
    return;
  }

  if (ignoreConvert) {
    return;
  }

  /**
   * 下面的几个方法的位置不能换，换了就会出现语义冲突
   */

  _handleNG(node);

  // 合并字符
  if (node._next?.toLowerCase() === SEPARATE_MARK) {
    node.value = node.value + SEPARATE_MARK;
    node._value = node.value;
  }
  _handleH(node);
  // 转换
  _replaceChar(node);
}
