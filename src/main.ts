import { ulyTextToFormat } from "./lib/retext";

const textArea = document.getElementById("textArea") as HTMLTextAreaElement;
const btn = document.getElementById("convertBtn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const text = textArea.value;
  const result = ulyTextToFormat(text);
  console.log(result);
});
