import { ChartDataProps } from "./interfaces";

function AreaChart(props: ChartDataProps) {
  const { data } = props;

  return (
    <div>
      {data.map((item) => {
        return <h1>{item.date}</h1>;
      })}
    </div>
  );
}
export default AreaChart;
