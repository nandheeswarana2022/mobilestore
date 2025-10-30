import React from 'react';
import { Order, User, View } from '../types';
import { Button } from './common/Button';

interface ProfileProps {
  currentUser: User;
  orders: Order[];
  setView: (view: View) => void;
  onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ currentUser, orders, setView, onLogout }) => {
  const userOrders = orders.filter(order => order.userId === currentUser.id);

  return (
    <div className="bg-brand-background min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-brand-text-primary">My Profile</h1>
                <p className="mt-2 text-lg text-brand-text-secondary">Hello, {currentUser.name} ({currentUser.email})</p>
            </div>
            <Button onClick={onLogout} variant="outline">Sign Out</Button>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-brand-text-primary">Order History</h2>

        <div className="mt-6">
          {userOrders.length === 0 ? (
            <div className="text-center py-16 px-4 border-2 border-dashed border-gray-700 rounded-lg">
              <h2 className="mt-4 text-xl font-semibold text-brand-text-primary">No Orders Yet</h2>
              <p className="mt-2 text-brand-text-secondary">You haven't placed any orders with us. Let's change that!</p>
              <Button onClick={() => setView(View.Home)} className="mt-6">Start Shopping</Button>
            </div>
          ) : (
            <div className="space-y-8">
              {userOrders.sort((a,b) => b.orderDate.getTime() - a.orderDate.getTime()).map(order => (
                <div key={order.id} className="bg-brand-surface rounded-lg p-6 border border-white/10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-white/10">
                        <div>
                            <p className="font-semibold text-brand-text-primary">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-sm text-brand-text-secondary">Placed on {order.orderDate.toLocaleDateString()}</p>
                        </div>
                        <p className="text-lg font-bold text-brand-text-primary">${order.total.toLocaleString()}</p>
                    </div>
                    <ul className="divide-y divide-white/10">
                        {order.items.map(item => (
                            <li key={item.id} className="py-4 flex items-center space-x-4">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover"/>
                                <div className="flex-grow">
                                    <p className="font-medium text-brand-text-primary">{item.name}</p>
                                    <p className="text-sm text-brand-text-secondary">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-brand-text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};