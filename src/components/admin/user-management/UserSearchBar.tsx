import React, { useCallback } from 'react';
import { SearchBar } from '../../ui/SearchBar';

interface UserSearchBarProps {
  onSearchChange?: (searchTerm: string) => void;
  initialValue?: string;
}

export const UserSearchBar: React.FC<UserSearchBarProps> = ({ 
  onSearchChange, 
  initialValue = '' 
}) => {
  const handleSearch = useCallback((searchTerm: string) => {
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  }, [onSearchChange]);

  return (
    <SearchBar
      onSearch={handleSearch}
      placeholder="Search by name, email, role..."
      initialValue={initialValue}
      showFiltersButton={false}
    />
  );
};