"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("colors");
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
// db and authenticateUser
const db_1 = __importDefault(require("./database/db"));
// routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobsController_1 = __importDefault(require("./routes/jobsController"));
// middleware
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const auth_1 = require("./middleware/auth");
const helmet_1 = __importDefault(require("helmet"));
// import xss from "xss-clean";
const express_mongo_sanitize_1 = __importDefault(
  require("express-mongo-sanitize")
);
if (process.env.NODE_ENV !== "production") {
  app.use((0, morgan_1.default)("dev"));
}
// build application
app.use(
  express_1.default.static(path_1.default.resolve(__dirname, "../client/build"))
);
// additional middleware
// u can add an object with origin inside cors to set which domains can access ur server
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)()); // secure headers
// app.use(xss()); // prevent cross side scripting
app.use((0, express_mongo_sanitize_1.default)()); // prevent mongodb injection
// routes
app.get("/api/v1", (req, res) => {
  res.json({ msg: "test!" });
});
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/jobs", auth_1.authenticateUser, jobsController_1.default);
app.get("*", (req, res) => {
  res.sendFile(
    path_1.default.resolve(__dirname, "../client/build", "index.html")
  );
});
app.use(not_found_1.default);
app.use(error_handler_1.default);
const start = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const url = process.env.MONGO_URI;
      (0, db_1.default)(url);
      const port = process.env.PORT;
      app.listen(port, () =>
        console.log(`[server]: Server started on port ${port}`.cyan.underline)
      );
    } catch (error) {
      console.log(error);
    }
  });
start();
