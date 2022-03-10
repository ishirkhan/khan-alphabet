import "./style.css";

import { khanUzTextToKhan, khanUzTextToUg } from "./lib/retext";

const text = `
vn\u{200d}ge êliŝ`;
let ug = khanUzTextToUg(text);
let khan = khanUzTextToKhan(text);

document.querySelector("#app")!.innerHTML = `
 
  <div>
  <h1>Hello ShirkhanLib!</h1>
 
  Khan:
  <hr/>
  <p >${khan}</p>
  Khan-uz:
  <hr/>
  <p >${text}</p>
  Ug:
  <hr/>
  <p dir="rtl">${ug}</p>
  </div>
`;
