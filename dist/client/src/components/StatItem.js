"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatItem_1 = __importDefault(require("../assets/wrappers/StatItem"));
function StatItem(stat) {
    const { count, title, icon, color, bcg } = stat;
    return (<StatItem_1.default color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </StatItem_1.default>);
}
exports.default = StatItem;
