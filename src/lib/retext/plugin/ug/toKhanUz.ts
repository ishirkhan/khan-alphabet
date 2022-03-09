import { visit } from "unist-util-visit";
import { Alphabet, AlphaKind, TRANSLATIONAL_MARK } from "../../../alphabet";
import { CharNode } from "../../charNode";

const alphabet = new Alphabet(AlphaKind.Ug);
let ignoreConvert = false; // 不转义【默认都要转义】

/**
 * 母语字母转换成 khan-uz
 * @returns
 */
export function ugToKhanUz() {
  return (tree: any) => {
    // 保证状态不被缓存
    ignoreConvert = false;
    visit(tree, "CharNode", converter as any);
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

function _ignoreConvertHandler(
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
      parent.children[i].value = TRANSLATIONAL_MARK + parent.children[i].value;
    }
  }

  // 遍历完了忽略转换模式还没关闭
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

function _replacePunction(node: CharNode) {
  if (!node.isPunctuation()) return;

  node.value = node.value.replace("؟", "?");
  node.value = node.value.replace("؛", ";");
  node.value = node.value.replace("،", ",");
}
function converter(
  node: CharNode,
  index: number,
  parent: { children: CharNode[] }
) {
  // 不处理
  if (node.isWhiteSpace() || node.isNumber()) {
    return;
  }

  _replacePunction(node);
  _ignoreConvertHandler(node, index, parent);

  if (alphabet.hasChar(node._value) === false) {
    return;
  }
  // 开始处理母语字母
  _removeHemze(node); //去掉 Hemze
  node.value = alphabet.getAlpha(node._value).khanUz;
}
