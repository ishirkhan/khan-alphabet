import { khanUzTextToUly } from "./lib/retext";

const textArea = document.getElementById("textArea") as HTMLTextAreaElement;
const btn = document.getElementById("convertBtn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const text = textArea.value;
  const result = khanUzTextToUly(text);
  console.log(result);
});
