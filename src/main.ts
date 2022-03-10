import { khanRemark, khanTextToKhanUz, khanUzTextToUg } from "./lib";

let markdown = `
# shirkhan nimandaq isil bala deymende
- nimishqa digendek  men shundaq oylap qaldim , buning nimishqisi yoq emeliyette
`;
const result = khanRemark
  .data("converter", (node: { value: string }) => {
    return khanUzTextToUg(khanTextToKhanUz(node.value));
  })
  .processSync(markdown)
  .toString();
console.log(result);
