"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobInfo_1 = __importDefault(require("../assets/wrappers/JobInfo"));
function JobInfo({ icon, text }) {
    return (<JobInfo_1.default>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </JobInfo_1.default>);
}
exports.default = JobInfo;
