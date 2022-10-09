"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appContext_1 = require("../context/appContext");
const fa_1 = require("react-icons/fa");
const StatItem_1 = __importDefault(require("./StatItem"));
const StatsContainer_1 = __importDefault(require("../assets/wrappers/StatsContainer"));
function StatsContainer() {
    const { stats } = (0, appContext_1.useAppContext)();
    const defaultStats = [
        {
            title: "pending applications",
            count: stats.pending || 0,
            icon: <fa_1.FaSuitcaseRolling />,
            color: "#e9b949",
            bcg: "#fcefc7",
        },
        {
            title: "interviews scheduled",
            count: stats.interview || 0,
            icon: <fa_1.FaCalendarCheck />,
            color: "#647acb",
            bcg: "#e0e8f9",
        },
        {
            title: "jobs declined",
            count: stats.declined || 0,
            icon: <fa_1.FaBug />,
            color: "#d66a6a",
            bcg: "#ffeeee",
        },
    ];
    return (<StatsContainer_1.default>
      {defaultStats.map((stat, index) => {
            return <StatItem_1.default key={index} {...stat}/>;
        })}
    </StatsContainer_1.default>);
}
exports.default = StatsContainer;
