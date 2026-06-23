const express = require("express");
const app = express();
const scheduleRoutes = require("./routes/scheduleRoutes");

const evaluationLogger = require("../logging-middleware/logMiddleware");

app.use(express.json());

app.use(evaluationLogger);

app.use("/", scheduleRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});