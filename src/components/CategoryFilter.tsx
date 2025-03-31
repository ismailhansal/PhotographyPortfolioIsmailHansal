
import React, { memo } from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

// Memo to prevent unnecessary re-renders when parent re-renders but props haven't changed
const CategoryFilter = memo(({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
            activeCategory === category
              ? 'text-white border-b border-white'
              : 'text-gray-400 hover:text-white border-b border-transparent hover:border-gray-400'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
});

CategoryFilter.displayName = 'CategoryFilter';

export default CategoryFilter;
