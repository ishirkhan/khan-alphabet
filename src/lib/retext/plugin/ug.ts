import { visit } from "unist-util-visit";
import { CharNode } from "../charNode";
function handle(node: CharNode, _index: number, _parent: Node) {}
/**
 * 母语字母转换成 khan-uz
 * @returns
 */
export function ugToKhanUz() {
  return (tree: any) => {
    visit(tree, "CharNode", handle as any);
  };
}
