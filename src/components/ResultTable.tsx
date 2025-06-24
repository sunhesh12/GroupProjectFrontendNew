import React from "react";

const data = Array(15).fill({
  name: "Student 01",
  index: "FC100648",
  grade: "A+",
});

export default function ResultTable() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-black mb-1">
          Data Structures and Algorithms
        </h1>
        <p className="text-gray-600 mb-6">Check your results</p>
        <hr className="mb-6" />

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Student Name</th>
                <th className="py-2 px-4 border border-gray-300">Index Number</th>
                <th className="py-2 px-4 border border-gray-300">Grade</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 odd:bg-white text-gray-800"
                >
                  <td className="py-2 px-4 border border-gray-300">{row.name}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.index}</td>
                  <td className="py-2 px-4 border border-gray-300">{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
