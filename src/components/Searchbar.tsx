import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  width?: string;
  containerClassName?: string;
  centered?: boolean;
  debounceDelay?: number; // new prop for debounce timing (default 600ms)
}

export const SearchBar = ({ 
  placeholder, 
  value, 
  onChange, 
  onSearch, 
  disabled = false,
  className = "",
  searchQuery,
  onSearchQueryChange,
  width = "w-full",
  containerClassName = "",
  centered = false,
  debounceDelay = 800 // 🔥 triggers after user stops typing for 0.8s
}: SearchBarProps) => {

  // unified value handlers
  const inputValue = searchQuery ?? value ?? "";
  const handleInputChange = onSearchQueryChange || onChange;

  // local state to debounce search
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  // update debounced value when input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [inputValue, debounceDelay]);

  // trigger search when debounced value changes
  useEffect(() => {
    if (onSearch && debouncedValue.trim() !== "") {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  // trigger search on Enter
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !disabled && onSearch) {
        e.preventDefault();
        onSearch(inputValue);
      }
    },
    [disabled, onSearch, inputValue]
  );

  const containerClasses = centered
    ? `flex justify-center mb-6 ${containerClassName}`
    : `flex w-full mb-6 mt-2 ${containerClassName}`;

  const inputEl = (
    <div className={`relative ${width} ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-600" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange?.(e.target.value)}
        onKeyDown={handleKeyPress}
        className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-[#0c1427] text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );

  return centered ? (
    <div className={containerClasses}>
      <div className="flex items-center bg-white dark:bg-[#0c1427] rounded-xl p-4 shadow-sm w-full justify-center">
        {inputEl}
      </div>
    </div>
  ) : (
    <div className={containerClasses}>{inputEl}</div>
  );
};
