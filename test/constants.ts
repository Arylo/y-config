import * as findUp from "find-up";
import * as path from "path";

export const rootPwd = path.dirname(findUp.sync(["package.json", "LICENSE"]));
