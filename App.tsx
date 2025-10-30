import React, { useState, useCallback } from 'react';
import { Product, CartItem, User, Order, View } from './types';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { CartView } from './components/CartView';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Profile } from './components/Profile';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.Home);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [notification, setNotification] = useState<string>('');
  const [postLoginRedirect, setPostLoginRedirect] = useState<View | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
        setNotification('');
    }, 3000);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (postLoginRedirect) {
        setView(postLoginRedirect);
        setPostLoginRedirect(null);
    } else {
        setView(View.Home);
    }
    showNotification(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(View.Home);
    showNotification("You've been signed out.");
  }

  const handleSignUp = (user: User) => {
    setCurrentUser(user);
    setView(View.Home);
    showNotification(`Welcome, ${user.name}! Your account has been created.`);
  };

  const handleAddToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showNotification(`${product.name} added to cart!`);
  }, []);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(cart.map(item => item.id === productId ? {...item, quantity} : item));
  };
  
  const handleRemoveFromCart = (productId: number) => {
    const removedItem = cart.find(item => item.id === productId);
    setCart(cart.filter(item => item.id !== productId));
    if (removedItem) {
      showNotification(`${removedItem.name} removed from cart.`);
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setView(View.ProductDetail);
  };
  
  const handlePlaceOrder = (orderDetails: Omit<Order, 'id' | 'orderDate' | 'userId'>) => {
    if (!currentUser) {
        showNotification("You must be logged in to place an order.");
        setView(View.Login);
        return;
    }
    const newOrder: Order = {
        ...orderDetails,
        id: crypto.randomUUID(),
        userId: currentUser.id,
        orderDate: new Date(),
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    setLatestOrder(newOrder);
    setCart([]);
    setView(View.OrderConfirmation);
  };
  
  const handleCheckout = () => {
      if (currentUser) {
          if (cart.length > 0) {
            setView(View.Checkout);
          } else {
            showNotification("Your cart is empty.");
            setView(View.Cart);
          }
      } else {
          setPostLoginRedirect(View.Checkout);
          setView(View.Login);
          showNotification("Please sign in to proceed to checkout.");
      }
  };

  const renderView = () => {
    switch (view) {
      case View.Home:
        return <ProductList onViewProduct={handleViewProduct} onAddToCart={handleAddToCart} />;
      case View.ProductDetail:
        return selectedProduct && <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} setView={setView} />;
      case View.Cart:
        return <CartView cart={cart} setView={setView} updateQuantity={handleUpdateQuantity} removeFromCart={handleRemoveFromCart} onCheckout={handleCheckout} />;
      case View.Checkout:
        if (currentUser && cart.length > 0) {
           return <CheckoutForm cart={cart} onPlaceOrder={handlePlaceOrder} />;
        }
        setView(View.Home);
        return null;
      case View.OrderConfirmation:
        return latestOrder && <OrderConfirmation order={latestOrder} setView={setView} />;
      case View.Login:
        return <Login onLogin={handleLogin} setView={setView} />;
      case View.SignUp:
        return <SignUp onSignUp={handleSignUp} setView={setView}/>;
      case View.Profile:
        if (currentUser) {
            return <Profile currentUser={currentUser} orders={orders} setView={setView} onLogout={handleLogout}/>;
        }
        setView(View.Login)
        return null;
      default:
        return <ProductList onViewProduct={handleViewProduct} onAddToCart={handleAddToCart} />;
    }
  };
  
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const showHeader = ![View.Login, View.SignUp].includes(view);

  const notificationClasses = notification 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 -translate-y-4 pointer-events-none';

  return (
    <div className="font-sans">
        <div className={`fixed top-20 right-4 z-50 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ${notificationClasses}`}>
            {notification}
        </div>
      {showHeader && <Header cartItemCount={cartItemCount} currentUser={currentUser} setView={setView} onLogout={handleLogout} />}
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;