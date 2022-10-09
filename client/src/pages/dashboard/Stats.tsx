import { useEffect } from "react";
import { Loading, StatsContainer, ChartsContainer } from "../../components/";
import { useAppContext } from "../../context/appContext";

function Stats() {
  const { isLoading, monthlyApplications, showStats } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications && <ChartsContainer />}
    </>
  );
}
export default Stats;
