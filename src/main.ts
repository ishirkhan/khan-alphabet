import "./style.css";

import { khanUzTextToKhan, khanUzTextToUg } from "./lib/retext";

const text = `
ŝirħan êlipbesi ŝirħanniñ turmuŝ we ħizmet iĥtiyaji vĉvn yasap ĉiqilĝan êlipbedur.

ŝirħan êlipbesi ŝirħan teripidin yasalĝan, ôziniñ iĥtiyaji we iŝlitiŝ aditini asas qilĝan êlipbe bolup ĥêĉqandaq til-yêziq qaxide-pirinsipliriĝa tayanmiĝan we uyĝun kelmesliki momkin. u pvtvnley ŝeħiske wekillik qilidiĝan êlipbe bulup,ŝirħanniñ kiŝilik ħaĥiŝi we ôzlvk pirinsipini asas qilidu.
`;
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
