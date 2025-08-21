import React from "react";

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 m-1 rounded border transition-colors ${
        active ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
      }`}
    >
      {children}
    </button>
  );
}

export default FilterButton;
