import React, { useState, useMemo } from 'react';
import { DUMMY_PRODUCTS } from '../constants';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onViewProduct, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(DUMMY_PRODUCTS.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="bg-brand-background">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl">Latest Gadgets</h1>
        <p className="mt-4 text-lg text-brand-text-secondary">Discover the future of technology today.</p>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-0 bg-white/5 py-3 pl-4 pr-10 text-brand-text-primary ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-brand-primary transition-all duration-200"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-surface text-brand-text-secondary hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 border-2 border-dashed border-gray-700 rounded-lg">
              <h2 className="mt-4 text-xl font-semibold text-brand-text-primary">No Products Found</h2>
              <p className="mt-2 text-brand-text-secondary">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};