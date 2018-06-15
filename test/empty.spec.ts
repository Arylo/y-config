import test from "ava";
import Config = require("../lib");

test("Empty Config", (t) => {
    t.is(new Config().toString(), "{}");
    t.deepEqual(new Config().toObject(), { });
    t.deepEqual(new Config().getConfig(), { });
});
