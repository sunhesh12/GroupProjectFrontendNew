import Button from "@/components/buttons/view";
import InputField from "@/components/input/view";
import { redirect } from "next/navigation";
import SemesterSelector from "./semester-selector";
import styles from "./page.module.css";

export default function SearchBar({
  searchQuery,
  semesters,
}: {
  searchQuery: string;
  semesters: string[];
}) {
  // Server Action to handle search form submission
  async function handleSearch(formData: FormData) {
    "use server";
    const newUrl = new URL("http://localhost:3000/app/modules");
    newUrl.searchParams.set("searchQuery", formData.get("searchQuery") as string);
    newUrl.searchParams.set("selectedSemester", formData.get("semester") as string);

    redirect(
     newUrl.toString()
    );
  }

  return (
    <form className={styles.searchBar} action={handleSearch}>
      <InputField
        type="text"
        name="searchQuery"
        placeholder="Search modules..."
        defaultValue={searchQuery}
      />
      <SemesterSelector semesters={semesters} />
      <Button fontSize="15px" type="submit">
        Search
      </Button>
    </form>
  );
}
