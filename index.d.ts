import { Config, AnyObject } from './dts.d';

declare const config: Config<AnyObject>;

declare module "y-config" {
  export = config;
}

export = config;
