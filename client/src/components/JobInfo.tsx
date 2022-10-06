import { JobInfoProps } from "./interfaces";
import Wrapper from "../assets/wrappers/JobInfo";

function JobInfo({ icon, text }: JobInfoProps) {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
}
export default JobInfo;
