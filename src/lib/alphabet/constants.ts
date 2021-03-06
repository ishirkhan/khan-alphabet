/**
 * 终止符: 内容中出现英语等内容时为了和uly区分使用终止符来包括内容，使得今后的转换等操作能够识别边界,如： ademler /人民 or people in english/ dep yazimiz
 *
 * 备注：
 * 当使用 | 为分界符时，在编写markdown发现和table冲突，面临在table等特殊场景中提供其他不冲突的符号。
 * 因我们以后的大方向是 markdown为主，所以现在吧分界符从| 转换成了 / 以后遇到冲突，针对特殊场景提供特殊替代方案。
 */
export const TRANSLATIONAL_MARK = "/"; // 转义符 用来控制转义不转义内容，包裹在中间的年内容不转义
export const SEPARATE_MARK = "h"; // 当组合字符出现冲突时优先使用此符号来分隔，如enge ehlish(注册、备案) 中的 n,g,ng 出现了冲突，将变成 enhge ehlish

export const SYLLABIFY_MARK = "`"; // 分音节符 adem`ler`ning
export const READABILITY_MARK = "'"; //易读标记，用于提高单词的易读性 tash'eynek, tel'et 一个辅音结束的音节后面的音节从原因开始时使用

/**
 * 一下集合是 Hemze+32个字符的列表，当语言无法保障列表是有序的时候请改用ordered list, 保证每一个列表的同一个索引的值恒等
 *
 * - 每一个列表的第一个字母是hemze  xx[0]
 * - 每一个列表对应位置的字符都是对应的  如 ug[5]=uly[5]=khan[5]=khanuz[5]
 * - 所有地方 ug 优先。 所有涉及到转换的地方都得吧khan-uz或ug 这种32对应32的目标作为桥梁，以它为主进行转移
 */

export const UG_CHARS = [
  "ئ",
  "ا",
  "ە",
  "ې",
  "ى",
  "و",
  "ۇ",
  "ۆ",
  "ۈ",
  "ب",
  "پ",
  "ت",
  "ج",
  "چ",
  "خ",
  "د",
  "ر",
  "ز",
  "ژ",
  "س",
  "ش",
  "غ",
  "ق",
  "ف",
  "ك",
  "گ",
  "ڭ",
  "ل",
  "م",
  "ن",
  "ھ",
  "ۋ",
  "ي",
];
export const UG_VOWELS = ["ا", "ە", "ې", "ى", "و", "ۇ", "ۆ", "ۈ"];
export const ULY_CHARS = [
  "\u{200d}",
  "a",
  "e",
  "ë", // eh
  "i",
  "o",
  "u",
  "ö", //oh
  "ü", // v
  "b",
  "p",
  "t",
  "j",
  "ch",
  "x",
  "d",
  "r",
  "z",
  "zh",
  "s",
  "sh",
  "gh",
  "q",
  "f",
  "k",
  "g",
  "ng",
  "l",
  "m",
  "n",
  "h",
  "w",
  "y",
];
export const KHAN_CHARS = [
  "x",
  "a",
  "e",
  "eh",
  "i",
  "o",
  "u",
  "oh",
  "v",
  "b",
  "p",
  "t",
  "j",
  "ch",
  "kh",
  "d",
  "r",
  "z",
  "jh",
  "s",
  "sh",
  "gh",
  "q",
  "f",
  "k",
  "g",
  "ng",
  "l",
  "m",
  "n",
  "wh",
  "w",
  "y",
];
export const KHAN_UZ_CHARS = [
  "x",
  "a",
  "e",
  "ê",
  "i",
  "o",
  "u",
  "ô",
  "v",
  "b",
  "p",
  "t",
  "j",
  "ĉ",
  "ħ",
  "d",
  "r",
  "z",
  "ĵ",
  "s",
  "ŝ",
  "ĝ",
  "q",
  "f",
  "k",
  "g",
  "ñ",
  "l",
  "m",
  "n",
  "ĥ",
  "w",
  "y",
];
