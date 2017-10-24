import { Config, AnyObject } from 'y-config/dts';

export interface NewObject extends AnyObject {
  test: string;
  bar: 'foo';
}

export type Config = Config<NewObject>;
