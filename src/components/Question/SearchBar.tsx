import React, { useState } from "react";
import { Input, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search polls..."
        fullWidth
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
