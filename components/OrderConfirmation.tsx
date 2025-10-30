
import React from 'react';
import { Order, View } from '../types';
import { Button } from './common/Button';
import { Icon } from './common/Icon';

interface OrderConfirmationProps {
  order: Order;
  setView: (view: View) => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, setView }) => {
  return (
    <div className="bg-brand-background min-h-screen flex items-center justify-center">
      <div className="text-center bg-brand-surface p-8 sm:p-12 rounded-xl max-w-lg mx-4">
        <Icon name="check-circle" className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-extrabold text-brand-text-primary">Thank you for your order!</h1>
        <p className="mt-3 text-brand-text-secondary">Your order #{order.id.slice(0, 8)} has been placed successfully.</p>
        <p className="mt-1 text-brand-text-secondary">A confirmation email has been sent to your address.</p>
        
        <div className="mt-8 border-t border-white/10 pt-6 text-left">
            <h2 className="text-lg font-semibold text-brand-text-primary">Order Summary</h2>
            <div className="mt-4 space-y-2">
                {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-brand-text-secondary">{item.name} x{item.quantity}</span>
                        <span className="text-brand-text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 border-t border-white/10 pt-4 font-bold">
                 <span>Total</span>
                 <span>${order.total.toLocaleString()}</span>
            </div>
        </div>
        
        <div className="mt-8">
          <Button onClick={() => setView(View.Home)}>Continue Shopping</Button>
        </div>
      </div>
    </div>
  );
};
