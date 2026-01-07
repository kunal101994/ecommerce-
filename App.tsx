
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AIChat from './components/AIChat';
import { AppRoute, Product, CartItem } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart Operations
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // In a real app, we might use a toast library here
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleViewDetails = (p: Product) => {
    setSelectedProduct(p);
    setCurrentRoute(AppRoute.PRODUCT);
  };

  // Render Logic
  const renderHome = () => (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-4 md:px-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 max-w-2xl text-white">
          <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-4 block animate-bounce">
            Autumn Collection 2024
          </span>
          <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
            Elevate Your <br /> Standard.
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
            Discover a curated world of premium design, effortless utility, and uncompromising luxury.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setCurrentRoute(AppRoute.SHOP)}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
            >
              Shop Collection
            </button>
            <button 
              onClick={() => setCurrentRoute(AppRoute.AI_CONCIERGE)}
              className="bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              Meet Your Concierge
            </button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-4xl font-serif font-bold mb-2">New Arrivals</h3>
            <p className="text-slate-500">The latest pieces from our curated selection.</p>
          </div>
          <button onClick={() => setCurrentRoute(AppRoute.SHOP)} className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1">
            View All Shop
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map(p => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={addToCart} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </section>

      {/* AI Promo Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="flex-1 space-y-6">
            <h3 className="text-4xl md:text-6xl font-serif font-bold leading-tight">Can't decide? Ask our AI Expert.</h3>
            <p className="text-indigo-100 text-lg font-light max-w-md">
              Our advanced neural shopping assistant uses Gemini technology to find exactly what you need based on your taste and lifestyle.
            </p>
            <button 
              onClick={() => setCurrentRoute(AppRoute.AI_CONCIERGE)}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all"
            >
              Try AI Concierge
            </button>
          </div>
          <div className="flex-1 relative">
            <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80" className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500" alt="Concierge" />
          </div>
        </div>
      </section>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-serif font-bold mb-2">Our Collection</h2>
          <p className="text-slate-500">Showing {filteredProducts.length} high-quality products</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(p => (
          <ProductCard 
            key={p.id} 
            product={p} 
            onAddToCart={addToCart} 
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );

  const renderProduct = () => {
    if (!selectedProduct) return renderShop();
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button 
          onClick={() => setCurrentRoute(AppRoute.SHOP)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <i className="fas fa-arrow-left"></i> Back to Shop
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="rounded-[2rem] overflow-hidden bg-white shadow-2xl">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover aspect-square" />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">{selectedProduct.category}</span>
              <h2 className="text-5xl font-serif font-bold text-slate-900">{selectedProduct.name}</h2>
              <div className="flex items-center gap-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-sm"></i>)}
                </div>
                <span className="text-slate-400 text-sm">45 Verified Reviews</span>
              </div>
              <p className="text-4xl font-bold text-slate-900">${selectedProduct.price.toLocaleString()}</p>
            </div>
            
            <p className="text-slate-600 text-lg leading-relaxed border-t border-slate-100 pt-8">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {selectedProduct.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <i className="fas fa-check-circle text-indigo-500"></i>
                  {f}
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-8">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95"
              >
                Add to Cart
              </button>
              <button className="w-16 h-16 border-2 border-slate-200 rounded-2xl flex items-center justify-center hover:border-slate-900 transition-colors">
                <i className="far fa-heart text-xl"></i>
              </button>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <i className="fas fa-shipping-fast w-5"></i>
                <span>Free express shipping on orders over $500</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <i className="fas fa-undo w-5"></i>
                <span>30-day effortless returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-serif font-bold mb-10">Your Shopping Bag</h2>
      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
          <div className="text-6xl text-slate-200 mb-6"><i className="fas fa-shopping-bag"></i></div>
          <p className="text-xl text-slate-500 mb-8">Your bag is currently empty.</p>
          <button 
            onClick={() => setCurrentRoute(AppRoute.SHOP)}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group">
                <div className="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-slate-400 text-sm uppercase tracking-tighter">{item.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all">-</button>
                      <span className="font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all">+</button>
                    </div>
                    <span className="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <h3 className="text-xl font-bold border-b border-white/10 pb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-white">FREE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (est.)</span>
                  <span className="text-white">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold pt-6 border-t border-white/10">
                <span>Total</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setCurrentRoute(AppRoute.CHECKOUT)}
                className="w-full bg-indigo-500 text-white py-4 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-500/20"
              >
                Checkout Now
              </button>
            </div>
            <p className="text-center text-xs text-slate-400">Secure checkout powered by Lumina Payment Systems</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
       <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
         <i className="fas fa-check"></i>
       </div>
       <h2 className="text-4xl font-serif font-bold mb-4">Ready for Checkout</h2>
       <p className="text-slate-500 mb-12">In a production environment, this would integrate with a payment processor like Stripe.</p>
       <div className="bg-white p-8 rounded-3xl border border-slate-100 max-w-md mx-auto">
         <div className="space-y-4 text-left">
           <label className="block text-sm font-bold text-slate-700">Full Name</label>
           <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="Jane Doe" />
           <label className="block text-sm font-bold text-slate-700">Shipping Address</label>
           <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" placeholder="123 Luxury Ave, NY" />
           <button 
             onClick={() => {
               alert("Order confirmed! Thank you for shopping with Lumina.");
               setCart([]);
               setCurrentRoute(AppRoute.HOME);
             }}
             className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold mt-8"
           >
             Complete Purchase
           </button>
         </div>
       </div>
    </div>
  );

  const renderAIConcierge = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl font-serif font-bold text-slate-900 leading-tight">Elite Shopping <br /> Assistant</h2>
          <p className="text-slate-500 text-lg max-w-md">
            Our AI Concierge understands your needs. Whether you're looking for a specific feature or just a general recommendation, simply ask.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-600 font-bold">
              <i className="fas fa-bolt"></i>
              <span>Powered by Gemini 3</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400 italic">
              "Find me a premium gift for an office worker that costs less than $300"
            </div>
          </div>
        </div>
        <div className="w-full md:w-[600px]">
          <AIChat products={MOCK_PRODUCTS} onSuggestionClick={handleViewDetails} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        currentRoute={currentRoute} 
        setRoute={setCurrentRoute} 
      />
      
      <main className="flex-1">
        {currentRoute === AppRoute.HOME && renderHome()}
        {currentRoute === AppRoute.SHOP && renderShop()}
        {currentRoute === AppRoute.PRODUCT && renderProduct()}
        {currentRoute === AppRoute.CART && renderCart()}
        {currentRoute === AppRoute.CHECKOUT && renderCheckout()}
        {currentRoute === AppRoute.AI_CONCIERGE && renderAIConcierge()}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-xl">LUMINA</h4>
            <p className="text-sm font-light leading-relaxed">Defining the future of luxury e-commerce through intelligent design and superior products.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Shop</h5>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentRoute(AppRoute.SHOP)} className="hover:text-white transition-colors">All Products</button></li>
              <li><button className="hover:text-white transition-colors">Featured</button></li>
              <li><button className="hover:text-white transition-colors">New Arrivals</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h5>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-white transition-colors">Shipping Policy</button></li>
              <li><button className="hover:text-white transition-colors">Returns & Exchanges</button></li>
              <li><button className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h5>
            <div className="flex gap-4 text-xl">
              <i className="fab fa-instagram hover:text-white cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-white cursor-pointer"></i>
              <i className="fab fa-pinterest hover:text-white cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-xs text-center">
          © 2024 Lumina Luxe. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
