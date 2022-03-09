import { visit } from "unist-util-visit";
import { Alphabet, AlphaKind, TRANSLATIONAL_MARK } from "../../alphabet";
import { CharNode } from "../charNode";

const alphabet = new Alphabet(AlphaKind.Ug);
let ignoreConvert = false; // 不转义【默认都要转义】

/**
 *
 *  Todo: 母语的标点符号替换部分现在不支持，得考虑如何加入进来
 */

/**
 * 母语字母转换成 khan-uz
 * @returns
 */
export function ugToKhanUz() {
  return (tree: any) => {
    // 为了保证状态不被缓存，重置一次
    ignoreConvert = false;
    visit(tree, "CharNode", handle as any);
  };
}

function _removeHemze(node: CharNode) {
  if (
    node._value === alphabet.getHemze().ug &&
    (node._pre === undefined ||
      node._pre === " " ||
      node.isPunctuation(node._pre))
  ) {
    node.value = "";
    node._value = "";
  }
}

function _ignoreConvertHanlder(
  node: CharNode,
  index: number,
  parent: { children: CharNode[] }
) {
  // 第一次遇到拉丁字母时开始忽略转义
  if (node.isAsciiAZ() && ignoreConvert === false) {
    ignoreConvert = true; // 更新转换状态
    node.value = TRANSLATIONAL_MARK + node.value;
  }

  //第一次遇到母语时开始处理忽略转义的边界
  if (ignoreConvert === true && alphabet.hasChar(node._value)) {
    ignoreConvert = false;
    // 找到之前的最后一个字符后面添加结束符
    let i = index;
    while (parent.children[i - 1]?.isAsciiAZ() === false) {
      i = i - 1;
      if (i < 0) break;
    }
    if (i > 0) {
      parent.children[i].value = "/" + parent.children[i].value;
    }
  }
  // 当遍历了所有，转换模式还没停止的话停掉它
  if (
    ignoreConvert &&
    index === parent.children.length - 1 &&
    node.isAsciiAZ()
  ) {
    ignoreConvert = false;
    node.value = node.value + TRANSLATIONAL_MARK;
    return;
  }
}

function handle(
  node: CharNode,
  index: number,
  parent: { children: CharNode[] }
) {
  // 不需要处理
  if (node.isWhiteSpace() || node.isNumber()) {
    return;
  }
  _ignoreConvertHanlder(node, index, parent);

  // 不在字母表中的字符跳过处理
  if (alphabet.hasChar(node._value) === false) {
    return;
  }
  // 开始处理母语字母
  _removeHemze(node); //Hemze 需要去掉
  node.value = alphabet.getAlpha(node._value).khanUz;
}
