import Wrapper from "../assets/wrappers/StatItem";
import { StatItemProps } from "./interfaces";

function StatItem(stat: StatItemProps) {
  const { count, title, icon, color, bcg } = stat;
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
}
export default StatItem;
