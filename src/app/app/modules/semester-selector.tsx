import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import { redirect } from "next/navigation";

export default function SemesterSelector({
  semesters,
}: {
  semesters: string[];
}) {

  return (
    <>
      <InputField
        type="select"
        name="semester"
        options={semesters.map((semester) => ({
          value: semester,
          label: `Semester ${semester}`,
        }))}
      />
    </>
  );
}
