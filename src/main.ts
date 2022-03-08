import "./style.css";

import { demo } from "./lib/retext";

demo();

document.querySelector("#app")!.innerHTML = `
  <h1>Hello ShirkhanLib!</h1>
`;
