import { ChartDataProps } from "./interfaces";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BarChartPage(props: ChartDataProps) {
  const { data } = props;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3 "></CartesianGrid>
        <XAxis dataKey="date"></XAxis>
        <YAxis allowDecimals={false}></YAxis>
        <Tooltip />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75}></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BarChartPage;
