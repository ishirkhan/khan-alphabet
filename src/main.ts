import { khanUzTextToUly, ulyTextToKhanUz } from "./lib/retext";

const textArea = document.getElementById("textArea") as HTMLTextAreaElement;
const btn = document.getElementById("convertBtn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const text = textArea.value;
  const result = ulyTextToKhanUz(text);
  console.log(result);
});
