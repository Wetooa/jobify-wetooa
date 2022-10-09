"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const appContext_1 = require("../context/appContext");
function ProtectedRoute({ children, }) {
    const { user } = (0, appContext_1.useAppContext)();
    if (!user) {
        return <react_router_dom_1.Navigate to="landing"/>;
    }
    return <>{children}</>;
}
exports.default = ProtectedRoute;
