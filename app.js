const express =
require("express");

const app =
express();

const scheduleRoutes =
require("./routes/scheduleRoutes");

app.use(express.json());

app.use(
    "/",
    scheduleRoutes
);

app.listen(
    3000,
    ()=>{
        console.log(
            "Server running on port 3000"
        );
    }
);