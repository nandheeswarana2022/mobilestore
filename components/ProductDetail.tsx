
import React from 'react';
import { Product, View } from '../types';
import { Icon } from './common/Icon';
import { Button } from './common/Button';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  setView: (view: View) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, setView }) => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="bg-brand-background min-h-screen">
       <div className="p-4">
         <button onClick={() => setView(View.Home)} className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-text-primary transition">
           <Icon name="arrow-left" className="w-5 h-5"/> Back to Products
         </button>
       </div>
      <div className="mx-auto max-w-2xl px-4 pt-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="lg:pr-8">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0 lg:pl-8">
          <p className="text-sm uppercase tracking-widest text-brand-primary font-semibold">{product.category}</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-brand-text-primary sm:text-4xl mt-2">{product.name}</h1>
          
          <div className="mt-4">
             <p className="text-3xl text-brand-text-primary">${product.price.toLocaleString()}</p>
             <div className="mt-2 flex items-center">
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <Icon key={rating} name="star"
                        className={`h-5 w-5 ${product.rating > rating ? 'text-yellow-400' : 'text-gray-600'}`}/>
                    ))}
                </div>
                <p className="ml-2 text-sm text-brand-text-secondary">{product.rating} ({product.reviews} reviews)</p>
             </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-brand-text-secondary">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-brand-text-primary">Key Features</h3>
            <ul role="list" className="mt-4 list-disc space-y-2 pl-4 text-sm">
                {product.features.map(feature => (
                    <li key={feature} className="text-brand-text-secondary">
                        <span className="text-brand-text-primary">{feature}</span>
                    </li>
                ))}
            </ul>
          </div>
          
          <div className="mt-10 flex gap-4">
             <Button fullWidth onClick={() => onAddToCart(product, quantity)}>
              Add to bag
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
