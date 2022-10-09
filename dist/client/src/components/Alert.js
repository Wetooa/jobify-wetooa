"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appContext_1 = require("../context/appContext");
function Alert() {
    const { alertType, alertText } = (0, appContext_1.useAppContext)();
    return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}
exports.default = Alert;
