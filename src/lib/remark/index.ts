import { Processor, unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";

function khanPlugin(this: any) {
  return (tree: any) => {
    const converter = this.data("converter") || undefined;
    if (!converter) return;
    visit(tree, "text", (node, index, parent) => {
      if (parent.type === "link") return;
      node.value = converter(node, index, parent);
    });
  };
}

const processor = unified()
  .use(remarkParse as any)
  .use(remarkStringify as any)
  .freeze();

/**
 *  Usage:
  const result = khanRemark
    .data("converter", (node) => {
      return khanTextToKhanUz(node.value);
    })
    .processSync(markdown)
    .toString();
  console.log(result);
 */
export const khanRemark: Processor = processor()
  .use(remarkMath)
  .use(remarkGfm)
  .use(khanPlugin);
