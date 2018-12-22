import * as crypto from "crypto";
import * as fs from "fs";
import * as ftconfig from "ftconfig";
import merge = require("lodash.merge");
import * as path from "path";

// tslint:disable-next-line:no-namespace
declare namespace Config {
    export type Format = "json" | "yaml" | "json5" | "hjson" | "ini" | "toml" | string;
    type TrueFormat = symbol | Format;

    interface IStoreObj {
        data: object | string;
        format: TrueFormat;
    }

    export interface IParserrObj<T> {
        handler: (p: fs.PathLike) => Partial<T>;
        filter: RegExp;
        format: string;
    }
}

class Config<T extends { }> {

    private storeObjs: Config.IStoreObj[] = [ ];
    private config = { };
    private objSymbol = Symbol("object");

    private parsers: Array<Config.IParserrObj<T>> = [{
        filter: /\.json$/,
        format: "json",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "json" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }, {
        filter: /\.ya?ml$/,
        format: "yaml",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "yaml" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }, {
        filter: /\.json5$/,
        format: "json5",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "json5" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }, {
        filter: /\.hjson$/,
        format: "hjson",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "hjson" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }, {
        filter: /\.toml$/,
        format: "toml",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "toml" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }, {
        filter: /\.ini$/,
        format: "ini",
        handler: (filepath) => {
            const options = { encoding: "utf-8", type: "ini" };
            return ftconfig.readFile(filepath, options).toObject();
        }
    }];

    public addConfig(obj: Partial<T>) {
        this.storeObjs.push({
            data: obj,
            format: this.objSymbol
        });
        return true;
    }

    public addConfigPath(p: fs.PathLike, format?: Config.Format) {
        p = p.toString();
        if (!path.isAbsolute(p)) {
            p = `${process.cwd()}/${p}`;
        }
        if (fs.existsSync(p)) {
            if (format === undefined) {
                for (const parserObj of this.parsers) {
                    if (parserObj.filter.test(p)) {
                        format = parserObj.format;
                        break;
                    }
                }
            }
            if (format === undefined) {
                return false;
            }
            this.storeObjs.push({
                data: p,
                format
            });
            return true;
        } else {
            return false;
        }
    }

    public addParser(obj: Config.IParserrObj<T>) {
        this.parsers.push(obj);
        return true;
    }

    public get(key: keyof T) {
        return this.getConfig()[key];
    }

    public getConfig() {
        let config = { };
        const key = this.getKeyMd5sum();
        if (!this.config[key]) {
            // Clean Exist Config Data
            Object.keys(this.config)
                .filter((item) => item !== key)
                .forEach((item) => {
                    delete this.config[item];
                });
            for (const storeObj of this.storeObjs) {
                let data = { };
                if (storeObj.format === this.objSymbol) {
                    data = storeObj.data;
                } else {
                    const filepath = storeObj.data as string;
                    for (const parserObj of this.parsers) {
                        if (parserObj.format !== storeObj.format) {
                            continue;
                        }
                        try {
                            data = parserObj.handler(filepath);
                        // tslint:disable-next-line:no-empty
                        } catch (error) { }
                        break;
                    }
                }
                config = merge(config, data);
            }
            this.config[key] = config;
        }
        return this.config[key] as Readonly<T>;
    }

    public toString() {
        return JSON.stringify(this.getConfig());
    }

    public toObject() {
        return this.getConfig();
    }

    private getKeyMd5sum() {
        const md5 = crypto.createHash("md5");
        md5.update(JSON.stringify(this.storeObjs));
        return md5.digest("hex");
    }

}

export = Config;
