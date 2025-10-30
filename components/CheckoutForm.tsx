import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { CartItem, Order, ShippingInfo, PaymentInfo } from '../types';

interface CheckoutFormProps {
  cart: CartItem[];
  onPlaceOrder: (order: Omit<Order, 'id' | 'orderDate' | 'userId'>) => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'review';

const StepIndicator: React.FC<{currentStep: CheckoutStep}> = ({currentStep}) => {
    const steps = ['shipping', 'payment', 'review'];
    const currentStepIndex = steps.indexOf(currentStep);
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                    {stepIdx < currentStepIndex ? (
                    <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-brand-primary" />
                        </div>
                        <span
                        className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
                        >
                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                        </svg>
                        </span>
                    </>
                    ) : stepIdx === currentStepIndex ? (
                    <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-gray-700" />
                        </div>
                        <span
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-primary bg-brand-background"
                        aria-current="step"
                        >
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" aria-hidden="true" />
                        </span>
                    </>
                    ) : (
                    <>
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="h-0.5 w-full bg-gray-700" />
                        </div>
                        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-700 bg-brand-background"
                        >
                        </span>
                    </>
                    )}
                    <span className="absolute top-10 w-max text-xs font-medium text-brand-text-secondary capitalize">{step} info</span>
                </li>
                ))}
            </ol>
        </nav>
    );
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, onPlaceOrder }) => {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({ address: '', city: '', state: '', zip: '' });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ cardNumber: '', expiry: '', cvv: '' });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNext = () => {
    if (step === 'shipping') setStep('payment');
    if (step === 'payment') setStep('review');
  };

  const handleBack = () => {
    if (step === 'payment') setStep('shipping');
    if (step === 'review') setStep('payment');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'review') {
      onPlaceOrder({ items: cart, total, shippingInfo, paymentInfo });
    } else {
        handleNext();
    }
  };

  return (
    <div className="bg-brand-background min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-4xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-text-primary mb-4">Checkout</h1>
        <div className="mb-12 pt-4">
            <StepIndicator currentStep={step} />
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 'shipping' && (
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <Input id="address" label="Address" value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} required />
                <Input id="city" label="City" value={shippingInfo.city} onChange={e => setShippingInfo({...shippingInfo, city: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                    <Input id="state" label="State" value={shippingInfo.state} onChange={e => setShippingInfo({...shippingInfo, state: e.target.value})} required />
                    <Input id="zip" label="ZIP Code" value={shippingInfo.zip} onChange={e => setShippingInfo({...shippingInfo, zip: e.target.value})} required />
                </div>
            </div>
          )}
          {step === 'payment' && (
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment Details</h2>
                <Input id="cardNumber" label="Card Number" value={paymentInfo.cardNumber} onChange={e => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                    <Input id="expiry" label="Expiry (MM/YY)" value={paymentInfo.expiry} onChange={e => setPaymentInfo({...paymentInfo, expiry: e.target.value})} required />
                    <Input id="cvv" label="CVV" value={paymentInfo.cvv} onChange={e => setPaymentInfo({...paymentInfo, cvv: e.target.value})} required />
                </div>
            </div>
          )}
          {step === 'review' && (
             <div>
                <h2 className="text-xl font-semibold text-brand-text-primary">Review Your Order</h2>
                <div className="mt-4 divide-y divide-gray-700 border-t border-b border-gray-700">
                    {cart.map(item => (
                        <div key={item.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-brand-text-primary">{item.name} <span className="text-sm text-brand-text-secondary">x{item.quantity}</span></p>
                                <p className="text-sm text-brand-text-secondary">Price: ${item.price}</p>
                            </div>
                            <p className="font-medium text-brand-text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Shipping to:</h3>
                    <p className="text-brand-text-secondary">{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-6">
                    <div className="flex justify-between text-xl font-bold text-brand-text-primary">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                </div>
            </div>
          )}
          <div className="mt-10 flex justify-between">
            {step !== 'shipping' && <Button type="button" variant="secondary" onClick={handleBack}>Back</Button>}
            <div className="flex-grow"/>
            <Button type="submit">{step === 'review' ? 'Place Order' : 'Next'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};