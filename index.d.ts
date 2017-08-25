interface AnyObject {
  [prop: string]: any
}

declare module "y-config" {
  function getDebug(): boolean;
  function setDebug(bool: boolean): boolean;

  function on(event: string, cb: any): void;
  function once(event: string, cb: any): void;

  function getConfig(): AnyObject;
  function setConfig(obj: any): boolean;

  function clearConfigCwd(): boolean;
  function getConfigCwd(): boolean;
  function setConfigCwd(cwd: string): boolean;

  function clearConfigPath(): boolean;
  function clearCustomConfigPath(): boolean;
  function getConfigPath(): string;
  function getCustomConfigPath(): string;
  function setConfigPath(filepath: string): boolean;
  function setCustomConfigPath(filepath: string): boolean;

  function clear(): boolean;
  function reload(): boolean;
}

declare let config: "y-config";
export = config;
