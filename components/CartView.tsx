import React from 'react';
import { CartItem, View } from '../types';
import { Button } from './common/Button';
import { Icon } from './common/Icon';

interface CartViewProps {
  cart: CartItem[];
  setView: (view: View) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  onCheckout: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ cart, setView, updateQuantity, removeFromCart, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-brand-background min-h-screen">
        <div className="p-4">
         <button onClick={() => setView(View.Home)} className="inline-flex items-center gap-2 text-brand-text-secondary hover:text-brand-text-primary transition">
           <Icon name="arrow-left" className="w-5 h-5"/> Continue Shopping
         </button>
       </div>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-text-primary">Shopping Cart</h1>
        
        <div className="mt-12">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4 border-2 border-dashed border-gray-700 rounded-lg">
                <Icon name="cart" className="mx-auto h-12 w-12 text-gray-500" />
              <h2 className="mt-4 text-xl font-semibold text-brand-text-primary">Your cart is empty</h2>
              <p className="mt-2 text-brand-text-secondary">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={() => setView(View.Home)} className="mt-6">Shop Now</Button>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                <ul role="list" className="divide-y divide-white/10 border-t border-b border-white/10">
                  {cart.map((item) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"/>
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a href="#" className="font-medium text-brand-text-primary hover:text-brand-text-secondary">{item.name}</a>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-brand-text-primary">${item.price.toLocaleString()}</p>
                          </div>
                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center rounded-md border border-gray-700 w-fit">
                               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-brand-text-secondary hover:text-brand-text-primary disabled:opacity-50" disabled={item.quantity <= 1}><Icon name="minus" className="w-4 h-4"/></button>
                               <span className="px-3 py-1 text-sm">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-brand-text-secondary hover:text-brand-text-primary"><Icon name="plus" className="w-4 h-4"/></button>
                            </div>
                            <div className="absolute top-0 right-0">
                              <button type="button" onClick={() => removeFromCart(item.id)} className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500">
                                <span className="sr-only">Remove</span>
                                <Icon name="trash" className="h-5 w-5"/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-brand-surface px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                <h2 id="summary-heading" className="text-lg font-medium text-brand-text-primary">Order summary</h2>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-brand-text-secondary">Subtotal</dt>
                    <dd className="text-sm font-medium text-brand-text-primary">${subtotal.toLocaleString()}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <dt className="text-base font-medium text-brand-text-primary">Order total</dt>
                    <dd className="text-base font-medium text-brand-text-primary">${subtotal.toLocaleString()}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                    <Button fullWidth onClick={onCheckout}>Checkout</Button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};