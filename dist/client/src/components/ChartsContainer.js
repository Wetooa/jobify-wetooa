"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ChartsContainer_1 = __importDefault(require("../assets/wrappers/ChartsContainer"));
const appContext_1 = require("../context/appContext");
const AreaChart_1 = __importDefault(require("./AreaChart"));
const BarChart_1 = __importDefault(require("./BarChart"));
function ChartsContainer() {
    const { monthlyApplications: data } = (0, appContext_1.useAppContext)();
    const [barChart, setBarChart] = (0, react_1.useState)(true);
    return (<ChartsContainer_1.default>
      <h4>Monthly Applications</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>

      {barChart ? <BarChart_1.default data={data}/> : <AreaChart_1.default data={data}/>}
    </ChartsContainer_1.default>);
}
exports.default = ChartsContainer;
