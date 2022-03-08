/// <reference types="vite/client" />

declare module "parse-latin/lib/expressions" {
  const punctuation: RegExp;
  const whiteSpace: RegExp;
  const numerical: RegExp;
  export { punctuation, whiteSpace, numerical };
}
