export interface AnyObject {
  [prop: string]: any
}

type ConfigClass<T extends AnyObject> = {
  /**
   * Get Debug Status
   */
  getDebug(): boolean;
  /**
   * Set Debug Status
   * @param bool status
   */
  setDebug(bool: boolean): boolean;

  on(event: string, cb: any): void;
  once(event: string, cb: any): void;

  /**
   * Display Stored Data
   */
  getConfig(): T;
  /**
   * Store Data
   * @param obj data
   */
  setConfig(obj: T): boolean;

  clearConfigCwd(): boolean;
  getConfigCwd(): boolean;
  setConfigCwd(cwd: string): boolean;

  clearConfigPath(): boolean;
  clearCustomConfigPath(): boolean;
  getConfigPath(): string;
  getCustomConfigPath(): string;
  setConfigPath(filepath: string): boolean;
  setCustomConfigPath(filepath: string): boolean;

  clear(): boolean;
  reload(): boolean;
}

type ConfigValue<T extends AnyObject> = {
  [P in keyof T]: T[P];
}

export type Config<T extends AnyObject> = ConfigClass<T> & ConfigValue<T>;
