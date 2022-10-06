import { ChartDataProps } from "./interfaces";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AreaChartPage(props: ChartDataProps) {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 "></CartesianGrid>
        <XAxis dataKey="date"></XAxis>
        <YAxis allowDecimals={false}></YAxis>
        <Tooltip />
        <Area dataKey="count" fill="#2cb1bc" type="monotone"></Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
export default AreaChartPage;
