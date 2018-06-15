import test from "ava";
import Config = require("../lib");

test("Empty Config", (t) => {
    const oneConfig = new Config();
    const otherConfig = new Config();
    oneConfig.addConfig({
        baz: "foo"
    });
    t.not(oneConfig.toString(), otherConfig.toString());
    t.not(oneConfig.toObject(), otherConfig.toObject());
    t.not(oneConfig.getConfig(), otherConfig.getConfig());
});
