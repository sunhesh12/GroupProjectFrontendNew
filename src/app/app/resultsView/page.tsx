import ResultTable from "@/components/ResultsView/ResultTable";
import style from "./results.module.css";

export default function Page() {
  return (
    <>
      <div className={style.ResultsViewContainer}>
        <div className={style.ResultsViewContent}>
          <ResultTable />
        </div>
      </div>
    </>
  );
}
