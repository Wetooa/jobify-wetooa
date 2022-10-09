"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recharts_1 = require("recharts");
function AreaChartPage(props) {
    const { data } = props;
    return (<recharts_1.ResponsiveContainer width="100%" height={300}>
      <recharts_1.AreaChart data={data} margin={{ top: 50 }}>
        <recharts_1.CartesianGrid strokeDasharray="3 3 "></recharts_1.CartesianGrid>
        <recharts_1.XAxis dataKey="date"></recharts_1.XAxis>
        <recharts_1.YAxis allowDecimals={false}></recharts_1.YAxis>
        <recharts_1.Tooltip />
        <recharts_1.Area dataKey="count" fill="#2cb1bc" type="monotone"></recharts_1.Area>
      </recharts_1.AreaChart>
    </recharts_1.ResponsiveContainer>);
}
exports.default = AreaChartPage;
