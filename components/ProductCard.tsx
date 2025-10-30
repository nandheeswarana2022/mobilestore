
import React from 'react';
import { Product } from '../types';
import { Icon } from './common/Icon';
import { Button } from './common/Button';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-brand-surface transition-all duration-300 hover:border-brand-primary/50 hover:shadow-2xl hover:shadow-brand-primary/10">
      <div className="aspect-w-1 aspect-h-1 bg-gray-900 sm:aspect-none cursor-pointer" onClick={() => onViewProduct(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-lg font-bold text-brand-text-primary">
          <button onClick={() => onViewProduct(product)}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </button>
        </h3>
        <p className="text-sm text-brand-text-secondary">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
            <div className="flex items-center justify-between">
                 <p className="text-2xl font-extrabold text-brand-text-primary">${product.price}</p>
                 <div className="flex items-center">
                    <Icon name="star" className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm text-brand-text-secondary">{product.rating}</span>
                </div>
            </div>
          
        </div>
      </div>
       <div className="p-4 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button fullWidth onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>Add to cart</Button>
       </div>
    </div>
  );
};
