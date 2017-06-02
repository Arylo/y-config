interface AnyObject {
  [prop: string]: any
}

declare interface Config extends AnyObject {

  getDebug(): boolean,
  setDebug(bool: boolean): boolean,

  on(event: string, cb: any): void,
  once(event: string, cb: any): void,

  getConfig(): AnyObject,
  setConfig(obj: any): boolean,

  clearConfigCwd(): boolean,
  getConfigCwd(): boolean,
  setConfigCwd(cwd: string): boolean,

  clearConfigPath(): boolean,
  clearCustomConfigPath(): boolean,
  getConfigPath(): string,
  getCustomConfigPath(): string,
  setConfigPath(filepath: string): boolean,
  setCustomConfigPath(filepath: string): boolean,

  clear(): boolean,
  reload(): boolean
}

declare let inst: Config;
export = inst;
