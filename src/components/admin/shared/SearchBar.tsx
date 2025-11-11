// src/components/admin/shared/SearchBar.tsx
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}: Props) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input-field pl-10 pr-4 py-2 text-sm w-64"
      aria-label="Search"
    />
  </div>
);