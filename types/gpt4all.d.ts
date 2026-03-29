// types/gpt4all.d.ts
declare module 'gpt4all' {
  export class Model {
    constructor(opts: { file: string });
  }

  export class GPT4All {
    constructor(opts: { model: Model });
    load(): Promise<void>;
    prompt(text: string): Promise<string>;
  }
}