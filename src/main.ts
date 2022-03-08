import "./style.css";

import { Alphabet, AlphaKind } from "./lib";

const UgAlphabet = new Alphabet();

console.log(UgAlphabet.get_map(AlphaKind.KhanUz));

console.log(UgAlphabet.get_hemze());

document.querySelector("#app")!.innerHTML = `
  <h1>Hello ShirkhanLib!</h1>
`;
