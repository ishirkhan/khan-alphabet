import "./style.css";

import {
  khanTextToKhanUz,
  khanUzTextToKhan,
  khanUzTextToUg,
} from "./lib/retext";

const text = `
ŜIRĦAN ÊLIPBESI ŜIRĦANNIÑ TURMUŜ WE ĦIZMET IĤTIYAJI VĈVN YASAP ĈIQILĜAN ÊLIPBEDUR.

ŝirħan êlipbesi ŝirħan teripidin yasalĝan, ôziniñ iĥtiyaji we iŝlitiŝ aditini asas qilĝan êlipbe bolup ĥêĉqandaq til-yêziq qaxide-pirinsipliriĝa tayanmiĝan we uyĝun kelmesliki momkin. u pvtvnley ŝeħiske wekillik qilidiĝan êlipbe bulup,ŝirħanniñ kiŝilik ħaĥiŝi we ôzlvk pirinsipini asas qilidu.
`;
let ug = khanUzTextToUg(text);
let khan = khanUzTextToKhan(text);

console.log(
  khanTextToKhanUz(
    "ShIRKhAN EhLIPBESI ShIRKhANNINg TURMUSh WE KhIZMET IWhTIYAJI VChVN YASAP ChIQILGhAN EhLIPBEDUR"
  )
);

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
