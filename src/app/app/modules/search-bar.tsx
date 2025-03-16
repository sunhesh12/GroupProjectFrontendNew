import React from "react";
import style from "./page.module.css";
import Image from "next/image";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={style.searchBarContainer}>
      <div className={style.searchbarWrapper}>
        <div className={style.searchIcon}>
          <Image
            style={{ borderRadius: "50px" }}
            src="/search.png"
            alt="Search Icon"
            width={30}
            height={30}
          />
        </div>

        <div className={style.inputContainer}>
          <input
            placeholder="Search course"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
