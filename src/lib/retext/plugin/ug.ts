import { visit } from "unist-util-visit";
import { AlphaKind } from "../../alphabet";
import { CharNode } from "../charNode";
import { ParentNode } from "../types";
function handle(node: CharNode, _index: number, _parent: ParentNode) {
  if (node.ignoreConver) return;
  node.replaceTo(AlphaKind.KhanUz);
}
/**
 * 母语字母转换成 khan-uz
 * @returns
 */
export function ugToKhanUz() {
  return (tree: any) => {
    visit(tree, "CharNode", handle as any);
  };
}
