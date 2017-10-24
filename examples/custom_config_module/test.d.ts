import { AnyObject } from 'y-config/dts';

export interface NewObject extends AnyObject {
  test: string;
  bar: 'foo';
}
