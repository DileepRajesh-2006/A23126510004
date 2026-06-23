const Log = require("./utils/logger");

async function test() {

    const result = await Log(
        "backend",
        "info",
        "utils",
        "logging test successful"
    );

    console.log(result);

}

test();