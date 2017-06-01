interface AnyObject {
    [prop: string]: any
}

declare interface Config extends AnyObject {
    on(event: string, cb: any): void,
    once(event: string, cb: any): void,
    
    getDebug(): boolean,
    setDebug(bool: boolean): boolean,

    getConfig(): AnyObject,
    setConfig(obj: any): boolean,

    clear(): boolean,

    clearConfigPath(): boolean,
    clearCustomConfigPath(): boolean,
    getConfigPath(): string,
    getCustomConfigPath(): string,
    setConfigPath(path: string): boolean,
    setCustomConfigPath(path: string): boolean,

    reload(): boolean
}

declare let inst: Config;
export = inst;