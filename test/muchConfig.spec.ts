import test from "ava";
import * as findUp from "find-up";
import * as path from "path";
import Config = require("../lib");

const configFolderPath = path.resolve(findUp.sync("simples"), "config");

test("Much Config", (t) => {
    const oneConfig = new Config<{ baz: string; }>();
    const otherConfig = new Config();
    oneConfig.addConfig({
        baz: "foo"
    });
    t.not(oneConfig.toString(), otherConfig.toString());
    t.not(oneConfig.toObject(), otherConfig.toObject());
    t.not(oneConfig.getConfig(), otherConfig.getConfig());
    t.is(oneConfig.get("baz"), "foo");
    t.is(otherConfig.get("baz" as never), undefined);
});

test("Much Config File", (t) => {
    const config = new Config<{ type: string; comment: string; }>();
    config.addConfigPath(path.resolve(configFolderPath, "config.json"));
    t.is(config.get("type"), "JSON");
    config.addConfigPath(path.resolve(configFolderPath, "config.yaml"));
    t.is(config.get("type"), "YAML");
});
