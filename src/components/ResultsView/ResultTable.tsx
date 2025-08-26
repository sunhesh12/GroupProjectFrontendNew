import React from "react";
import style from "./ResultTable.module.css";

const data = Array(15).fill({
  name: "Student 01",
  index: "FC100648",
  grade: "A+",
});

export default function ResultTable() {
  return (
    <div className={style.bgCanvas_bx89}>
      <div className={style.cardContainer_xz23}>
        <h1 className={style.titleText_fj02}>
          Data Structures and Algorithms
        </h1>
        <p className={style.subText_jk56}>Check your results</p>
        <hr className={style.divider_hr34} />

        <div className={style.scrollWrap_aa11}>
          <table className={style.resultTable_yy99}>
            <thead className={style.tableHead_zz22}>
              <tr>
                <th className={style.tableCell_kk77}>Student Name</th>
                <th className={style.tableCell_kk77}>Index Number</th>
                <th className={style.tableCell_kk77}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? style.evenRow_ee45
                      : style.oddRow_mm32
                  }
                >
                  <td className={style.tableCell_kk77}>{row.name}</td>
                  <td className={style.tableCell_kk77}>{row.index}</td>
                  <td className={style.tableCell_kk77}>{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
