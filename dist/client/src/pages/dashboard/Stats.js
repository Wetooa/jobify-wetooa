"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("../../components/");
const appContext_1 = require("../../context/appContext");
function Stats() {
    const { isLoading, monthlyApplications, showStats } = (0, appContext_1.useAppContext)();
    (0, react_1.useEffect)(() => {
        showStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return <components_1.Loading center/>;
    }
    return (<>
      <components_1.StatsContainer />
      {monthlyApplications && <components_1.ChartsContainer />}
    </>);
}
exports.default = Stats;
