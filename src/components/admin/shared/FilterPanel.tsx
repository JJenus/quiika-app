// src/components/admin/shared/FilterPanel.tsx
type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  className?: string;
};

export const FilterPanel = ({ value, onChange, options, className = "" }: Props) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`input-field py-2 px-3 text-sm ${className}`}
    aria-label="Filter by status"
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);