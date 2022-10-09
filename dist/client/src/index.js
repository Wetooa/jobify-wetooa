"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("normalize.css");
require("./index.css");
const App_1 = __importDefault(require("./App"));
const appContext_1 = require("./context/appContext");
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(<react_1.default.StrictMode>
    <appContext_1.AppProvider>
      <App_1.default />
    </appContext_1.AppProvider>
  </react_1.default.StrictMode>);
