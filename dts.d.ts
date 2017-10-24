export interface AnyObject {
  [prop: string]: any
}

export class Config<T extends AnyObject> {
  /**
   * Get Debug Status
   */
  public getDebug(): boolean;
  /**
   * Set Debug Status
   * @param bool status
   */
  public setDebug(bool: boolean): boolean;

  public on(event: string, cb: any): void;
  public once(event: string, cb: any): void;

  /**
   * Display Stored Data
   */
  public getConfig(): T;
  /**
   * Store Data
   * @param obj data
   */
  public setConfig(obj: T): boolean;

  public clearConfigCwd(): boolean;
  public getConfigCwd(): boolean;
  public setConfigCwd(cwd: string): boolean;

  public clearConfigPath(): boolean;
  public clearCustomConfigPath(): boolean;
  public getConfigPath(): string;
  public getCustomConfigPath(): string;
  public setConfigPath(filepath: string): boolean;
  public setCustomConfigPath(filepath: string): boolean;

  public clear(): boolean;
  public reload(): boolean;

  [prop: string]: any;
}
