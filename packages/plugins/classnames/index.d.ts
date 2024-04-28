export type Value = boolean | string | number | undefined | null | Symbol;
export type Mapping = Record<string,unknown>;
export interface ArgumentArray extends Array<Argument> {}
export type Argument = Mapping | Mapping | ArgumentArray;
declare const classnames: (...t: ArgumentArray) => string;
export default classnames;