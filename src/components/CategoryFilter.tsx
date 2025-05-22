import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  showPromos: boolean;
  onTogglePromos: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  showPromos,
  onTogglePromos,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Filters</h2>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          <button
            className={`px-3 py-1.5 rounded-full text-sm transition-colors w-full text-left ${
              selectedCategory === null
                ? 'bg-vafood-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onSelectCategory(null)}
          >
            All Products
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors w-full text-left ${
                selectedCategory === category.id
                  ? 'bg-vafood-red text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Special Offers</h3>
        <button
          className={`px-3 py-1.5 rounded-full text-sm transition-colors w-full text-left flex items-center ${
            showPromos
              ? 'bg-vafood-red text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={onTogglePromos}
        >
          <span className="flex-1">On Sale</span>
          <span
            className={`w-4 h-4 rounded-full border border-current flex items-center justify-center ${
              showPromos ? 'bg-white' : ''
            }`}
          >
            {showPromos && <span className="w-2 h-2 rounded-full bg-vafood-red"></span>}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;