const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers/apiHelpers");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/api/user");
const images = require("./routes/api/images");
const news = require("./routes/api/news");
const entrants = require("./routes/api/entrants");
const literature = require("./routes/api/literature");
const home = require("./routes/api/home");
const support = require("./routes/api/support");
const history = require("./routes/api/history");
const partnership = require("./routes/api/partnership");
const conference = require("./routes/api/conference");
const disciplines = require("./routes/api/disciplines");
const research = require("./routes/api/research");
const schedule = require("./routes/api/schedule");
const teacher = require("./routes/api/teacher");
const whiteList = require("./routes/api/whiteList");
const group = require("./routes/api/group");
const course = require("./routes/api/course");
const specialty = require("./routes/api/specialty");
const subgroup = require("./routes/api/subgroup");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cookieParser());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

app.use("/api", entrants);
app.use("/api", images);
app.use("/api", home);
app.use("/api", news);
app.use("/api", support);
app.use("/api", history);
app.use("/api", partnership);
app.use("/api", literature);
app.use("/api", disciplines);
app.use("/api", conference);
app.use("/api", research);
app.use("/api", schedule);
app.use("/api", teacher);
app.use("/api", whiteList);
app.use("/api", group);
app.use("/api", course);
app.use("/api", specialty);
app.use("/api", subgroup);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
