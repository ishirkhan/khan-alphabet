import { toString } from "nlcst-to-string";

export function baseCompiler(this: any) {
  const compiler = (tree: any) => {
    return toString(tree);
  };
  Object.assign(this, { Compiler: compiler });
}
