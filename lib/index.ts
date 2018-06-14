import * as YAML from "config-yaml";
import * as crypto from "crypto";
import * as fs from "fs";
import merge = require("lodash.merge");
import * as path from "path";

type Format = "json" | "yaml";

type TrueFormat = "object" | Format;

interface IStoreObj {
    data: object | string;
    format: TrueFormat;
}

class Config<T> {

    private storeObjs: IStoreObj[] = [ ];
    private config = { };

    public addConfig(obj: Partial<T>) {
        this.storeObjs.push({
            data: obj,
            format: "object"
        });
        return true;
    }

    public addConfigPath(p: fs.PathLike, format?: Format) {
        p = p.toString();
        if (!path.isAbsolute(p)) {
            p = `${process.cwd()}/${p}`;
        }
        if (fs.existsSync(p)) {
            if (!format) {
                format = "json";
                if (/\.json$/.test(p)) {
                    format = "json";
                } else if (/\.ya?ml$/.test(p)) {
                    format = "yaml";
                }
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

    public get(key: keyof T) {
        return this.getConfig()[key as any];
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
            for (const info of this.storeObjs) {
                let data = { };
                if (info.format === "object") {
                    data = info.data;
                } else if (info.format === "json") {
                    const p = info.data as string;
                    try {
                        const fileOptions = { encoding: "utf-8" };
                        const filedata = fs.readFileSync(p, fileOptions);
                        data = JSON.parse(filedata);
                    // tslint:disable-next-line:no-empty
                    } catch (error) { }
                } else if (info.format === "yaml") {
                    data = YAML(path);
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

export = new Config();
